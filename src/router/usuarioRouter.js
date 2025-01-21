const express = require('express');
const router = express.Router();
const { crear, login} = require('../controller/userController');
const authMiddleware = require('../middleware/auth.middleware');

// Rutas para crear usuario, login y validar correo
router.post('/crear', crear); // Ruta para crear usuario
router.post('/login', login, authMiddleware); // Ruta para iniciar sesión

module.exports = router;
