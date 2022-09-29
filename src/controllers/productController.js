const path = require('path');

const productController = {

  productDetail: (req, res) => {
    return res.render('productDetail');

  },

  productList: (req, res) => {
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
