const fs = require("fs");
const path = require("path");

let carritoMiddleware = (req, res, next) => {

    //voy a crear una cookie para el carrito
    //permite un carrito por cliente (no necesita loguearse)
    //el carrito va a contener los id de productos separados por una barra /
    let stringCarrito
    let arrayCarrito
    console.log(req.cookies)
    //veo si ya tiene una cookie creada o vacia
    if (req.cookies.carrito == undefined) {
        //creo la cookie
        res.cookie("carrito", "", { maxAge: 1000 /*milisegundos = 1 seg*/ * 60 /*1 min*/ * 60 /*1 hora*/ * 24  /*1 dia*/ * 365 * 10, /*10 anios de duracion */ })
        next()
    } else {
        if (req.cookies.carrito == "") {
            next()
        } else {
            //si ya esta creada la cookie, voy a transformar al codigo en un array
            stringCarrito = req.cookie.carrito
            arrayCarrito = stringCarrito.split("/")
            //guardo el carrito en session
            req.session.carrito = arrayCarrito;
            next()
        }
    }
}
module.exports = carritoMiddleware;