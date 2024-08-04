const express = require('express');
const router = express.Router();
const { mandar, mostrar, eliminar, actualizar } = require('../controller/proveedorController'); // Asegúrate de que la ruta al controlador sea correcta


router.post('/', mandar);
router.get('/', mostrar);
router.delete('/:id', eliminar);  // Nueva ruta para eliminar un proveedor
router.put('/:id', actualizar);
router.get('/:id', mostrar);   // Nueva ruta para actualizar un proveedor

module.exports = router;
