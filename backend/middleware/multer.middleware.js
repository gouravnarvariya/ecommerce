
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/Users/gouravnarvariya/Desktop/ecommerce/backend/public/temp')
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
  module.exports = multer({ storage: storage });