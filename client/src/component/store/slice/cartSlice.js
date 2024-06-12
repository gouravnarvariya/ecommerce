import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../Api/Api";
import { toast } from "react-toastify";

const initialState = {
    cartList: { pending: false, data: null, error: null },
};

export const getCartProduct = createAsyncThunk(
    "/get-cart-product",
    async () => {
        try {
            const id = localStorage.getItem('_id');
            const response = await Api.get(`/cart/cart-all?id=${id}`);
            const { data, statusCode, message } = response;
            if (statusCode) {
                return data;
            } else {
                return { error: { type: "server", message } };
            }
        } catch (error) {
            if (error.response) {
                const { data } = error.response;
                return { error: { type: "server", message: data.message } };
            } else if (error.request) {
                return { error: { type: "network", message: "Network Error" } };
            } else {
                return { error: { type: "unknown", message: error.message } };
            }
        }
    }
);

export const addCartProduct = createAsyncThunk(
    '/add-cart-product',
    async (body) => {
        try {
            const response = await Api.post('/cart/add-to-cart', body);
            const { statusCode, data } = response;
            if (statusCode) {
                toast.success(data.message);
                return data;
            } else {
                return { error: { type: "server", message: data.message } };
            }
        } catch (error) {
            if (error.response) {
                const { data } = error.response;
                return { error: { type: "server", message: data.message } };
            } else if (error.request) {
                return { error: { type: "network", message: "Network Error" } };
            } else {
                return { error: { type: "unknown", message: error.message } };
            }
        }
    }
);

const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCartProduct.pending, (state) => {
                state.cartList.pending = true;
            })
            .addCase(getCartProduct.fulfilled, (state, action) => {
                state.cartList.pending = false;
                if (action.payload) {
                    state.cartList.data = action.payload;
                } else {
                    state.cartList.error = action.payload.error;
                }
            })
            .addCase(getCartProduct.rejected, (state, action) => {
                state.cartList.pending = false;
                state.cartList.error = action.payload?.error || {
                    type: "server",
                    message: "Internal server Error",
                };
            })
            .addCase(addCartProduct.pending, (state) => {
                state.cartList.pending = true;
            })
            .addCase(addCartProduct.fulfilled, (state, action) => {
                state.cartList.pending = false;
                if (action.payload) {
                    // Assuming the data returned from adding to cart might be added to the cartList
                    state.cartList.data = [...(state.cartList.data || []), action.payload];
                } else {
                    state.cartList.error = action.payload.error;
                }
            })
            .addCase(addCartProduct.rejected, (state, action) => {
                state.cartList.pending = false;
                state.cartList.error = action.payload?.error || {
                    type: "server",
                    message: "Internal server Error",
                };
            });
    }
});

export default CartSlice.reducer;
