const express = require('express');
const { mandar, mostrar, listar, actualizar} = require('../controller/inventarioController');
const router = express.Router();

router.post('/', mandar);
router.get('/', mostrar);
router.get('/:id', listar);
router.put('/:id', actualizar )

module.exports = router;