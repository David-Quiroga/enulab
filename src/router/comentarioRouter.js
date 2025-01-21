const express = require("express");
const {mandar, mostrar, listar} = require('../controller/comentariosController')
const router = express.Router();

router.post('/', mandar)
router.get('/', mostrar);
router.get('/:idValoracion', listar);

module.exports = router