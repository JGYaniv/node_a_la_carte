const { Router } = require('express')
const modules = require('../controllers/modules_controller')

const router = new Router()

router.get('/modules', modules.index)
router.get('/modules/:name', modules.show)
router.post('/modules')

module.exports = router