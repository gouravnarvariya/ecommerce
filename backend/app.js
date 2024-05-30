const express = require('express');
const app = express()
const cors = require('cors'); 
const cookieParser = require('cookie-parser');
const path = require("path");
// const bodyParser = require('body-parser');

//routter
const userRouter = require('./routes/user.routes')
const productRouter = require('./routes/product.routes')
const cartRouter = require('./routes/cart.routes')



app.use(cors())
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.json());
// app.use(cors());
app.use(express.json());



//Router
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);



app.get((req,res)=>{
    res.json({message:"message"})
})

app.listen(4050,()=>{
    console.log("server is running")
})

