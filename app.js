const express = require ('express');
const app = express();
const dotenv = require ('dotenv').config();
const productRouter = require ('productRouter');
const mainRouter = require ('mainRouter');
const usersRouter = require ('usersRouter');


app.listen(process.env.PORT || 3001,'0.0.0.0',()=>{
    console.log("B'H JAVA en " +process.env.PORT);
})

const rutaCompleta = path.join (__dirname,'/public')

app.use(express.static(rutaCompleta));

app.use('/product', productRouter);
app.use('/', mainRouter);
app.use('/users', usersRouter);