const express = require('express');
const { mandar, mostrar} = require('../controller/index.controller');
const router = express.Router();

router.post('/restaurante', mandar)
router.get('/restaurante/:id', mostrar);




module.exports = router