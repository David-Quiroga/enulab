const express = require("express");
const {mandar, mostrar, listar, actualizar} = require('../controller/bebidasController')
const router = express.Router();

router.post('/', mandar)
router.get('/', mostrar);
router.get('/:idBebida', listar);
router.put('/:idBebida', actualizar );

module.exports = router