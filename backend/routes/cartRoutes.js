const { AdminPool, CustomerPool } = require('../database/db');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();


router.post('/add', async (req, res) => {
    const { userId, productId, quantity } = req.body;
  
    if (!userId || !productId || !quantity || quantity < 1) {
      return res.status(400).json({ message: 'Missing or invalid fields' });
    }
  
    try {
      // 1. Check if user already has a cart
      const [existingCart] = await AdminPool.query(
        `SELECT * FROM Carts WHERE UserID = ?`,
        [userId]
      );
  
      let cartId;
  
      if (existingCart.length === 0) {
        const [newCartResult] = await AdminPool.query(
          `INSERT INTO Carts (UserID) VALUES (?)`,
          [userId]
        );
        cartId = newCartResult.insertId;
      } else {
        cartId = existingCart[0].CartID;
      }
  
      // 2. Check if the product is already in the cart
      const [existingItem] = await AdminPool.query(
        `SELECT * FROM CartItems WHERE CartID = ? AND ProductID = ?`,
        [cartId, productId]
      );
  
      if (existingItem.length > 0) {
        // 3. If it exists, increment the quantity
        await AdminPool.query(
          `UPDATE CartItems SET Quantity = Quantity + ? WHERE CartID = ? AND ProductID = ?`,
          [quantity, cartId, productId]
        );
      } else {
        // 4. Else, add it as a new item
        await AdminPool.query(
          `INSERT INTO CartItems (CartID, ProductID, Quantity) VALUES (?, ?, ?)`,
          [cartId, productId, quantity]
        );
      }
  
      res.status(200).json({ message: 'Item successfully added to cart' });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  



router.get('/get', async (req, res) => {
    const { userId } = req.query; 
  
    if (!userId) {
      return res.status(400).json({ message: 'Missing userId' });
    }
  
    try {
      const [cart] = await AdminPool.query(
        `SELECT * FROM Carts WHERE UserID = ?`,
        [userId]
      );
  
      if (cart.length === 0) {
        return res.status(404).json({ message: 'No cart found for this user' });
      }
  
      const cartId = cart[0].CartID;
  
      
      const [cartItems] = await AdminPool.query(
        `SELECT ci.CartItemID, ci.Quantity, p.Name, p.Price, p.ImageURL
         FROM CartItems ci
         JOIN Products p ON ci.ProductID = p.ProductID
         WHERE ci.CartID = ?`,
        [cartId]
      );
  
      res.status(200).json({ cartItems });
    } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router;