const express = require("express");
const {mandar, mostrar, listar, actualizar} = require('../controller/sopasController')
const router = express.Router();

router.post('/', mandar)
router.get('/', mostrar);
router.get('/:idSopa', listar);
router.put('/:idSopa', actualizar );

module.exports = router