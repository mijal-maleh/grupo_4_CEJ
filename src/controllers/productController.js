const path = require('path');
const fs = require('fs')

const productController = {

  productList: (req, res) => {
    let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8');
    let products = JSON.parse(archivoJSON);

    let tipo = req.params.tipo;

    res.render("productList", { 'products': products, tipo })
  },

  productDetail: (req, res) => {

    let id = Number(req.params.id)
    console.log(id)
    let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8');
    let products = JSON.parse(archivoJSON);
    let productToShow
    for (let i = 0; i < products.length; i++) {
      if (products[i].id == id) {
        productToShow = products[i]
      }
    }
    res.render('productDetail', { productToShow, products });

  },

  productEdit: (req, res) => {
    let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8');
    let products = JSON.parse(archivoJSON);
    let idProduct = Number(req.params.id);

    let productToEdit

    for (let product of products) {
      if (product.id == idProduct) {
        productToEdit = product
      }
    }
    res.render('productEdit', { productToEdit: productToEdit });
  },

  postEdit: (req, res) => {

    let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8');
    let products = JSON.parse(archivoJSON);

    //INFO QUE VIENE DEL FORM DE EDITAR EL PRODUCTO
    const productEdited = req.body;

    //CONSIGO EL PRODUCTO ORIGINAL PARA RECUPERAR EL RESTO DE LA INFO
    let productOld
    for (let product of products) {
      if (product.id == productEdited.id) {
        productOld = product
      }
    }

    //CHEQUEO SI HUBO CAMBIO DE FOTO Y COMPLETO LA INFO
    if (req.file == undefined) {
      productEdited.photo = productOld.photo
    }
    else {
      let photoNamePathEdit = "/images/photoProduct/" + req.file.originalname;
      productEdited.photo = photoNamePathEdit;
    }

    //EVITA CONFLICTO DE TIPO EN EL ID
    productEdited.id = productOld.id;

    //RECONSTRUYO EL OL
    let finalProductEdited = {
      "id": productEdited.id,
      "product_name": productEdited.product_name,
      "price": productEdited.price,
      "type": productEdited.type,
      "photo": productEdited.photo,
      "photo_name": productEdited.photo_name,
      "descrip": productEdited.descrip
    };

    //REEMPLAZO EL PRODUCTO EN EL ARRAY DE PRODUCTOS
    let productsEdited = [];
    for (let i = 0; i < products.length; i++) {

      if (products[i].id == productEdited.id) {
        productsEdited.push(finalProductEdited)
      } else {
        productsEdited.push(products[i])
      }
    }

    //PASO A JSON Y RENDERIZO LA LISTA DE PRODUCTOS 

    let productJSON = JSON.stringify(productsEdited);
    fs.writeFileSync(path.join(__dirname, "../data/products.json"), productJSON, "utf-8");

    res.render('productDetail', { productToShow, products });
  },

  postDelete: (req, res) => {


    res.render("productList", { 'products': products, tipo })
  },

  productCart: (req, res) => {
    return res.render('productCart');
  },
}


module.exports = productController;
