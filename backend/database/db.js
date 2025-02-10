const mysql = require('mysql2');
require('dotenv').config();

const AdminPool = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLADMIN,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE
}).promise()

const CustomerPool = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLCUSTOMER,
    password: process.env.MYSQLCUSTOMERPASSWORD,
    database: process.env.MYSQLDATABASE
}).promise()

const admin_connection = async()=>{    
    try {
        const connection = await AdminPool.getConnection();
        console.log("Connected to MySQL Admin database ✅");
        connection.release(); 
    } catch (err) {
        console.error("Database connection failed:", err);
    }
}

const customer_connection = async()=>{    
    try {
        const connection = await CustomerPool.getConnection();
        console.log("Connected to MySQL Customer database ✅");
        connection.release(); 
    } catch (err) {
        console.error("Database connection failed:", err);
    }
}

const createTable = async (tableName, schema) => {
    try {
        await AdminPool.query(`CREATE TABLE IF NOT EXISTS ${tableName} (${schema})`); 
    } catch (err) {
        console.error(`Error creating ${tableName} table:`, err);
    }
};


module.exports =  {AdminPool, admin_connection, createTable, customer_connection, CustomerPool};