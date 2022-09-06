const path = require ('path');

const usersController = {

    productCart: (req,res)=>{
        return res.render ('productCart');
        
    },
    
    profile: (req,res)=>{
        return res.render('profile');
        
    }   

}

module.exports = usersController;