const {Router} = require('express')
const { npmsSearch, npmRegSearch } = require('../utils/api-utils')
// const modulesDb = require('../db/modules')

const router = new Router()

router.get('/find', async (req, res) => {
    const result = await npmsSearch(req.query.q)
    res.json(result)
})

router.get('/details', async (req, res) => {
    const result = await npmRegSearch(req.query.q)
    res.json(result)
})

module.exports = router