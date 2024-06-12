import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../Api/Api";
import { clearToken } from "../../Tokenhandler/TokenHandler";
import { toast } from "react-toastify";

const initialState = {
  UserAuthLogin: { pending: false, data: null, error: null },
  isLogged: false
};

export const handleLogin = createAsyncThunk(
  "/api/user/login",
  async (body) => {
    try {
      const response = await Api.post("/user/login", body);
      const { data, statusCode, message } = response;
      if (statusCode) {
        return { data };
      } else {
        return { error: { type: "server", message } };
      }
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        if (data.message) {
          toast.error(data.message);
          return { error: { type: "server", message: data.message } };
        }
      } else if (error.request) {
        return { error: { type: "network", message: "Network Error" } };
      } else {
        return { error: { type: "unknown", message: error.message } };
      }
    }
  }
);

export const handleLogout = createAsyncThunk(
  "/user/logout",
  async () => {
    try {
      const response = await Api.post('/user/logout', { id: localStorage.getItem("_id") });
      const { status } = response;
      if (status) {
        clearToken();
      } else {
        return { error: { type: "server" } };
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

const Authentication = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    UserLogout: (state) => {
      state.UserAuthLogin = { pending: false, data: null, error: null };
      state.isLogged = false;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.UserAuthLogin.pending = true;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.UserAuthLogin.pending = false;
        if (action.payload.data) {
          state.UserAuthLogin.data = action.payload.data.user;
          state.isLogged = true;
        } else {
          state.UserAuthLogin.error = action.payload.error;
        }
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.UserAuthLogin.pending = false;
        state.UserAuthLogin.error = action.payload?.error || {
          type: "server",
          message: "Internal server Error",
        };
      })
      .addCase(handleLogout.fulfilled, (state) => {
        state.UserAuthLogin.data = null;
        state.isLogged = false;
      });
  }
});

export const { UserLogout } = Authentication.actions;
export default Authentication.reducer;
