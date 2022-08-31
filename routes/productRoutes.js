const express = require ('express');
const productController = require('../controllers/productController');
const productRouter = express.Router();

router.get('/productDetail',productController.productDetail);

router.get('/productList',productController.productList);


module.exports = productRouter;