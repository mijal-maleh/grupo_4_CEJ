const express = require ('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.get('/productDetail',productController.productDetail);

router.get('/productList',productController.productList);

router.get('/productCart',productController.productCart);

router.get('/productEdit',productController.productEdit);


module.exports = router;