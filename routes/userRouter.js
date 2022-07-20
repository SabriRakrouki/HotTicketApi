const router = require('express').Router();
const userController = require('../conrollers/userController');
const { auth, authAdmin } = require('../middelWare/authentification')
const roleMiddelWare = require('../middelWare/roleMiddelWare')


router.post('/register', userController.adminRegister)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.get('/refresh_token', auth, roleMiddelWare("admin"),userController.refreshToken)

module.exports = router;