const path = require ('path');

const mainController = {
    index: (req,res)=>{
        const rutaCompleta = path.join (__dirname,'../views/index.html');
        res.sendFile (rutaCompleta)
    },
    
    login: (req,res)=>{
        const rutaCompleta = path.join (__dirname,'.. /views/login.html');
        res.sendFile (rutaCompleta)
    },
    
    register: (req,res)=>{
        const rutaCompleta = path.join (__dirname,'../views/register.html');
        res.sendFile (rutaCompleta)
    },
    
    error: (req,res)=>{
        const rutaCompleta = path.join (__dirname,'/views/error.html');
        res.sendFile (rutaCompleta)
    }
}

module.exports = mainController;
