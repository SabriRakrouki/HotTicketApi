const router = require('express').Router();
const userController = require('../conrollers/userController');
const { auth, authAdmin } = require('../middelWare/authentification')
const roleMiddelWare = require('../middelWare/roleMiddelWare')


router.post('/addCategory', userController.adminRegister)
router.post('/deleteCategory', userController.registerSimpleUser)
router.post('/updatecategory', userController.eventProvideRegister)
router.post('/gellAllCategories', userController.login)
router.get('/getCategoryById', userController.logout)


module.exports = router;