const express = require ('express');
const productController = require('../controllers/productController');
const multer = require ('multer');
const router = express.Router();
const uploadFile = require ('../middlewares/multerProducts.js')

router.get('/productList/:tipo',productController.productList);
router.get('/productDetail/:id',productController.productDetail);
router.get('/productEdit/:id', productController.productEdit);
router.post('/productEdit',uploadFile.single ("imagenActividad"), productController.postEdit);
router.post('/productDelete', productController.postDelete);
router.get('/productCart',productController.productCart);




module.exports = router;