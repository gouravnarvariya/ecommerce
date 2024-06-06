const { Op, json } = require('sequelize');
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
  const { name, email, phone_number, password, address } = req.body;

  if ([name, email, address, password].some((field) => !field || field.trim() === "")) {
    // throw new ApiError(400, "All fields are required");
    return res.status(409).json({statusCode:400, error: "All fields are required"});
  }

  const existedUser = await User.findOne({
    where: {
      [Op.or]: [{ name }, { email }]
    }
  });

  if (existedUser) {
   return res.status(409).json({statusCode:409, error: "User with email or username already exists" });
  }

 

  const user = await User.create({
    name,
    email,
    phone_number,
    address,
    password
  });

  const createdUser = await User.findByPk(user.id, {
    attributes: { exclude: ['password', 'refresh_token'] }
  });

  if (!createdUser) {
    console.error('Error fetching product item:', error);
    res.status(500).json({statusCode:500,  error: 'Internal server error' });
  }

  return res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'User Registered successfully.',
    data: createdUser
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
   return res.status(404).json({ statusCode:404, message: "Email and password are required" });
    // throw new ApiError(400, "Email and password are required");
  }

  try{

  

  const user = await User.findOne({
    where: { email }
  });

  if (!user) {
    // throw new ApiError(404, "User does not exist");
   return  res.status(404).json({ message: "User does not exist" });
  }

  const isPasswordValid = password===user.password

  if (!isPasswordValid) {
    return  res.status(404).json({ message: "password invalid" });

  }

  const refreshToken = jwt.sign({ id: user.id }, 'your_secret_key',{ expiresIn: '30d' });
  const accessToken = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', { expiresIn: '10s' });

  await User.update(
    { refresh_token: refreshToken }, // Set refresh_token to null
    { where: { id: user.id } } // Update condition
);

  const loggedInUser = await User.findByPk(user.id, {
    attributes: { exclude: ['password', 'refresh_token'] }
  });

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: {loggedInUser, accessToken, refreshToken }},
        "User logged in successfully"
      )
    ); } catch (error) {
      return res.status(500).json({message: "Internal server error" });
    }
};

const logoutUser = async (req, res) => {
    console.log("request" , req.body.id)
    // Assuming req.user contains the current user's information
    const userId = req.body.id;

    // Update the user's refresh_token to null or empty value
    await User.update(
        { refresh_token: null }, // Set refresh_token to null
        { where: { id: userId } } // Update condition
    );

    // Clear cookies and send response
    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
};

const refreshAccessToken = async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(403, "Unauthorized request");
    }
    console.log("incomint--" , incomingRefreshToken)
    try {
        const decodedToken = jwt.verify(incomingRefreshToken,  'your_secret_key');

        console.log("decoded token" , decodedToken)

        const user = await User.findOne({ where: { id: decodedToken.id } });

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        console.log("user.refresh_token--",user.refresh_token)

        if (incomingRefreshToken !== user.refresh_token) {
            throw new ApiError(401, "Refresh token is expired or invalid");
        }

        // Generate new access and refresh tokens
        // const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user.id);
        // const refreshToken = jwt.sign({ id: user.id }, 'your_secret_key');
        const accessToken = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', { expiresIn: '50s' });

        const options = {
            httpOnly: true,
            secure: true
        };

        // Set new cookies and send response
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", incomingRefreshToken, options)
            .json(new ApiResponse(200, { accessToken, incomingRefreshToken }, "Access token refreshed"));
    } catch (error) {
        throw new ApiError(401, error.message || "Invalid refresh token");
    }
};

const changeCurrentPassword = async (req, res) => {
    const { newPassword , id } = req.body;
    // console.log("request" , req.body)

    // Fetch the current user based on their ID
    const user = await User.findByPk(id);

    // Ensure the user exists
    if (!user) {
        throw new ApiError(404, "User not found");
    }


    if (!newPassword) {
        throw new ApiError(400, "Enter password");
    }

    // Update the password with the new one
    user.password = newPassword;

    // Save the user with the new password
    await user.save();

    return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
};

const updateAccountDetails = async (req, res) => {
    const { name, email , address , phone_number , id ,profile_image } = req.body;
    console.log("first-----")
    console.log("req.body-----" , req.body)
    if (!name || !email || !address || !phone_number ) {
        throw new ApiError(400, "All fields are required");
    }

    // Assuming req.user contains the current user's information
    const userId = id;

    // Update the user's fullName and email
    await User.update(
        { name, email , address , phone_number },
        { where: { id: userId } }
    );

    // Fetch the updated user record
    const updatedUser = await User.findByPk(userId, {
        attributes: { exclude: ['password' ,'refresh_token','otp'] }
    });

    return res
        .status(200)
        .json(new ApiResponse(200, updatedUser, "Account details updated successfully"));
};

const uploadProfileImage = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            throw new ApiError(400, "Id required");
        }
    
  
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      // Construct the URL for the uploaded file
      const imageUrl = `/public/temp/${req.file.filename}`;
      console.log("image profile", req.file);
  
      // Update profile photo for the customer
      const user = await User.findOne({ where: { id:id } });
      user.profile_image = imageUrl
      await user.save();
      // await Customer.update({ profile_photo: imageUrl }, { where: { email: email } });
  
      res.status(200).json({
        statusCode: 200,
        message: 'Image uploaded successfully',
        imageUrl: imageUrl,
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

const getUserData = async (req, res) => {
  const {id} = req.body

  const userId = id;

  const UserData = await User.findByPk(userId, {
    attributes: { exclude: ['password' ,'refresh_token','otp'] }
});
if (!UserData) {
  return  res.status(404).json({ message: "User does not exist" });

}

return res
.status(200)
.json(new ApiResponse(200, UserData, "Account details get successfully"));

}
  





module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  updateAccountDetails,
  uploadProfileImage,
  getUserData
};
