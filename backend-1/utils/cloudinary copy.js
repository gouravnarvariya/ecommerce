import {v2 as cloudinary} from "cloudinary"
// import fs from "fs"


// cloudinary.config({ 
//     cloud_name: "doeedtjh9", 
//     api_key: "241991456376376",
//   api_secret: RD5JeeXxsTLASTjPEntakgxsqnY
// });

// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) return null
//         //upload the file on cloudinary
//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto"
//         })
//         // file has been uploaded successfull
//         //console.log("file is uploaded on cloudinary ", response.url);
//         fs.unlinkSync(localFilePath)
//         return response;

//     } catch (error) {
//         fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
//         return null;
//     }
// }


// module.exports = cloudinary;


// config/cloudinary.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: "doeedtjh9", 
    api_key: "241991456376376",
  api_secret: RD5JeeXxsTLASTjPEntakgxsqnY
});

module.exports = cloudinary;

