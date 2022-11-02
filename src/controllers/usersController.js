const path = require('path');

const usersController = {

    productCart: (req, res) => {
        cart = req.session.carrito
        res.render('cart', { cart });
    },

    profile: (req, res) => {
        return res.render('profile');
    }
}

module.exports = usersController;