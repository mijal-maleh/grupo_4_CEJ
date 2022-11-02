const express = require ('express');
const usersController = require('../controllers/usersController');
const router = express.Router();



router.get('/cart',usersController.productCart);

router.get('/profile',usersController.profile)

module.exports = router;