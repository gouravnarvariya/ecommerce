const jwt = require('jsonwebtoken');
const db = require('../database/database');

const User = db.User;

 const verifyJWT = async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        console.log("token---" , token);
        if (!token) {
           return res.status(401).json({ message: "Unauthorized request"});
        }
    
        const decodedToken = jwt.verify(token, 'your_secret_key')
        console.log("decodedToken----" , decodedToken)
        const user = await User.findOne({
            where: { id: decodedToken?.id },
            attributes: { exclude: ['password', 'refreshToken','otp'] }
          });

        console.log("user---- " , user.id)

        if (!user) {
           return res.status(401).json({ message: "Invalid User Access Token"});
        }
    
        req.user = user;
        next()
    } catch (error) {
        console.log("error---" ,error)
        return res.status(401).json({ message: "Invalid Access Token"});
        
    }
    
}

module.exports = {verifyJWT}