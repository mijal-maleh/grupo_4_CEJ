const path = require ('path');
const fs = require('fs');
/*const multer = require("multer");*/
const bcryptjs = require('bcryptjs');
const usersJSON = fs.readFileSync(path.join(__dirname, "../data/users.json"), "utf-8");
const usuarios = JSON.parse(usersJSON);

const { validationResult } = require('express-validator')






const mainController = {
    index: (req,res)=>{
    let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8');
    let products = JSON.parse(archivoJSON);

      return res.render('index', {products})
    },
    
    getLogin: (req,res)=>{
       return res.render('login');
    },

    login: (req,res)=>{
        let errores = validationResult(req);
        if (errores.isEmpty()) {

            const userData = req.body;
            const usersJSON = fs.readFileSync(path.join(__dirname, "../data/users.json"), "utf-8");
            const usuarios = JSON.parse(usersJSON);

            
            const usuarioALoguear = usuarios.find(thisUser => thisUser.email === userData.email);
            if (usuarioALoguear) {
                let contraseñaCorrecta = bcryptjs.compareSync(userData.contrasenia, usuarioALoguear.contrasenia);
                if (contraseñaCorrecta) {
                    /* -antes del redireccionamiento, en caso de que el login este correcto, guardo su info en session.
                     - hago un request a session, atraves de una propiedad que la llamo userlogged donde guardo toda la info de usuarioAloguear.
                      antes de guardar la info, elimino la contraseña para q no se guarde*/
                    delete usuarioALoguear.contrasenia;
                    delete usuarioALoguear.confirmacionDeContrasenia;
                    req.session.userLogged = usuarioALoguear
                    res.redirect('/');
                } else {
                /*en caso de q no coincide contraseña con email ingresado*/
                    res.render('login', {
                        error: [
                            { msg: 'Los datos ingresados son incorrectos' }
                        ]
                    });
                }
            }else{  /*en caso de q no encuentra al email registrado en la db*/
                res.render('login', {
                    error: [
                        { msg: 'Aun no estas registrado' }
                    ]
                });
                 }
        } else {  /*en caso de q hay errores de validacion */
            
            //para enviar los errores a la vista, los agrego a la misma, con una propiedad a la que nombre 'error', donde pido 
            // que mi variable errores se muestre como array. y pido que los datos ingresados anteriormente por el usuario persistan.
            res.render('login', {
                error: errores.array(),
                datosIngresados: req.body,
            });
        }


      
    },


 
    getRegister:(req,res)=>{
        return res.render('register');
     },

    register: (req,res)=>{

        let errores = validationResult(req);
        if (errores.isEmpty()) {
            const usuarioRegistrado = usuarios.find(thisUser => thisUser.email === req.body.email);
            if (usuarioRegistrado) {
                res.render('register', {
                    error: [
                        { msg: 'Este mail ya esta registrado' }]
                })
            } else {

                const nuevoUsuario = {
                    id: Date.now(),
                    email: req.body.email,
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    /*profilePhoto: "./profilePhotos/" + req.file.filename,*/
                    contrasenia: req.body.contrasenia,
                    confirmacionDeContrasenia: req.body.confirmacionDeContrasenia,
                    fechaNacimiento:req.body.fechaNac,
                    fechaNacimientoHebrea:req.body.fechaNacheb,
                    pais:req.body.pais,
                    ciudad:req.body.ciudad,
                    barrio:req.body.barrio,
                    //encriptar contraseña
                    contrasenia: bcryptjs.hashSync(req.body.contrasenia, 10),
                    confirmacionDeContrasenia: bcryptjs.hashSync(req.body.confirmacionDeContrasenia, 10),
                };

                if (req.body.contrasenia !== req.body.confirmacionDeContrasenia) {
                    res.render('register', {
                        error: [
                            { msg: 'Las contraseñas no coinciden' }]
                    });
                } else {

                    usuarios.push(nuevoUsuario);

                    const usuariosActualizadosJSON = JSON.stringify(usuarios);

                    fs.writeFileSync(path.join(__dirname, "../data/users.json"), usuariosActualizadosJSON, "utf-8");
                    console.log(usuarios);
                    res.redirect('/login');
                }
             }
            } else {
            res.render('register', {
                error: errores.array(),
                datosIngresados: req.body
            });
         }
    },
    

    logout: (req, res) => {
        req.session.destroy();
        return res.redirect('/');
    },
    error: (req,res)=>{
        return res.render('error');
    }
}

module.exports = mainController;
