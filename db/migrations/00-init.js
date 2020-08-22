const { Client } = require('pg');
require('dotenv')

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

client.query(
    `CREATE TABLE modules (
        id int SERIAL PRIMARY KEY,
        name VARCHAR(255),
        description TEXT,
        sourceUpdated TIMESTAMP NOT NULL DEFAULT NOW(),
        createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    )
    
    CREATE TABLE versions (
        id int SERIAL PRIMARY KEY,
        num VARCHAR(255) NOT NULL,
        mini int,
        gzip int,
        FOREIGN KEY (moduleId)
            REFERENCES modules(id)
            ON DELETE CASCADE
    )
    
    CREATE INDEX modules_index`,
    (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
            console.log(JSON.stringify(row));
        }
        client.end();
    }
)
