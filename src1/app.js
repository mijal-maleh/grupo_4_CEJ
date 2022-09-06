const express = require ('express');
const app = express();
const path = require ('path');

const productRouter = require('./routes/productRoutes');
const mainRouter = require('./routes/mainRoutes');
const usersRouter = require('./routes/usersRoutes');

app.set("view engine", "ejs");



app.listen(3001,()=>{
    console.log("B'H JABA en 3001");
})

app.use(express.static(path.join(__dirname, "../public")))


app.use('/product',productRouter);
app.use('/', mainRouter);
app.use('/users', usersRouter);