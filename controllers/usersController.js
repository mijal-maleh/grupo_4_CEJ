const path = require ('path');

const usersController = {

    productCart: (req,res)=>{
        const rutaCompleta = path.join (__dirname,'/views/productCart.html');
        res.sendFile (rutaCompleta)
    },
    
    profile: (req,res)=>{
        const rutaCompleta = path.join (__dirname,'/views/profile.html');
        res.sendFile (rutaCompleta)
    }   

}

module.exports = usersController;