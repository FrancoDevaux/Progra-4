const express = require('express');
const router = express.Router();
const vulnerabilityController = require('../controllers/vulnerabilityController');
const { uploadMiddleware, uploadFile } = require('../controllers/uploadController');
const csrf = require('csurf');

// Configuración CSRF
const csrfProtection = csrf();

// Middleware para validar Origin (ANTES de CSRF)
const validateOrigin = (req, res, next) => {
  const origin = req.get('origin');
  const allowedOrigins = ['http://localhost:3000']; 
  
  if (origin && !allowedOrigins.includes(origin)) {
    return res.status(403).json({ error: 'Origin invalido' });
  }
  next();
};

//RUTAS
//Command Injection
router.post('/ping', vulnerabilityController.ping);

//CSRF
router.get('/csrf-token', csrfProtection, vulnerabilityController.getCsrfToken);
router.post('/transfer', validateOrigin, csrfProtection, vulnerabilityController.transfer);

//LFI
router.get('/file', vulnerabilityController.readFile);

//Upload
router.post('/upload', uploadMiddleware, uploadFile);

//IMPORTANTE: Manejador de errores para transformar el error de csurf en JSON
router.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ error: 'CSRF token invalido' });
  }
  next(err);
});

module.exports = router;