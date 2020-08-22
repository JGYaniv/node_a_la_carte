const { Router } = require('express')
const { npmsSearch, npmRegSearch } = require('../utils/api-utils')
const { getSizes } = require('../utils/bash-utils')
// const modulesDb = require('../db/modules')

const router = new Router()

router.get('/find', async (req, res) => {
    const result = await npmsSearch(req.query.q)
    res.json(result)
})

router.get('/details', async (req, res) => {
    const result = await npmRegSearch(req.query.q)

    const versions = await Promise.all(result.versions.map(
        async version => {
            const sizes = await getSizes(result.name, version)
            return { version: version, ...sizes }
        }
    ))

    res.json({
        name: result.name,
        lastUpdated: result.lastUpdated,
        versions
    })
})

module.exports = router