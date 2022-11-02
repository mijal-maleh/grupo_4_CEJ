const express = require ('express');
const usersController = require('../controllers/usersController');
const carritoMiddleware = require('../middlewares/carritoMiddleware');
const router = express.Router();



router.get('/cart', carritoMiddleware, usersController.productCart);

router.get('/profile',usersController.profile)

module.exports = router;