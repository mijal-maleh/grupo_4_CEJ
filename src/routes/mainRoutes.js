const express = require ('express');
const mainController = require ('../controllers/mainController');
const router = express.Router();
const { body } = require('express-validator');


const registerValidaciones =[
     body('nombre').notEmpty().withMessage('Este campo es obligatorio'), 
    body('apellido').notEmpty().withMessage('Este campo es obligatorio'),
    body('email').notEmpty().withMessage('Este campo es obligatorio').bail()
        .isEmail().withMessage('Por favor ingrese un email válido'),
    body('contrasenia').notEmpty().withMessage('Este campo es obligatorio').bail()
        .isLength({ min:4  }).withMessage('La contraseña debe ser mas larga'),  
          body('confirmacionDeContrasenia').notEmpty().withMessage('Este campo es obligatorio').bail() 
          
];

const loginValidaciones =[
    
    body('email').notEmpty().withMessage('Ingrese su correo electrónico').bail()
        .isEmail().withMessage('Por favor ingrese un email válido'),
    body('contrasenia').notEmpty().withMessage('Ingrese su contraseña').bail()
        .isLength({ min:4  }).withMessage('La contraseña no es correcta'),
]; 




router.get('/',mainController.index);

/* router.get('/login',mainController.getLogin); */
router.post('/login',loginValidaciones,mainController.login);

router.get('/Register',mainController.getRegister);
router.post('/Register',registerValidaciones,mainController.register);

router.get('/error',mainController.error);
/* router.get('/logout', mainController.logout); */


module.exports = router;  