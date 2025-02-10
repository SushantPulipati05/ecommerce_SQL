const { AdminPool, CustomerPool } = require('../database/db');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();

router.post('/signup', async(req, res)=>{
    const {name, email, password, role} = req.body;
    
    if(!name || !email || !password || !role){
        return res.status(400).json({message: 'Please fill in all fields.'});
    }

    try {
        const hashedPassword = await bcrypt.hash(password,10);

        let pool;

        if(role === 'Admin'){
            return res.status(403).json({ message: 'Admin signup is restricted.' });
        }else{
            pool = CustomerPool;
        }

        await pool.query(
            `INSERT INTO Users (Name, Email, PasswordHash, Role) VALUES (?, ?, ?, ?)`,
            [name, email, hashedPassword, role]
        );
        res.status(201).json("User signup successful!!")
    } catch (err) {
        res.status(500).json({ message: err.message });        
    }
})

router.post('/login', async(req, res)=>{
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide both email and password.' });
    }
})


module.exports = router;