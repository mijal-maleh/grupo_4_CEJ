const path = require ('path');

const mainController = {
    index: (req,res)=>{
      return res.render('index')
    },
    
    login: (req,res)=>{
       return res.render('login');
    },
    
    register: (req,res)=>{
        return res.render('register');
    },
    
    error: (req,res)=>{
        return res.render('error');
    }
}

module.exports = mainController;
