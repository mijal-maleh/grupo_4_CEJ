const express = require ('express');
const productController = require('../controllers/productController');
const multer = require ('multer');
const router = express.Router();
const uploadFile = require ('../middlewares/multerProducts.js')

router.get('/productDetail/:id',productController.productDetail);

router.get('/productList/:tipo',productController.productList);

router.get('/productCart',productController.productCart);

router.get('/productEdit',productController.productEdit);


module.exports = router;