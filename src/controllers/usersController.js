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
        console.log(id)

        //recupero el carrito (array de IDs)
        let cartIDs = req.session.carrito;
        console.log(cartIDs)

        //agrego el ID al carrito previo
        cartIDs.push(id)
        console.log(cartIDs)

        //actualizo session
        req.session.carrito = cartIDs

        console.log(req.cookies.carrito)
        //actualizo la cookie
        req.cookies.carrito = req.cookies.carrito + id + "/"
        console.log(req.cookies.carrito)

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

    profile: (req, res) => {
        return res.render('profile');
    }
}

module.exports = usersController;