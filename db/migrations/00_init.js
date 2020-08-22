const {client} = require('../index')

client.connect();

client.query(`
    CREATE TABLE modules (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        description TEXT,
        sourceUpdated TIMESTAMP NOT NULL DEFAULT NOW(),
        createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    
    CREATE TABLE versions (
        id SERIAL PRIMARY KEY,
        num VARCHAR(255) NOT NULL,
        mini int,
        gzip int,
        moduleId int NOT NULL,  
        FOREIGN KEY (moduleId)
            REFERENCES modules(id)
            ON DELETE CASCADE
    );
`).then( res => {
    console.log(res);
    client.end();
}).catch(err => { 
    console.log(err); 
    client.end() 
})
