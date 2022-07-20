const router = require('express').Router();
const userController = require('../conrollers/userController');
const roleMiddelWare=require('../middelWare/roleMiddelWare')


router.post('/register',userController.adminRegister)
router.post('/login',userController.login)
router.get('/logout',userController.logout)
router.get('/refresh_token',userController.refreshToken)

module.exports = router;