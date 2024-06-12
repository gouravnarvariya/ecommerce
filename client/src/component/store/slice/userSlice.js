import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../Api/Api";
import { toast } from "react-toastify";

const initialState = {
    UserData: { pending: false, data: null, error: null },
};

export const getUserData = createAsyncThunk(
  "user/data",
  async () => {
    try {
      const response = await Api.post("user/getuser", { id: localStorage.getItem('_id') });
      const { data, statusCode, message } = response;
      if (statusCode) {
        return { data };
      } else {
        return {
          error: { type: "server", message },
        };
      }
    } catch (error) {
      console.error(error);
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

export const updateuserData = createAsyncThunk(
  '/user/updateaccount',
  async (body) => {
    try {
      const response = await Api.put("/user/update-account", body);
      const { statusCode, message } = response;
      if (statusCode) {
        toast.success(message);
        return response;
      } else {
        return {
          error: { type: "server", message },
        };
      }
    } catch (error) {
      console.error(error);
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

export const changePassword = createAsyncThunk(
  "/user/changepassword",
  async (body) => {
    try {
      const response = await Api.post('/user/change-password', body);
      const { statusCode, message } = response;
      if (statusCode) {
        toast.success(message);
        return { message };
      } else {
        return {
          error: { type: "server", message },
        };
      }
    } catch (error) {
      console.error(error);
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

export const signupUser = createAsyncThunk(
  'sign-up-user',
  async (body) => {
    try {
      const response = await Api.post('/user/register', body);
      const { statusCode, message } = response;
      if (statusCode) {
        toast.success(message);
        return response;
      } else {
        return {
          error: { type: "server", message },
        };
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        toast.error(error.response.data.error);
        return { error: { type: "server", message: error.response.data.error } };
      } else if (error.request) {
        return { error: { type: "network", message: "Network Error" } };
      } else {
        return { error: { type: "unknown", message: error.message } };
      }
    }
  }
);

const User = createSlice({
  name: "User",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.UserData = { pending: false, data: null, error: null };
    },
  },
  extraReducers: (builder) => {
    builder
      // Get user data
      .addCase(getUserData.pending, (state) => {
        state.UserData.pending = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.UserData.pending = false;
        if (action.payload.data) {
          state.UserData.data = action.payload.data;
        } else {
          state.UserData.error = action.payload.error;
        }
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.UserData.pending = false;
        state.UserData.error = action.payload?.error || {
          type: "server",
          message: "Internal server Error",
        };
      })
      // Update user data
      .addCase(updateuserData.pending, (state) => {
        state.UserData.pending = true;
        state.UserData.error = null; // Clear previous errors
      })
      .addCase(updateuserData.fulfilled, (state, action) => {
        state.UserData.pending = false;
        if (action.payload?.data) {
          state.UserData.data = action.payload.data;
        } else {
          state.UserData.error = action.payload.error;
        }
      })
      .addCase(updateuserData.rejected, (state, action) => {
        state.UserData.pending = false;
        state.UserData.error = action.payload || {
          type: "server",
          message: "Internal server Error",
        };
      })
      // Change password
      .addCase(changePassword.pending, (state) => {
        state.UserData.pending = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.UserData.pending = false;
        if (action.payload?.message) {
          toast.success(action.payload.message);
        } else {
          state.UserData.error = action.payload.error;
        }
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.UserData.pending = false;
        state.UserData.error = action.payload?.error || {
          type: "server",
          message: "Internal server Error",
        };
      })
      // Sign up user
      .addCase(signupUser.pending, (state) => {
        state.UserData.pending = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.UserData.pending = false;
        if (action.payload) {
          state.UserData.data = action.payload;
        } else {
          state.UserData.error = action.payload.error;
        }
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.UserData.pending = false;
        state.UserData.error = action.payload?.error || {
          type: "server",
          message: "Internal server Error",
        };
      });
  }
});

export const { clearUserData } = User.actions;
export default User.reducer;
