import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../Api/Api";
import { toast } from "react-toastify";

const initialState = {
  productList: { pending: false, data: null, error: null },
  categoryList: { pending: false, data: null, error: null },
  wishlistProductList: { pending: false, data: null, error: null },
  productByCategoryList: { pending: false, data: null, error: null },
  productById: { pending: false, data: null, error: null },
  searchList: { pending: false, data: null, error: null },
};

// Utility function to handle errors
const handleErrors = (error) => {
  if (error.response) {
    const { data } = error.response;
    return { error: { type: "server", message: data.message } };
  } else if (error.request) {
    return { error: { type: "network", message: "Network Error" } };
  } else {
    return { error: { type: "unknown", message: error.message } };
  }
};

export const getAllProduct = createAsyncThunk(
  "/product/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Api.get("/product/product-all");
      const { statusCode, data } = response;
      if (statusCode) {
        return data;
      } else {
        return rejectWithValue({ type: "server", message: "Server error" });
      }
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const getAllCategory = createAsyncThunk(
  "/category/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Api.get("/product/category-all");
      const { statusCode, data } = response;
      if (statusCode) {
        return data;
      } else {
        return rejectWithValue({ type: "server", message: "Server error" });
      }
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "/add-to-wishlist",
  async (body, { rejectWithValue }) => {
    try {
      const response = await Api.post("/product/add-to-wishlist", body);
      const { statusCode, data } = response;
      if (statusCode) {
        toast.success(data.message);
        return data;
      } else {
        return rejectWithValue({ type: "server", message: "Server error" });
      }
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const getAllWishlistProduct = createAsyncThunk(
  "wishlist/get/all/product",
  async (_, { rejectWithValue }) => {
    try {
      const userId = localStorage.getItem("_id");
      if (!userId) {
        throw new Error("User ID not found in localStorage");
      }
      const response = await Api.get(`/product/get-product-from-wishlist?id=${userId}`);
      const { statusCode, data } = response;
      if (statusCode) {
        return data;
      } else {
        return rejectWithValue({ type: "server", message: "Server error" });
      }
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const getProductByCategory = createAsyncThunk(
  "/get-product-by-category",
  async (category_id, { rejectWithValue }) => {
    try {
      const response = await Api.get(`/product/get-product-by-category?id=${category_id}`);
      const { statusCode, data } = response;
      if (statusCode) {
        return data;
      } else {
        return rejectWithValue({ type: "server", message: "Server error" });
      }
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const getProductByCId = createAsyncThunk(
  "/get-product-by-id",
  async (product_id, { rejectWithValue }) => {
    try {
      const response = await Api.get(`/product/get-product-by-id?id=${product_id}`);
      const { statusCode, data } = response;
      if (statusCode) {
        return data;
      } else {
        return rejectWithValue({ type: "server", message: "Server error" });
      }
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const getProductBySearch = createAsyncThunk(
  "/get-product-by-search",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await Api.get(`/product/get-products-by-search?startWords=${searchQuery}`);
      const { statusCode, data } = response;
      if (statusCode) {
        return data;
      } else {
        return rejectWithValue({ type: "server", message: "Server error" });
      }
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all products
      .addCase(getAllProduct.pending, (state) => {
        state.productList.pending = true;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.productList.pending = false;
        if (action.payload.products) {
          state.productList.data = action.payload.products;
        } else {
          state.productList.error = action.payload.error;
        }
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.productList.pending = false;
        state.productList.error = action.payload || { type: "server", message: "Internal server error" };
      })

      // Get all categories
      .addCase(getAllCategory.pending, (state) => {
        state.categoryList.pending = true;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.categoryList.pending = false;
        if (action.payload.category) {
          state.categoryList.data = action.payload.category;
        } else {
          state.categoryList.error = action.payload.error;
        }
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.categoryList.pending = false;
        state.categoryList.error = action.payload || { type: "server", message: "Internal server error" };
      })

      // Get all wishlist products
      .addCase(getAllWishlistProduct.pending, (state) => {
        state.wishlistProductList.pending = true;
      })
      .addCase(getAllWishlistProduct.fulfilled, (state, action) => {
        state.wishlistProductList.pending = false;
        state.wishlistProductList.data = action.payload || null;
        state.wishlistProductList.error = action.payload.error || null;
      })
      .addCase(getAllWishlistProduct.rejected, (state, action) => {
        state.wishlistProductList.pending = false;
        state.wishlistProductList.error = action.payload || { type: "server", message: "Internal server error" };
      })

      // Get products by category
      .addCase(getProductByCategory.pending, (state) => {
        state.productByCategoryList.pending = true;
      })
      .addCase(getProductByCategory.fulfilled, (state, action) => {
        state.productByCategoryList.pending = false;
        state.productByCategoryList.data = action.payload || null;
        state.productByCategoryList.error = action.payload.error || null;
      })
      .addCase(getProductByCategory.rejected, (state, action) => {
        state.productByCategoryList.pending = false;
        state.productByCategoryList.error = action.payload || { type: "server", message: "Internal server error" };
      })

      // Get product by ID
      .addCase(getProductByCId.pending, (state) => {
        state.productById.pending = true;
      })
      .addCase(getProductByCId.fulfilled, (state, action) => {
        state.productById.pending = false;
        state.productById.data = action.payload || null;
        state.productById.error = action.payload.error || null;
      })
      .addCase(getProductByCId.rejected, (state, action) => {
        state.productById.pending = false;
        state.productById.error = action.payload || { type: "server", message: "Internal server error" };
      })

      // Get products by search
      .addCase(getProductBySearch.pending, (state) => {
        state.searchList.pending = true;
      })
      .addCase(getProductBySearch.fulfilled, (state, action) => {
        state.searchList.pending = false;
        state.searchList.data = action.payload || null;
        state.searchList.error = action.payload.error || null;
      })
      .addCase(getProductBySearch.rejected, (state, action) => {
        state.searchList.pending = false;
        state.searchList.error = action.payload || { type: "server", message: "Internal server error" };
      });
  },
});

export default productSlice.reducer;
