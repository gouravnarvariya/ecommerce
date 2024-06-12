const Cart = require("../models/cart.model")
const Product = require('../models/product.model');
const ApiResponse = require("../utils/ApiResponse");


const addToCart = async (req, res) => {
    try {

        const { product_id, quantity, id } = req.body;

        if (quantity === 0) {
            await Cart.destroy({
                where: { user_id: id, product_id: product_id },
            });

            return res.status(201).json({
                message: "Removed from cart successfully",
            });
        }

        const existingCartItem = await Cart.findOne({
            where: { user_id: id, product_id: product_id },
        });

        let resMessage = "";

        if (existingCartItem) {
            await existingCartItem.update({ quantity });
            resMessage = "Updated successfully";
        } else {
            await Cart.create({ user_id: id, product_id, quantity });  // Correct model name
            resMessage = "Added to cart successfully";
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { message: resMessage },
                )
            );
    } catch (error) {
        console.error('Error adding product to cart:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while adding the product to the cart.'
        });
    }
};

const getAllCartProduct = async (req,res) => {

    try {
        const { id } = req.query; 
         // Query the database to find all cart items for the specified user ID
    const cartItems = await Cart.findAll({ 
        where: { user_id: id }, 
        include: [{ model: Product }] 
      });
      
      // Respond with the cart items
      return res.status(200).json({
        statusCode:200,
        success: true,
        message: 'Cart items fetched successfully.',
        data:cartItems
      });
    } catch (error) {
      console.error('Error fetching cart items:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllCartProduct,
    addToCart
}
