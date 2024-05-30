import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Api from "../../Api/Api"
import { toast } from "react-toastify"



const initialState = {
    productList:{pending:false , data:null, error:null},
    categoryList : {pending:false , data:null , error:null},
    wishlistProductList : {pending:false , data:null , error:null},
    productByCategoryList : {pending:false , data:null , error:null},
    productById :{pending:false , data:null , error:null},
    searchList : {pending:false , data:null , error:null},
}

export const getAllProduct = createAsyncThunk (
    "/product/all",
    async() => {
        try {
            const response = await Api.get('/product/product-all')
            const {statusCode , data}  = response
            if(statusCode) {
              return data
            } else {
              return {
                error: { type: "server", message:"server error"  },
              }
            }
        }catch (error) {
          console.log(error)
          if (error.response) {
            console.log(error.response)
            // Server responded with an error status code
            const { status, data } = error.response;
            return { error: { type: "server", message: data.message } };
          } else if (error.request) {
            console.log(error.request)

            // The request was made but no response was received
            return { error: { type: "network", message: "Network Error" } };
          } else {
            console.log(error)

            // Something happened in setting up the request that triggered an error
            return { error: { type: "unknown", message: error.message } };
          }
    }
    }
)

export const getAllCategory = createAsyncThunk(
  "/category/all",
  async () => {
   try { const response = await Api.get('/product/category-all')
    // console.log(response)
    const {statusCode , data} = response
    if(statusCode) {
      return data
    } else {
      return {
        error: { type: "server", message:"server error"  },
      }
    }
  } catch (error) {
    console.log(error)
    if (error.response) {
      console.log(error.response)
      // Server responded with an error status code
      const { status, data } = error.response;
      return { error: { type: "server", message: data.message } };
    } else if (error.request) {
      console.log(error.request)

      // The request was made but no response was received
      return { error: { type: "network", message: "Network Error" } };
    } else {
      console.log(error)

      // Something happened in setting up the request that triggered an error
      return { error: { type: "unknown", message: error.message } };
    }
}
}
)

export const addToWishlist = createAsyncThunk(
  "/add to wishlist",
  async (body) => {
    try{
      const response = await Api.post('/product/add-to-wishlist', body)
      const{statusCode, data} = response 
      if(statusCode) {
        toast.success(data.message)
        return data 
      } else {
        return {
          error: { type: "server", message:"server error"  },
        }
      }
    } catch (error) {
      console.log(error)
      if (error.response) {
        console.log(error.response)
        // Server responded with an error status code
        const { status, data } = error.response;
        return { error: { type: "server", message: data.message } };
      } else if (error.request) {
        console.log(error.request)
  
        // The request was made but no response was received
        return { error: { type: "network", message: "Network Error" } };
      } else {
        console.log(error)
  
        // Something happened in setting up the request that triggered an error
        return { error: { type: "unknown", message: error.message } };
      }
  }
  }
)

export const getAllWishlistProduct = createAsyncThunk (
  'wishlist/get/all/product',
  async () => {
    try {
      const userId = localStorage.getItem("_id");
      if (!userId) {
        throw new Error('User ID not found in localStorage');
      }
      const response = await Api.get(`/product/get-product-from-wishlist?id=${userId}`);
      // console.log(response)
      const{statusCode , data , message} = response
      
      if(statusCode){
        return data
      } else {
        return {
          error: { type: "server", message:"server error"  },
        }
      }
       // Assuming response.data contains the wishlist items
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
      throw error; // Re-throw the error to propagate it to the Redux store
    }
  }
);

export const getProductByCategory = createAsyncThunk (

  "/get-product-by-category",
  async(category_id) => {
    console.log(category_id)
    
    try{
      // const category_id = body
      const response = await  Api.get(`/product/get-product-by-category?id=${category_id}`, )
      const {statusCode , data ,message} = response
      console.log(response)
      if(statusCode) {
        return data
      } else {
        return {
          error: { type: "server", message:"server error"  },
        } 
      }
    } catch (error) {
      console.error('Error fetching product items:', error);
      throw error; // Re-throw the error to propagate it to the Redux store
    }
  }
)

export const getProductByCId = createAsyncThunk (

  "/get-product-by-id",
  async(product_id) => {
    // console.log(product_id)
    
    try{
      // const category_id = body
      const response = await  Api.get(`/product/get-product-by-id?id=${product_id}`, )
      const {statusCode , data ,message} = response
      // console.log(response)
      if(statusCode) {
        return data
      } else {
        return {
          error: { type: "server", message:"server error"  },
        } 
      }
    } catch (error) {
      console.error('Error fetching product items:', error);
      throw error; // Re-throw the error to propagate it to the Redux store
    }
  }
)

export const getProductBySearch = createAsyncThunk (

  "/get-product-by-search",
  async(searchQuery) => {
    // console.log(product_id)
    
    try{
      
      const response = await  Api.get(`/product/get-products-by-search?startWords=${searchQuery}`, )
      const {statusCode , data ,message} = response
      // console.log(response)
      if(statusCode) {
        return data
      } else {
        return {
          error: { type: "server", message:"server error"  },
        } 
      }
    } catch (error) {
      console.error('Error fetching product items:', error);
      throw error; // Re-throw the error to propagate it to the Redux store
    }
  }
)




