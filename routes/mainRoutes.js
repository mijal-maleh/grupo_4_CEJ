const express = require ('express');
const router = express.Router();
const mainController = require ('../controllers/mainController');


router.get('/',mainController.index);

router.get('/login',mainController.login);

router.get('/Register',mainController.register)

router.get('/error',mainController.error)

module.exports = router;  