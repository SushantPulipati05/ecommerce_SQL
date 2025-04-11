const express = require('express');
const app = express();
const cors  = require('cors');
const dotenv = require('dotenv');
const {pool} = require('./database/db.js')
const {admin_connection,customer_connection} = require('./database/db.js')
const {fetchTables} = require('./database/queries.js')
const userRoutes = require('./routes/userRoutes.js')
const productRoutes = require('./routes/productRoutes.js')
require('./database/schema.js')

dotenv.config();

app.use(express.json())
app.use(cors())

admin_connection();
customer_connection();

app.use('/auth', userRoutes);
app.use('/dashboard', productRoutes)


app.get("/", async(req, res) => {
    try{
        const tables = await fetchTables();
        res.json(tables)
    }catch (err) {
        console.error("Error fetching tables:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


app.listen(process.env.PORT ,()=>{
    console.log(`the server is listening on port ${process.env.PORT}`)
})