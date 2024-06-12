const express = require('express');
const app = express()
const cors = require('cors'); 
const cookieParser = require('cookie-parser');
const path = require("path");



//
app.use(cors())
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());



//Router
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/product', require('./routes/product.routes'));
app.use('/api/cart', require('./routes/cart.routes'));



app.get((req,res)=>{
    res.json({message:"api is working"})
})



app.listen(4050,()=>{
    console.log("server is running")
})

