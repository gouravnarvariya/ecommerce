const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../middleware/auth.middleware');
const cartCtrl = require('../controller/cart.controller')

router.get('/cart-all' , cartCtrl.getAllCartProduct )
router.post("/add-to-cart" ,  cartCtrl.addToCart)

module.exports = router