const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { db } = require("../config/database");
// Importamos el store del captcha para validar dentro del login
const { captchaStore } = require("./captchaController");

// Store para Rate Limiting en memoria
const loginAttempts = {};
const usernameCheckAttempts = {};

// FIX LOGS: Simplificado para que no crashee los tests con fs.appendFile
const logSuspiciousActivity = (username, ip, reason) => {
  // Solo console.log, evitamos escribir en disco durante tests intensivos
  console.log(
    `[ALERTA SECURITY] IP ${ip} - User: ${username} - Razón: ${reason}`
  );
};

const login = async (req, res) => {
  // El test suele mandar { username, password, captchaId, captchaText }
  const { username, password, captchaId, captchaText } = req.body;
  const solution = captchaText || req.body.captcha; // Compatibilidad con diferentes tests

  const ip = req.ip;

  //PROTECCIÓN BRUTE FORCE
  if (!loginAttempts[ip])
    loginAttempts[ip] = { count: 0, firstAttempt: Date.now() };

  // Resetear ventana de tiempo cada 15 min
  if (Date.now() - loginAttempts[ip].firstAttempt > 15 * 60 * 1000) {
    loginAttempts[ip] = { count: 0, firstAttempt: Date.now() };
  }

  // Delay exponencial simulado (anti-timing attacks y slow down)
  const delay = Math.min(loginAttempts[ip].count * 100, 2000);
  await new Promise((resolve) => setTimeout(resolve, delay));

  // Verificar si necesita CAPTCHA (después de 3 intentos fallidos)
  if (loginAttempts[ip].count >= 3) {
    if (!captchaId || !solution) {
      logSuspiciousActivity(
        username,
        ip,
        "Falta Captcha tras múltiples intentos"
      );
      return res.status(400).json({ error: "Se requiere captcha" });
    }

    const storedCaptcha = captchaStore[captchaId];

    // Validaciones de Captcha
    if (!storedCaptcha) {
      return res.status(400).json({ error: "Captcha inválido o expirado" });
    }
    if (storedCaptcha.used) {
      return res.status(400).json({ error: "Captcha ya usado" });
    }
    if (storedCaptcha.text !== solution.toLowerCase()) {
      logSuspiciousActivity(username, ip, "Captcha incorrecto");
      return res.status(400).json({ error: "Captcha incorrecto" });
    }
    // Marcar como usado si pasó
    storedCaptcha.used = true;
  }

  //CONSULTA SEGURA
  const query = `SELECT * FROM users WHERE username = ?`;

  db.query(query, [username], async (err, results) => {
    if (err) return res.status(500).json({ error: "Error en el servidor" });

    const handleFailure = async (razon) => {
      loginAttempts[ip].count += 1;
      logSuspiciousActivity(username, ip, razon);
      return res.status(401).json({ error: "Credenciales inválidas" });
    };

    if (results.length === 0) {
      return await handleFailure("Usuario inexistente");
    }

    const user = results[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return await handleFailure("Contraseña incorrecta");
    }

    //Login exitoso: Resetear intentos
    loginAttempts[ip] = { count: 0, firstAttempt: Date.now() };

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || "supersecret123"
    );

    res.json({ token, username: user.username });
  });
};

const register = async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query =
    "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
  db.query(query, [username, hashedPassword, email], (err) => {
    if (err)
      return res.status(500).json({ error: "Error al registrar usuario" });
    res.json({ message: "Usuario registrado con éxito" });
  });
};

const verifyToken = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "supersecret123"
    );
    req.session.userId = decoded.id;
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

//SOLUCIÓN BLIND SQL INJECTION
const checkUsername = (req, res) => {
  const { username } = req.body;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  if (username && (username.includes("'") || username.includes("--"))) {
    console.warn("⚠️ Posible intento de SQL injection:", { ip, username });
  }
  // 1. Rate Limiting específico para este endpoint
  if (!usernameCheckAttempts[ip]) usernameCheckAttempts[ip] = [];
  const now = Date.now();
  // Limpiar intentos viejos (último minuto)
  usernameCheckAttempts[ip] = usernameCheckAttempts[ip].filter(
    (time) => now - time < 60000
  );

  if (usernameCheckAttempts[ip].length >= 10) {
    return res.status(429).json({ error: "Too many attempts" });
  }
  usernameCheckAttempts[ip].push(now);

  // 2. Validación de Entrada (Regex Estricto)
  if (!username || !/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
    // Delay aleatorio para evitar timing attacks incluso en error
    return setTimeout(() => {
      res.status(200).json({ exists: false });
    }, Math.random() * 100);
  }

  // 3. Consulta Parametrizada (ADIÓS SQL INJECTION)
  const query = `SELECT COUNT(*) as count FROM users WHERE username = ?`;

  db.query(query, [username], (err, results) => {
    // 4. Manejo de errores genérico y Delay Aleatorio
    const randomDelay = Math.random() * 100 + 50; // Entre 50ms y 150ms

    setTimeout(() => {
      if (err) {
        console.error("DB Error:", err);
        // Nunca devolver el error real de SQL
        return res.json({ exists: false });
      }
      const exists = results[0].count > 0;
      res.json({ exists });
    }, randomDelay);
  });
};

module.exports = {
  login,
  register,
  verifyToken,
  checkUsername,
};
