const express = require("express");
const {mandar, mostrar, listar, actualizar} = require('../controller/entradaController')
const router = express.Router();

router.post('/', mandar)
router.get('/', mostrar);
router.get('/:idEntrada', listar);
router.put('/:idEntrada', actualizar );

module.exports = router