const CategoryController = require('../controllers/CategoryController')
const CuisineController = require('../controllers/CuisineController')
const PubController = require('../controllers/PubController')
const UserController = require('../controllers/UserController')
const authentication = require('../middlewares/authentication')
const cuisineAuthorization = require('../middlewares/cuisineAuthorization')
const userAuthorization = require('../middlewares/userAuthorization')
const errorHandler = require('../middlewares/errorHandler')
const cors = require("cors")

const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = require('express').Router()
router.use(cors())

//public
router.get('/public/cuisines',PubController.pubShowCuisine)
router.get('/public/cuisines/:id',PubController.pubDetailCuisine)

//user
router.post('/login',UserController.login)


router.use(authentication)
router.post('/add-user',userAuthorization,UserController.addUser)

//cuisine
router.get('/cuisines',CuisineController.showCuisine)
router.post('/cuisines',CuisineController.createCuisine)

router.get('/cuisines/:id',CuisineController.detailCuisine)
router.put('/cuisines/:id',cuisineAuthorization,CuisineController.editCuisine)
router.patch('/cuisines/:id',cuisineAuthorization,upload.single("image"),CuisineController.patchCuisine)
router.delete('/cuisines/:id',cuisineAuthorization,CuisineController.deleteCuisine)


//category
router.get('/categories',CategoryController.showCategory)
router.post('/categories',CategoryController.createCategory)

router.get('/categories/:id',CategoryController.oneCategory)
router.put('/categories/:id',CategoryController.editCategory)
router.delete('/categories/:id',CategoryController.deleteCategory)

router.use(errorHandler)

module.exports = router