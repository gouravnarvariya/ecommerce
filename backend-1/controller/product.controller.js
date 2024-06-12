const { Op } = require("sequelize");
const { Category } = require("../models/category.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const { Wishlist } = require("../models/wishlist.model");
const ApiResponse = require("../utils/ApiResponse");


const getAllProduct = async (req, res) => {
    try {
        console.log("Fetching all products...");
        const products = await Product.findAll();
        // console.log("Products retrieved: ", products);
        return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { products:products },
          )
        );
    } catch (error) {
        console.error("Error fetching products: ", error);
        res.status(500).json({
            error: "An error occurred while fetching products."
        });
    }
};

const getAllCategory = async (req, res) => {
    try {
        console.log("Fetching all category...");
        const category = await Category.findAll();
        // console.log("category retrieved: ", category);
        return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { category:category },
          )
        );
    } catch (error) {
        console.error("Error fetching category: ", error);
        res.status(500).json({
            error: "An error occurred while fetching category."
        });
    }
};

// Controller function to add a product to a user's wishlist
const  addToWishlist = async (req,res) => {
    try {
        const {userId , productId} = req.body
        // Check if the user and product exist
        console.log("id-----",userId , productId)
        const user = await User.findByPk(userId);
        const product = await Product.findByPk(productId);

        if (!user || !product) {
            return { success: false, message: 'User or product not found.' };
        }

        // Check if the product is already in the user's wishlist
        const existingWishlistItem = await Wishlist.findOne({
            where: {
                user_id: userId,
                product_id: productId
            }
        });

        // If the product already exists in the wishlist, delete the existing one
        if (existingWishlistItem) {
            await existingWishlistItem.destroy();
            return res
            .status(200)
            .json(
              new ApiResponse(
                200,
                { message: 'Product removed  from wishlist successfully.'  },
              )
            );
        }

        // Add the product to the user's wishlist
        await Wishlist.create({
            user_id: userId,
            product_id: productId
        });

        return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { message: 'Product added to wishlist successfully.'  },
          )
        );

        
    } catch (error) {
        console.error('Error adding product to wishlist:', error);
        return { success: false, message: 'An error occurred while adding the product to the wishlist.' };
    }
}

const getProductFromWishlist = async (req, res) => {
  try {
    console.log("req.user" , req.user)
    // Extract user ID from the query parameters
    const userId = req.query.id;
    
    // Query the database to find all wishlist items for the specified user ID
    const wishlistItems = await Wishlist.findAll({ 
      where: { user_id: userId }, 
      include: [{ model: Product }] 
    });
    
    // Respond with the wishlist items
    return res.status(200).json({
      statusCode:200,
      success: true,
      message: 'Wishlist items fetched successfully.',
      data:wishlistItems
    });
  } catch (error) {
    console.error('Error fetching wishlist items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getProductByCategory = async (req, res) => {
  try {
    console.log(req.query)
    const { id } = req.query; // Extract category_id directly from req.query
    
    const products = await Product.findAll({
      where: {
        category_id:id
      }
    });
    
    // Respond with the product items
    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Product items according to category fetched successfully.',
      data: products
    });
  } catch (error) {
    console.error('Error fetching product items by category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.query; // Adjust if the id is from req.params instead
    console.log(id);
    
    const product = await Product.findByPk(id); // Correct usage of findByPk with await

    // Check if product exists
    if (!product) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'Product not found.',
        data: null
      });
    }

    // Respond with the product item
    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Product fetched successfully.',
      data: product
    });

  } catch (error) {
    console.error('Error fetching product item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Controller function to get list of 6 products that start with specific words
const getProductsBySearch = async (req, res) => {
  try {
    // Get the 'startWords' query parameter (assuming it's a comma-separated list of words)
    const { startWords } = req.query;
    
    if (!startWords) {
      return res.status(400).json({ error: 'startWords query parameter is required' });
    }
    console.log("startWords-----" ,startWords);
    
    // Split the startWords into an array
    const wordsArray = startWords.split(',');

    // Create an array of LIKE conditions for each word
    const likeConditions = wordsArray.map(word => ({
      name: {
        [Op.like]: `%${word}%`
      }
    }));

    console.log("likeConditions----", likeConditions);

    // Find products that match any of the LIKE conditions
    const products = await Product.findAll({
      where: {
        [Op.or]: likeConditions
      },
      limit: 6
    });

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Product items according to category fetched successfully.',
      data: products
    });
    
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'An error occurred while fetching products' });
  }
};


 

module.exports = {
    getAllProduct,
    getAllCategory,
    addToWishlist,
    getProductFromWishlist,
    getProductByCategory,
    getProductById,
    getProductsBySearch
}