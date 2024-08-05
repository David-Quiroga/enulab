const express = require('express');
const router = express.Router();
const { mandar, mostrar, listar, actualizar} = require('../controller/proveedorController'); // Asegúrate de que la ruta al controlador sea correcta


router.post('/', mandar);
router.get('/', mostrar);
router.get('/:id', listar);
router.put('/:id', actualizar )

module.exports = router;
