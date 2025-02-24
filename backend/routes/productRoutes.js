const { AdminPool, CustomerPool } = require('../database/db');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();



router.get('/products', verifyToken , async(req,res)=>{
    try {
        const [products] = await CustomerPool.query('SELECT * FROM Products');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;