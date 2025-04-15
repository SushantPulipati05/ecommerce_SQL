const { AdminPool, CustomerPool } = require('../database/db');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();



router.get('/by-category', async (req, res) => {
    const { name } = req.query;
  
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }
  
    try {
      // Get CategoryID based on name
      const [categoryRows] = await AdminPool.query(
        `SELECT CategoryID FROM Categories WHERE Name = ?`,
        [name]
      );
  
      if (categoryRows.length === 0) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      const categoryId = categoryRows[0].CategoryID;
  
      // Get products in that category
      const [products] = await AdminPool.query(
        `SELECT * FROM Products WHERE CategoryID = ?`,
        [categoryId]
      );
  
      res.json({ category: name, products });
    } catch (err) {
      console.error('Error fetching products by category:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.get('/:productId', async(req, res) =>{
    const { productId } = req.params;
    try{
        const [rows] = await AdminPool.query(`SELECT * FROM Products WHERE ProductID = ?`,[productId])

        if(rows.length == 0){
            return res.status(404).json({message: 'Product not found'})
        }

        return res.status(200).json(rows[0]);

    }catch (err) {
        res.status(500).json({ message: err.message });
    }
    
  })

  router.get('/get-reviews/:productId', async (req, res) => {
    const { productId } = req.params;
  
    try {
      const [rows] = await AdminPool.query(
        `SELECT 
           pr.ReviewID, pr.Rating, pr.ReviewText, pr.CreatedAt,
           u.Name AS UserName
         FROM ProductReviews pr
         JOIN Users u ON pr.UserID = u.UserID
         WHERE pr.ProductID = ?`,
        [productId]
      );
  
      if (rows.length === 0) {
        return res.status(404).json({ message: 'No reviews for this product' });
      }
  
      return res.status(200).json(rows); // send all reviews
    } catch (err) {
      console.error('Error fetching reviews:', err);
      res.status(500).json({ message: err.message });
    }
  });


  module.exports = router;