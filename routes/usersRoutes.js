const express = require ('express');
const usersController = require('../controllers/usersController');
const usersRouter = express.Router();



router.get('/productCart',usersController.productCart);

router.get('/profile',usersController.profile)

module.exports = usersRouter;