const { client } = require('../index')

client.connect();

client.query(`
    INSERT INTO modules ( 
        name, description 
    )
    VALUES 
        ( 
            'react', 'For all your diffing needs' 
        ),
        ( 
            'redux', 'A global state manager' 
        ),
        ( 
            'pg', 'Postgres for node' 
        ),
        ( 
            'dotenv', 'Library for calling on the node environment' 
        )
`).then(res => {
    console.log(res);
    client.end();
}).catch(err => {
    console.log(err);
    client.end()
})
