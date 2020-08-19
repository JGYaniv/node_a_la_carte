const {Router} = require('express')
const modulesDb = require('../db/modules')

const router = new Router()

router.get('/', async (req, res) => {
    const result = await modulesDb.getPopularModules()
    res.json(result)
})

router.get('/find', async (req, res) => {
    const query = req.query.q
    const result = await fetch(`http://api.npms.io/v2/search?${query.split(" ").join("+")}`)
    res.json(result.results.map(result => result.package.name))
})

router.get('/details', async (req, res) => {
    const query = req.query.q
    const result = await fetch(`http://api.npms.io/v2/search?${query.split(" ").join("+")}`)
    res.json(result.results[0].package)
})