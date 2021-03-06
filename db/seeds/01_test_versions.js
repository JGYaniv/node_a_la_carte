const { client } = require('../index')

client.connect();

client.query(`
    INSERT INTO versions ( 
        num, mini, gzip, moduleId 
    )
    VALUES 
        ('16.13.1', 6300, 2600, 1),
        ('16.13.0', 6300, 2600, 1),
        ('16.12.0', 6400, 2600, 1),
        ('16.11.1', 6300, 2600, 1),
        ('15.6.0', 6700, 2300, 1),
        ('4.0.5', 7300, 2600, 2),
        ('4.0.4', 7200, 2600, 2),
        ('4.0.3', 7300, 2600, 2),
        ('4.0.2', 7300, 2600, 2),
        ('3.5.1', 7000, 2500, 2),
        ('8.3.2', 76800, 23600, 3),
        ('8.3.0', 76000, 23600, 3),
        ('8.2.2', 75900, 23600, 3),
        ('8.2.1', 75400, 23500, 3),
        ('7.18.2', 88200, 26900, 3),
        ('8.2.0', 1100, 670, 4),
        ('8.1.0', 1100, 670, 4),
        ('8.0.0', 1100, 648, 4),
        ('7.0.0', 1100, 648, 4),
        ('6.2.0', 1100, 648, 4)
`).then(res => {
    console.log(res);
    client.end();
}).catch(err => {
    console.log(err);
    client.end()
})

