const router = require('express').Router();
const categoryController = require('../conrollers/categoryController');
const { Role } = require('../helper/role');
const { auth, authAdmin, authRole } = require('../middelWare/authentification')



router.post('/addCategory', authAdmin, authRole(Role.ADMIN), categoryController.addCategory)
router.post('/deleteCategory', authAdmin, authRole(Role.ADMIN), categoryController.deleteCategory)
router.post('/updatecategory', authAdmin, authRole(Role.ADMIN), categoryController.updateCategroy)
router.post('/gellAllCategories', authAdmin, authRole(Role.ADMIN), categoryController.getAllCategories)
router.get('/getCategoryById:idCategory', authAdmin, authRole(Role.ADMIN), categoryController.getCategoryById)


module.exports = router;