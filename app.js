const express = require ('express');
const app = express();
const path = require ('path');

app.listen(3001,()=>{
    console.log("B'H JAVA en 3001");
})

app.use(express.static('public'));

app.get('/',(req,res)=>{
    const rutaCompleta = path.join (__dirname,'/views/index.html');
    res.sendFile (rutaCompleta)
})

app.get('/login',(req,res)=>{
    const rutaCompleta = path.join (__dirname,'/views/login.html');
    res.sendFile (rutaCompleta)
})

app.get('/productCart',(req,res)=>{
    const rutaCompleta = path.join (__dirname,'/views/productCart.html');
    res.sendFile (rutaCompleta)
})

app.get('/productDetail',(req,res)=>{
    const rutaCompleta = path.join (__dirname,'/views/productDetail.html');
    res.sendFile (rutaCompleta)
})

app.get('/register',(req,res)=>{
    const rutaCompleta = path.join (__dirname,'/views/register.html');
    res.sendFile (rutaCompleta)
})

app.get('/error404',(req,res)=>{
    const rutaCompleta = path.join (__dirname,'/views/error.html');
    res.sendFile (rutaCompleta)
})

app.get('/profile',(req,res)=>{
    const rutaCompleta = path.join (__dirname,'/views/profile.html');
    res.sendFile (rutaCompleta)
})

app.get('/productList',(req,res)=>{
    const rutaCompleta = path.join (__dirname,'/views/productList.html');
    res.sendFile (rutaCompleta)
})

