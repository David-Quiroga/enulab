const express = require("express");
const {mandar, mostrar, listar, actualizar} = require('../controller/heladosController')
const router = express.Router();

router.post('/', mandar)
router.get('/', mostrar);
router.get('/:idHelado', listar);
router.put('/:idHelado', actualizar );

module.exports = router