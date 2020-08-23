const { Client } = require('pg');
require('dotenv').config()

const client = () => {
    return new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    })
}

module.exports = {client}