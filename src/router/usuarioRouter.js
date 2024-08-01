const express = require('express');
const router = express.Router();
const { crear, login } = require('../controller/userController');

router.post('/crear', crear); // Ruta para crear usuario
router.post('/login', login); // Ruta para iniciar sesión

module.exports = router;
