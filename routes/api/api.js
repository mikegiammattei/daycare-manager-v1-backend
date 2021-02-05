const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('', (req,res) =>{
    res.send("Api Route");
});

module.exports = router;
