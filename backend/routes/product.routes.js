const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../middleware/auth.middleware');
const prdtCtrl = require('../controller/product.controller')

router.get('/product-all' ,verifyJWT ,prdtCtrl.getAllProduct )
router.get('/category-all' ,verifyJWT ,prdtCtrl.getAllCategory )
router.post('/add-to-wishlist',verifyJWT   , prdtCtrl.addToWishlist)
router.get('/get-product-from-wishlist',verifyJWT  , prdtCtrl.getProductFromWishlist)
router.get('/get-product-by-category' ,verifyJWT , prdtCtrl.getProductByCategory)
router.get('/get-product-by-id',verifyJWT  , prdtCtrl.getProductById)
router.get('/get-products-by-search',verifyJWT  , prdtCtrl.getProductsBySearch)


module.exports = router;