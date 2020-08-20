const {Pool} = require('pg')

const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = {
    query: (text, parmas) => db.query(text, params)
}