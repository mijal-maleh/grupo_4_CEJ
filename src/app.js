const express = require ('express');
const app = express();
const path = require ('path');
const morgan = require ('morgan', {})
const cookieParser = require('cookie-Parser'); 
const session = require("express-session"); 
/* const rememberMiddleware = require ("./middlewares/rememberMiddleware")
 */
const carritoMiddleware = require ("./middlewares/carritoMiddleware") 
const methodOverride = require ("method-override");

const productRouter = require('./routes/productRoutes');
const mainRouter = require('./routes/mainRoutes');
const usersRouter = require('./routes/usersRoutes');

app.set("view engine", "ejs");
app.set("views", [
    path.join(__dirname,  "/views/main"),
    path.join(__dirname,  "/views/products"),
    path.join(__dirname,  "/views/users"),
    path.join(__dirname,  "/views/partials"),
])

app.use(express.static(path.join(__dirname, "../public")))
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'))
app.use(cookieParser()); 
app.use(session({secret:"Mashiaj ya", resave: false, saveUninitialized: false})) 
/* app.use(rememberMiddleware); */
app.use(carritoMiddleware) 


app.use(productRouter);
app.use(mainRouter);
app.use(usersRouter);

app.use((req,res,next)=> {
    res.status(404).render("error")
})

app.listen(3001,()=>{
    console.log("B'H JABA en 3001");
})