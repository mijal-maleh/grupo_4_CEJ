const express = require ('express');
const mainController = require ('../controllers/mainController');
const mainRouter = express.Router();


router.get('/',mainController.index);

router.get('/login',mainController.login);

router.get('/register',mainController.register)

router.get('/error',mainController.error)

module.exports = mainRouter;