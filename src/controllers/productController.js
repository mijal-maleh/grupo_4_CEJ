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
      if (product.id == Number(productEdited.id)) {
        productOld = product
      }
    }

    //CHEQUEO SI HUBO CAMBIO DE FOTO Y COMPLETO LA INFO
    let imagenActividad;
    let photo_name;
    if (req.file == undefined) {
      imagenActividad = productOld.imagenActividad
      photo_name = productOld.photo_name
    }
    else {
      let photoNamePathEdit = "/images/" + req.file.originalname;
      imagenActividad = photoNamePathEdit;
      photo_name = req.file.filename
    }
  
    // ASIGNO EL ICONO
    let tipos = ["Clases", "Encuentros", "Cursos","Festividades","Viajes"]
    let icons = ["fa-solid fa-person-chalkboard", "fa-solid fa-utensils", "fa-solid fa-book" , "fa-solid fa-hanukiah" , "fa-solid fa-plane-departure"]
    let icon
  for (let i = 0; i < tipos.length; i++) {
    
    if (tipos[i] = productEdited.type){
      icon = icons[i];
    }
  }
  
    //RECONSTRUYO EL OL
    let finalProductEdited = {
      "id": productEdited.id,
      "tipoActividad": productEdited.type,
      "iconoTipoAct" : icon,
      "nombreActividad": productEdited.nameProd,
      "destacado": productEdited.destacado,
      "descripcionActividad": productEdited.descProd,
      "fechaActividad": productEdited.dateProd,
      "horaActividad": productEdited.timeProd,
      "costoActividad": productEdited.costProd,
      "imagenActividad": imagenActividad,
      "photo_name": photo_name,
    };
   
    //REEMPLAZO EL PRODUCTO EN EL ARRAY DE PRODUCTOS
    let productsEdited = [];
    for (let i = 0; i < products.length; i++) {

      if (products[i].id == finalProductEdited.id) {
        productsEdited.push(finalProductEdited)
      } else {
        productsEdited.push(products[i])
      }
    }

    //PASO A JSON Y RENDERIZO LA LISTA DE PRODUCTOS 

    let productJSON = JSON.stringify(productsEdited);
    fs.writeFileSync(path.join(__dirname, "../data/products.json"), productJSON, "utf-8");

    productToShow = finalProductEdited
    res.render('productDetail', {productToShow, products });
  },

  postDelete: (req, res) => {
    let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8');
    let products = JSON.parse(archivoJSON);

    let idProduct = req.params.idProduct;

    let productsEdited = [];
    let productDeletedName;
    
    for (let i = 0; i < products.length; i++) {

        if (products[i].id != idProduct) {
            productsEdited.push(products[i])
        } else {
            productDeletedName = products[i].nombreActividad;
        }
    }
    let productJSON = JSON.stringify(productsEdited);
    fs.writeFileSync(path.join(__dirname, "../data/products.json"), productJSON, "utf-8");

    let tipo="All"
    res.render("productList", { 'products': productsEdited, tipo, 'mensaje': 'La Actividad "' + productDeletedName + '" fue eliminada exitosamente' })
  },

  productCart: (req, res) => {
    return res.render('productCart');
  },
}


module.exports = productController;