const productSlice = createSlice({
    name:"product",
    initialState:initialState,
    reducers:{

    },
    extraReducers(builder)  {
        builder

        // get all product
        .addCase(getAllProduct.pending , (state,action) => {
            state.productList.pending=true
        })

        .addCase(getAllProduct.fulfilled , (state,action) => {
            state.productList.pending = false;
            // console.log("action.payload",action.payload.products)
            if (action.payload.products) {
                state.productList.data = action.payload.products;
              } else {
                state.productList.error = action.payload.error;
              }
        } )

        .addCase(getAllProduct.rejected, (state, action) => {
            state.productList.pending = false;
            if (action?.payload?.error) {
              state.productList.error = action?.payload?.error;
            } else {
              state.productList.error = {
                type: "server",
                message: "Internal server Error",
              }
            }
          })

          // get all category
          .addCase(getAllCategory.pending , (state,action) => {
            state.categoryList.pending=true
        })

        .addCase(getAllCategory.fulfilled , (state,action) => {
            state.categoryList.pending = false;
            // console.log("action.payload",action.payload.category)
            if (action.payload.category) {
                state.categoryList.data = action.payload.category;
              } else {
                state.categoryList.error = action.payload.error;
              }
        } )

        .addCase(getAllCategory.rejected, (state, action) => {
            state.categoryList.pending = false;
            if (action?.payload?.error) {
              state.categoryList.error = action?.payload?.error;
            } else {
              state.categoryList.error = {
                type: "server",
                message: "Internal server Error",
              }
            }
          })

             // get all    get All wishlist Product
             .addCase( getAllWishlistProduct.pending , (state,action) => {
              state.wishlistProductList.pending=true
          })
  
          .addCase(getAllWishlistProduct.fulfilled , (state,action) => {
              state.wishlistProductList.pending = false;
              console.log("action.payload",action.payload)
              if (action.payload) {
                  state.wishlistProductList.data = action.payload;
                  // console.log(state.wishlistProductList.data)
                } else {
                  state.wishlistProductList.error = action.payload.error;
                }
          } )
  
          .addCase(getAllWishlistProduct.rejected, (state, action) => {
              state.wishlistProductList.pending = false;
              if (action?.payload?.error) {
                state.wishlistProductList.error = action?.payload?.error;
              } else {
                state.wishlistProductList.error = {
                  type: "server",
                  message: "Internal server Error",
                }
              }
            })

             // get  Product by categoryy
  

            .addCase( getProductByCategory.pending , (state,action) => {
              state.productByCategoryList.pending=true
          })
  
          .addCase(getProductByCategory.fulfilled , (state,action) => {
              state.productByCategoryList.pending = false;
              console.log("action.payload",action.payload)
              if (action.payload) {
                  state.productByCategoryList.data = action.payload;
                  console.log(state.productByCategoryList.data)
                } else {
                  state.productByCategoryList.error = action.payload.error;
                }
          } )
  
          .addCase(getProductByCategory.rejected, (state, action) => {
              state.productByCategoryList.pending = false;
              if (action?.payload?.error) {
                state.productByCategoryList.error = action?.payload?.error;
              } else {
                state.productByCategoryList.error = {
                  type: "server",
                  message: "Internal server Error",
                }
              }
            })

            // product by id 


            .addCase( getProductByCId.pending , (state,action) => {
              state.productById.pending=true
          })
  
          .addCase(getProductByCId.fulfilled , (state,action) => {
              state.productById.pending = false;
              // console.log("action.payload",action.payload)
              if (action.payload) {
                  state.productById.data = action.payload;
                  // console.log(state.productById.data)
                } else {
                  state.productById.error = action.payload.error;
                }
          } )
  
          .addCase(getProductByCId.rejected, (state, action) => {
              state.productById.pending = false;
              if (action?.payload?.error) {
                state.productById.error = action?.payload?.error;
              } else {
                state.productById.error = {
                  type: "server",
                  message: "Internal server Error",
                }
              }
            })

              // product by search 


              .addCase( getProductBySearch.pending , (state,action) => {
                state.searchList.pending=true
            })
    
            .addCase(getProductBySearch.fulfilled , (state,action) => {
                state.searchList.pending = false;
                // console.log("action.payload",action.payload)
                if (action.payload) {
                    state.searchList.data = action.payload;
                    // console.log(state.productById.data)
                  } else {
                    state.searchList.error = action.payload.error;
                  }
            } )
    
            .addCase(getProductBySearch.rejected, (state, action) => {
                state.searchList.pending = false;
                if (action?.payload?.error) {
                  state.searchList.error = action?.payload?.error;
                } else {
                  state.searchList.error = {
                    type: "server",
                    message: "Internal server Error",
                  }
                }
              })

       
    }
})




export default productSlice.reducer