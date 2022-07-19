const router = require('express').Router();
const roleMiddelWare=require('../middelWare/roleMiddelWare')


router.post('/register')
router.post('/login')
router.get('/logout',roleMiddelWare('test'))
router.get('/refresh_token')

module.exports = router;