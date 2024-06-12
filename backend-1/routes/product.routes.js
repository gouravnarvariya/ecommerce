const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../middleware/auth.middleware');
const prdtCtrl = require('../controller/product.controller')

router.get('/product-all' ,verifyJWT ,prdtCtrl.getAllProduct )
router.get('/category-all' ,verifyJWT ,prdtCtrl.getAllCategory )
router.post('/add-to-wishlist'  , prdtCtrl.addToWishlist)
router.get('/get-product-from-wishlist' , prdtCtrl.getProductFromWishlist)
router.get('/get-product-by-category' , prdtCtrl.getProductByCategory)
router.get('/get-product-by-id' , prdtCtrl.getProductById)
router.get('/get-products-by-search' , prdtCtrl.getProductsBySearch)


module.exports = router;