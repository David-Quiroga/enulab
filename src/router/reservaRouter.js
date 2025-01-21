const express = require("express");
const {mandar, mostrar, listar} = require('../controller/reservaController');
const router = express.Router();

router.post('/', mandar)
router.get('/', mostrar)
router.get('/:idRserva', listar)

module.exports = router

