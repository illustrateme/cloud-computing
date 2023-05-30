const express = require('express');
const router = require(express.Router);

router.get('/', async (req, res, next) => {
    res.send({message: 'API is working'})
})

module.exports = router;