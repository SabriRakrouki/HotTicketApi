const router = require('express').Router();
const userController = require('../conrollers/userController');
const { Role } = require('../helper/role');
const { auth, authAdmin, authRole } = require('../middelWare/authentification');
const imageUpload=require('../middelWare/upload')


router.post('/adminsignup',  userController.adminRegister)
router.post('/signup',imageUpload,  userController.registerSimpleUser)
router.post('/eventprovidersignup',  userController.eventProvideRegister)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.get('/refresh_token', authAdmin, authRole(Role.ADMIN), userController.refreshToken)

module.exports = router;