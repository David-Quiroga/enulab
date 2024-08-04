const express = require("express");
const {mandar, mostrar, listar, actualizar} = require('../controller/empleadoController')
const router = express.Router();

router.post('/', mandar)
router.get('/', mostrar);
router.get('/:idEmpleado', listar);
router.put('/:idEmpleado', actualizar );

module.exports = router