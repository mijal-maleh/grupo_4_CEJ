const path = require ('path');

const productController = {

    productDetail: (req,res)=>{
        const rutaCompleta = path.join (__dirname,'/views/productDetail.html');
        res.sendFile (rutaCompleta)
    },

    productList: (req,res)=>{
        const rutaCompleta = path.join (__dirname,'/views/productList.html');
        res.sendFile (rutaCompleta)
    },
}

module.exports = productController;
