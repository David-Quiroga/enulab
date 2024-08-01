const express = require('express');
const { mandar, mostrar} = require('../controller/inventarioController');
const router = express.Router();

router.post('/', mandar)
router.get('/', mostrar);

module.exports = router;