const express = require ('express');
const productController = require('../controllers/productController');
const usersRouter = express.Router();
const usersController = require('../controllers/usersController');


router.get('/productCart',usersController.productCart);

router.get('/profile',usersController.profile)

module.exports = usersRouter;