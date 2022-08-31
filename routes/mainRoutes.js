const express = require ('express');
const mainRouter = express.Router();
const mainController = require ('../controllers/mainController');


router.get('/',mainController.index);

router.get('/login',mainController.login);

router.get('/register',mainController.register)

router.get('/error',mainController.error)

module.exports = mainRouter;