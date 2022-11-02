const path = require('path');
const fs = require('fs')

const usersController = {

    productCart: (req, res) => {
        let cartIDs = req.session.carrito;

        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8');
        let products = JSON.parse(archivoJSON);


        let cart = []
        cartIDs.forEach(id => {
            for (let i = 0; i < products.length; i++) {
               if(Number(id) == Number(products[i].id)) {
                cart.push(products[i])
               }
            }
        });
        
        res.render('cart', { cart });
    },

    addCart: (req,res) => {
        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8');
        let products = JSON.parse(archivoJSON);

        //recupero el ID del producto a agregar
        let id = req.body.idCart
        console.log("id " + id)

        //recupero el carrito (array de IDs)
        let cartIDs = req.session.carrito;
        console.log("cartIDs " + cartIDs)

        //agrego el ID al carrito previo
   
        if (cartIDs.indexOf(id) < 0){
            cartIDs.push(id)
        }
        
        console.log("cartIDs + ID pusheado "+ cartIDs)

        //actualizo session
        req.session.carrito = cartIDs
        console.log("session queda asi " + req.session.carrito)

        console.log("la cookie estaba asi " + req.cookies.carrito)
        //actualizo la cookie
        res.cookie("carrito", req.cookies.carrito + id + "/", { maxAge: 1000 /*milisegundos = 1 seg*/ * 60 /*1 min*/ * 60 /*1 hora*/ * 24  /*1 dia*/ * 365 * 10, /*10 anios de duracion */ })
        
        console.log("la cookie queda asi " + req.cookies.carrito)
        console.log (req.session.carrito)

        //obtengo los productos asociados a los IDs
        let cart = []
        cartIDs.forEach(id => {
            for (let i = 0; i < products.length; i++) {
               if(Number(id) == Number(products[i].id)) {
                cart.push(products[i])
               }
            }
        });
        
        
        console.log (req.session.carrito)
        
        

        
        res.render('cart', {cart})
        /* res.render('productDetail', { productToShow, products }); */
    },

    cartDelete: (req, res) => {
        res.render ('cart', {cart})
    },

    profile: (req, res) => {
        return res.render('profile');
    }
}

module.exports = usersController;