const { client } = require('../db/index')

class Version {
    constructor({ num, mini, gzip, moduleId }) {
        this.num = num
        this.mini = mini
        this.gzip = gzip
        this.moduleId = moduleId
    }

    static get(moduleName) {
        //gets the version details from directory
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

    static create({ num, mini, gzip, moduleId }) {
        //posts a new verion to the database
        const db = client()
        db.connect()
        return db.query({
            text: `
                INSERT INTO versions (num, mini, gzip, moduleId) 
                VALUES ($1::text, $2::int, $3::int, $4::int)
            `,
            values: [num, mini, gzip, moduleId]
        })
            .catch(e => {
                console.log(e)
                db.end()
                return
            })
            .then(res => {
                db.end()
                return {message: 'success!'}
            })
    }
}

module.exports = { Version }