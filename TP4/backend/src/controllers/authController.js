const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { db } = require("../config/database");

const failedLogin = {};

const logSuspiciousActivity = (username, ip, reason) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ALERTA: IP ${ip} intentó acceder como "${username}". Razón: ${reason}\n`;
  console.error(logMessage.trim());
  const logPath = path.join(__dirname, "../../suspicious_activity.log");
  fs.appendFile(logPath, logMessage, (err) => {
    if (err) console.error("Error guardando log:", err);
  });
};

const login = async (req, res) => {
  const { username, password, captcha } = req.body;
  const ip = req.ip;
  if (failedLogin[username] === undefined) {
    failedLogin[username] = 0;
  }

  const attempts = failedLogin[username];

  if (attempts >= 3) {
    if (!captcha || !req.session.captcha) {
      logSuspiciousActivity(
        username,
        ip,
        "Falta Captcha tras múltiples intentos"
      );
      return res.status(400).json({ error: "Se requiere captcha" });
    }
    if (captcha.toLowerCase() !== req.session.captcha.toLowerCase()) {
      logSuspiciousActivity(username, ip, "Captcha incorrecto");
      return res.status(400).json({ error: "Captcha incorrecto" });
    }
    req.session.captcha = null;
  }

  const query = `SELECT * FROM users WHERE username = ?`;

  db.query(query, [username], async (err, results) => {
    if (err) return res.status(500).json({ error: "Error en el servidor" });
    const handleFailure = async (razon) => {
      failedLogin[username] += 1;

      if (failedLogin[username] >= 3) {
        logSuspiciousActivity(username, ip, razon);
      }
      await new Promise((resolve) => setTimeout(resolve, 600));

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

    failedLogin[username] = 0;

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
    if (err) {
      return res.status(500).json({ error: "Error al registrar usuario" });
    }
    res.json({ message: "Usuario registrado con éxito" });
  });
};

const verifyToken = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

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

// VULNERABLE: Blind SQL Injection
const checkUsername = (req, res) => {
  const { username } = req.body;

  // VULNERABLE: SQL injection que permite inferir información
  const query = `SELECT COUNT(*) as count FROM users WHERE username = '${username}'`;

  db.query(query, (err, results) => {
    if (err) {
      // VULNERABLE: Expone errores de SQL
      return res.status(500).json({ error: err.message });
    }

    const exists = results[0].count > 0;
    res.json({ exists });
  });
};

module.exports = {
  login,
  register,
  verifyToken,
  checkUsername,
};
