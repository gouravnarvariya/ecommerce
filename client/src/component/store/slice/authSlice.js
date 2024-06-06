import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../Api/Api";
import { clearToken, setAccessToken, setRefreshToken, setUserId } from "../../Tokenhandler/TokenHandler";
// import {  setAccessToken } from "../../Tokenhandler/TokenHandler";

const initialState = {
  UserAuthLogin : {pending:false , data:null , error:null},
  

}

export const handleLogin = createAsyncThunk (
  "/api/user/login",  // Descriptive name for the async thunk
    async(body)=>{
      try {  const response = await Api.post("/user/login",body)
        const { data, statusCode, message } = response
        // console.log("response in thunk" , response.data.user.id)
        console.log("status" , response)
        if (statusCode) {
            return { data }
          } else {
            return {
              error: { type: "server", message, },
            }
          }
        } catch (error) {
          console.log(error)
          if (error.response) {
            // Server responded with an error status code
            const { status, data } = error.response;
            return { error: { type: "server", message: data.message } };
          } else if (error.request) {
            // The request was made but no response was received
            return { error: { type: "network", message: "Network Error" } };
          } else {
            // Something happened in setting up the request that triggered an error
            return { error: { type: "unknown", message: error.message } };
          }
    }
  }
)

export const handleLogout = createAsyncThunk(
  '/user/logout',
  async() => {
    try {
      const response = Api.post('/user/logout' ,{id:localStorage.getItem("_id")} ) 
      const {status} = response
      if(status) {

        clearToken()
      }  else {
        return {
          error: { type: "server",  },
        }
      }
    } catch (error) {
      if (error.response) {
        // Server responded with an error status code
        const {  data } = error.response;
        return { error: { type: "server", message: data.message } };
      } else if (error.request) {
        // The request was made but no response was received
        return { error: { type: "network", message: "Network Error" } };
      } else {
        // Something happened in setting up the request that triggered an error
        return { error: { type: "unknown", message: error.message } };
      }
}

  }

)

const Authentication = createSlice({
    name : "Authentication",
    initialState : initialState,
    reducers : {
     logout: (state) => {
      state.UserAuthLogin = { pending: false, data: null, error: null }
      
    }
    },
    extraReducers(builder) {
        builder
          // Login 
      .addCase(handleLogin.pending, (state, action) => {
        state.UserAuthLogin.pending = true;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        // console.log("slice action payload" ,action.payload)
        console.log("slice" , action.payload)
        state.UserAuthLogin.pending = false;
        if (action.payload.data) {
          state.UserAuthLogin.data = action.payload.data.user
        } else {
          state.UserAuthLogin.error = action.payload.error;
        }
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.UserAuthLogin.pending = false;
        if (action?.payload?.error) {
          state.UserAuthLogin.error = action?.payload?.error;
        } else {
          state.UserAuthLogin.error = {
            type: "server",
            message: "Internal server Error",
          }
        }
      })
      }
})


export const {logout} = Authentication.actions
export default Authentication.reducer