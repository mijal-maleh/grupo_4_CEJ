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
    
    login: (req,res)=>{
       return res.render('login');
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
                    contrasenia: req.body.clave,
                    confirmacionDeContrasenia: req.body.claveControl,
                    fechaNacimiento:req.body.fechaNac,
                    fechaNacimientoHebrea:req.body.fechaNacheb,
                    pais:req.body.pais,
                    ciudad:req.body.ciudad,
                    barrio:req.body.barrio,
                    //encriptar contraseña
                    contrasenia: bcryptjs.hashSync(req.body.clave, 10),
                    confirmacionDeContrasenia: bcryptjs.hashSync(req.body.claveControl, 10),
                };

                if (req.body.clave !== req.body.claveControl) {
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
    
    error: (req,res)=>{
        return res.render('error');
    }

}

module.exports = mainController;
