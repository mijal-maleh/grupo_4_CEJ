const express = require ('express');
const app = express();
const path = require ('path');

const productRouter = require('./routes/productRoutes');
const mainRouter = require('./routes/mainRoutes');
const usersRouter = require('./routes/usersRoutes');


app.listen(3001,()=>{
    console.log("B'H JAVA en 3001");
})

const rutaCompleta = path.join (__dirname,'/public')

app.use(express.static(rutaCompleta));

app.use('/product',productRouter);
app.use('/', mainRouter);
app.use('/users', usersRouter);