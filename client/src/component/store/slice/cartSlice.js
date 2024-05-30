import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Api from "../../Api/Api"
import { toast } from "react-toastify"


const initialState = {
    cartList : {pending:false , data:null , error : null}
}

export const getCartProduct = createAsyncThunk (
    "/get-cart-product" , 
    async () => {
        
        try {
            const id = localStorage.getItem('_id')
        const response = await Api.get(`/cart/cart-all?id=${id}`)
        const {data , message , statusCode} = response
        if(statusCode) {
            
            return data
        } 
        console.log(response)
        } catch (error) {
            console.log(error)
        }
}
)

export const addCartProduct = createAsyncThunk(
    '/add-cart-product' , 
    async (body) => {
        console.log(body)
        try {
            const res = await Api.post('/cart/add-to-cart' , body)
            const {statusCode , data} = res
            if(statusCode) {
                toast.success(data.message)
            }
            console.log(res)
        }catch (error) {
            console.log(error)
        }
    }
)

const CartSlice = createSlice({
    
    name : "cart" , 
    initialState:initialState,
    reducers : {

    },
    extraReducers(builder) {
        builder 

        .addCase(getCartProduct.pending ,(state,action) => {
            state.cartList.pending=true
        } )

        .addCase(getCartProduct.fulfilled , (state,action) => {

            state.cartList.pending = false;
            // console.log("action.payload---",action.payload)
            if (action.payload) {
                state.cartList.data = action.payload;
              } else {
                state.cartList.error = action.payload.error;
              }
        } )

        .addCase(getCartProduct.rejected , (state,action) => {
            state.cartList.pending = false;
            if (action?.payload?.error) {
              state.cartList.error = action?.payload?.error;
            } else {
              state.cartList.error = {
                type: "server",
                message: "Internal server Error",
              }
            }
        })
    }
    


})

export default CartSlice.reducer
// export const {} = CartSlice.actions