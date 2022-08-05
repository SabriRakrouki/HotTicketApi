const router = require('express').Router();
const userController = require('../conrollers/userController');
const { auth, authAdmin } = require('../middelWare/authentification')
const roleMiddelWare = require('../middelWare/roleMiddelWare')


router.post('/adminsignup', userController.adminRegister)
router.post('/signup', userController.registerSimpleUser)
router.post('/eventprovidersignup', userController.eventProvideRegister)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.get('/refresh_token', authAdmin, roleMiddelWare("admin"),userController.refreshToken)

module.exports = router;