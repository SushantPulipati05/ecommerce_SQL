const { AdminPool, CustomerPool } = require('../database/db');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

const generateToken = (userId, role) => {
    return jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};


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
    const {email, password, role} = req.body;
    console.log("Login Attempt:", email, role);

    if (!email || !password || !role) {
        return res.status(400).json({ message: 'Please provide the email, role and password.' });
    }
    console.log("Received Role:", role); 
    console.log("Full Request Body:", req.body);
    try {
        let pool;

        if(role === 'Admin'){
            pool = AdminPool;
        }else if(role === 'Customer'){
            pool = CustomerPool;
        }else{
            return res.status(400).json({ message: 'Invalid role.' });
        }

        const [rows] = await pool.query('SELECT * FROM users WHERE Email = ?', [email])
        if(rows.length === 0){
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        const user = rows[0];
        console.log("User found:", user);
        
        const hashedPassword = user.PasswordHash;             
        const isMatch = await bcrypt.compare(password, hashedPassword);
        
        if(!isMatch){
            console.log("Password Mismatch")
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const token = generateToken(user.UserId, user.Role);
        console.log("generate token:", token)
        console.log(user.Name)
        console.log(user.Email)

        res.status(200).json({
            message: 'Login successful!',
            token,
            user:{
                name: user.Name,
                email: user.Email
            }
        });

    } catch (error) {
        console.log("server error")
        res.status(500).json({
            message: error.message            
        })
        
    }
})

module.exports = router;