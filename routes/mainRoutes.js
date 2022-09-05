const express = require ('express');
const mainController = require ('../controllers/mainController');
const router = express.Router();


router.get('/',mainController.index);

router.get('/login',mainController.login);

router.get('/Register',mainController.register)

router.get('/error',mainController.error)

module.exports = router;  