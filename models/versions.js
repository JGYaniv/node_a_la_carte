const { client } = require('../db/index')

class Version {
    constructor({ num, mini, gzip, moduleId }) {
        this.num = num
        this.mini = mini
        this.gzip = gzip
        this.moduleId = moduleId
    }

    static get(moduleName) {
        //gets the module details from directory
        const db = client()
        db.connect()
        return db.query({
            text: `
                SELECT num, mini, gzip
                FROM versions
                JOIN modules
                    ON modules.id = versions.moduleId 
                WHERE modules.name = $1::text
            `,
            values: [moduleName]
        })
            .catch(e => {
                console.log(e)
                db.end()
                return
            })
            .then(res => {
                db.end()
                return res.rows
            })
    }

    // static create({ name, description, sourceUpdated }) {
    //     //posts a new module to the database
    //     //gets the module details from directory
    //     const db = client()
    //     db.connect()
    //     return client.query({
    //         text: `
    //             INSERT INTO modules (name, description, sourceUpdated) 
    //             VALUES ($1::text, $2::text, $3::date)
    //         `,
    //         values: [name, description, sourceUpdated]
    //     })
    //         .catch(e => {
    //             console.log(e)
    //             db.end()
    //             return
    //         })
    //         .then(res => {
    //             db.end()
    //             return res.rows
    //         })
    // }

    // async update(moduleDetails) {
    //     //updates the records for an existing module
    // }

    // async versions() {
    //     // returns associated versions
    // }
}

module.exports = { Version }