const { AdminPool } = require('./db')

async function fetchTables() {
    try {
        const [result] = await pool.query(`SHOW TABLES`);
        return result;
    } catch (err) {
        console.error("Error fetching tables:", err);
        throw err;
    }
}

module.exports = {fetchTables};