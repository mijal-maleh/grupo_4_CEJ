const path = require('path');
const fs = require ('fs')

const productController = {

  productDetail: (req, res) => {
    return res.render('productDetail');

  },

  productList: (req, res) => {
    let archivoJSON = fs.readFileSync(path.join(__dirname,'../data/products.json'), 'utf-8');
        let products = JSON.parse(archivoJSON);
        res.render("productList", {'products': products})
    return res.render('productList');

  },

  productCart: (req, res) => {

    return res.render('productCart');

  },

  productEdit: (req, res) => {
    return res.render('productEdit');
  }

}


  module.exports = productController;
