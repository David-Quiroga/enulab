const express = require('express');
const { mandar, mostrar, actualizar, listar} = require('../controller/restauranteController');
const router = express.Router();

router.post('/', mandar)
router.get('/', mostrar);
router.get('/:id', listar);
router.put('/:id', actualizar )

module.exports = router