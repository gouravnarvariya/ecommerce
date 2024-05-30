import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../Api/Api";
import { toast } from "react-toastify";

const initialState = {
    UserData : {pending:false , data:null , error:null},
    PostData : {pending:false , data:null , error:null},
    ChangePasswordData : {pending:false , data:null, error:null}
}

export const getUserData = createAsyncThunk (
  "user/data",  // Descriptive name for the async thunk
    async()=>{
      try {  const response = await Api.post("user/getuser",{id:localStorage.getItem('_id')})
      // console.log("response",response)
        const { data, statusCode , message } = response
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

export const updateuserData = createAsyncThunk(
  '/user/updateaccount',
  async(body) =>{
    console.log(body)
    console.log("api aayi ")
    try {const response = await Api.put("/user/update-account" , body)
    const{statusCode, message} = response
    if(statusCode ) {
      toast.success(message)
      return response
    }
  } catch(error) {
    console.log(error)
  }
}
)

export const changePassword = createAsyncThunk(
  "/user/changepassword",
  async (body) =>{
    try{
      const response = await Api.post('/user/change-password' , body)
      const { data, statusCode , message } = response
      if (statusCode) {
        toast.success(message);
          return { message }
        } else {
          return {
            error: { type: "server", message, },
          }
        }
    }catch(error) {
      return error
    }
  }
)

export const signupUser = createAsyncThunk(
  'sign-up-user', 
  async(body) => {
    try {
      const res = await Api.post('/user/register' , body)
      const {statusCode, message} = res 
      if(statusCode ) {
        toast.success(message)
        return res
      }
      console.log(res)
    } catch(error) {
      toast.error(error.response.data.error)
      // console.log(error.response.data.error)
    }
   
  }
)






const User = createSlice({
    name : "User",
    initialState : initialState,
    reducers : {
      clearUserData: (state) => {
        state.UserData = { pending: false, data: null, error: null }
      },
    },
    extraReducers(builder) {
        builder
          // Login 
      .addCase(getUserData.pending, (state, action) => {
        state.UserData.pending = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        // console.log("slice action payload" ,action.payload)
        // console.log("slice" , action.payload)
        state.UserData.pending = false;
        if (action.payload.data) {
          state.UserData.data = action.payload.data;
        } else {
          state.UserData.error = action.payload.error;
        }
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.UserData.pending = false;
        if (action?.payload?.error) {
          state.UserData.error = action?.payload?.error;
        } else {
          state.UserData.error = {
            type: "server",
            message: "Internal server Error",
          }
        }
      })
       // Handle updateuserData
       .addCase(updateuserData.pending, (state) => {
        state.PostData.pending = true;
        state.PostData.error = null; // Clear previous errors
    })
    .addCase(updateuserData.fulfilled, (state, action) => {
        state.PostData.pending = false;
        console.log(action.payload&& action.payload.data)
        if (action.payload&& action.payload.data) {
            state.PostData.data = action.payload.data;
        } else {
            state.PostData.error = action.payload.error;
        }
    })
    .addCase(updateuserData.rejected, (state, action) => {
        state.PostData.pending = false;
        state.PostData.error = action.payload || {
            type: "server",
            message: "Internal server Error",
        };
    })
           // Handle change password
           .addCase(changePassword.pending, (state) => {
            state.ChangePasswordData.pending = true;
            state.ChangePasswordData.error = null; // Clear previous errors
        })
        .addCase(changePassword.fulfilled, (state, action) => {
            state.ChangePasswordData.pending = false;
            console.log(action.payload)
            if (action.payload.message) {
                state.ChangePasswordData.data = action.payload.message;
            } else {
                state.ChangePasswordData.error = action.payload.error;
            }
        })
        .addCase(changePassword.rejected, (state, action) => {
            state.ChangePasswordData.pending = false;
            state.ChangePasswordData.error = action.payload || {
                type: "server",
                message: "Internal server Error",
            };
        });
      }
})


export const {clearUserData} = User.actions
export default User.reducer