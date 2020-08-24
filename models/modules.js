const { client } = require('../db/index')

class Module {
    constructor({name, description}){
        this.name = name
        this.description = description
    }

    static search(query) {
        //returns the names & ids of all modules that match query string in desc order by total dls
        const db = client()
        db.connect()
        return db.query({
            text: `SELECT name FROM modules WHERE name LIKE $1::text`,
            values: [`%${query}%`]
        })
            .catch(e => { 
                console.log(e)
                db.end() 
                return
            })
            .then(res => { 
                db.end()
                return res.rows.map(module => module.name)
            })
    }
    
    static get(name) {
        //gets the module details from the db
        const db = client()
        db.connect()
        return db.query({
            text: `
                SELECT id, name, description
                FROM modules 
                WHERE name = $1::text
            `,
            values: [name]
        })
            .catch(e => {
                console.log(e)
                db.end()
                return
            })
            .then(res => {
                db.end()
                return res.rows ? res.rows[0] : {error: "module not in database"}
            })
    }
    
    static create({name, description, sourceUpdated}){
        //posts a new module to the database
        const db = client()

        db.connect()
        return db.query({
            text: `
                INSERT INTO modules (name, description, sourceUpdated) 
                VALUES ($1::text, $2::text, $3::date)
            `,
            values: [name, description, sourceUpdated]
        })
            .catch(e => {
                console.log(e)
                db.end()
                return
            })
            .then(res => {
                db.end()
                return res.rows[0]
            })
    }
    
}

module.exports = { Module }