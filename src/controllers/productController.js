const path = require('path');
const fs = require('fs')

const productController = {

  productDetail: (req, res) => {
    let id = req.params.id

    let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8');
    let products = JSON.parse(archivoJSON);
 
    products = products.filter (product => product.id == id);
    productToShow = products [0];
    return res.render('productDetail' , productToShow);

  },

  productList: (req, res) => {
    let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8');
    let products = JSON.parse(archivoJSON);

    let tipo = req.params.tipo;
    
    res.render("productList", { 'products': products , tipo})
    console.log (tipo)
  },

  productCart: (req, res) => {
    return res.render('productCart');
  },

  productEdit: (req, res) => {
    return res.render('productEdit');
  }

}


module.exports = productController;
