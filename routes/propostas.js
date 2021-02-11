'use strict';

// carregamento dos pacotes
const express = require('express');
const router = express.Router();

const route = router.get('/sub', (req, res, next) => {
    res.send("oi")
});

module.exports = route;