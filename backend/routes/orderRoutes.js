const { AdminPool, CustomerPool } = require('../database/db');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();


router.post('/checkout', async (req, res) => {
  const { userId, totalAmount, orderStatus, address,deliveryType,quantity,paymentMethod, orderItems } = req.body;

  if (!userId || !totalAmount || !address || !deliveryType || !quantity || !paymentMethod || !orderItems || orderItems.length === 0) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const connection = await AdminPool.getConnection()
  try {
    
    await connection.beginTransaction();

    
    const addressQuery = `INSERT INTO Addresses (UserID, FullName, AddressLine1, AddressLine2, City, State, ZipCode)
                          VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const [addressResult] = await connection.query(addressQuery, [
      userId,
      `${address.firstName} ${address.lastName}`,
      address.addressLine1,
      address.addressLine2 || '',
      address.city,
      address.state,
      address.zipCode,
    ]);

    const orderQuery = `INSERT INTO Orders (UserID, TotalAmount, OrderStatus, AddressID, DeliveryType, Quantity, PaymentMethod) 
                        VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const [orderResult] = await connection.query(orderQuery, [
      userId,
      totalAmount,
      orderStatus || 'Pending',
      addressResult.insertId,  
      deliveryType,
      quantity,
      paymentMethod
    ]);

    
    const orderItemsQuery = `INSERT INTO OrderItems (OrderID, ProductID, Quantity, Price)
                               VALUES (?, ?, ?, ?)`;
    for (let i = 0; i < orderItems.length; i++) {
      const detail = orderItems[i];
      await connection.query(orderItemsQuery, [
        orderResult.insertId,  
        detail.productId,
        detail.quantity,
        detail.price,
      ]);
    }

  
    await connection.commit();

    
    return res.status(201).json({ success: true, message: 'Order placed successfully', orderId: orderResult.insertId });
  } catch (err) {
    
    await connection.rollback();
    console.error('Error placing order:', err);
    res.status(500).json({ success: false, message: 'Error placing the order' });
  } finally {
    connection.release();
  }
});

router.get('/:orderId', async (req, res) => {
  const { orderId } = req.params;

  const connection = await AdminPool.getConnection();

  try {
    
    const [orderRows] = await connection.query(
      `SELECT o.*, a.FullName, a.AddressLine1, a.AddressLine2, a.City, a.State, a.ZipCode
       FROM Orders o
       JOIN Addresses a ON o.AddressID = a.AddressID
       WHERE o.OrderID = ?`,
      [orderId]
    );

    if (orderRows.length === 0) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const order = orderRows[0];
    
    const [itemRows] = await connection.query(
      `SELECT oi.*, p.Name AS ProductName, p.ImageURL
       FROM OrderItems oi
       JOIN Products p ON oi.ProductID = p.ProductID
       WHERE oi.OrderID = ?`,
      [orderId]
    );
    
    return res.status(200).json({
      success: true,
      order: {
        OrderID: order.OrderID,
        UserID: order.UserID,
        TotalAmount: order.TotalAmount,
        OrderStatus: order.OrderStatus,
        DeliveryType: order.DeliveryType,
        Quantity: order.Quantity,
        PaymentMethod: order.PaymentMethod,
        Address: {
          FullName: order.FullName,
          AddressLine1: order.AddressLine1,
          AddressLine2: order.AddressLine2,
          City: order.City,
          State: order.State,
          ZipCode: order.ZipCode,
        },
        items: itemRows.map(item => ({
          ProductID: item.ProductID,
          ProductName: item.ProductName,
          Quantity: item.Quantity,
          Price: item.Price,
          ImageURL: item.ImageURL
        }))
      }
    });
  } catch (err) {
    console.error('Error fetching order:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch order' });
  } finally {
    connection.release();
  }
});


module.exports = router;
