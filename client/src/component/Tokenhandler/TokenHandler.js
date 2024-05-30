import Api from "../Api/Api";

  
export const setAccessToken = (access_token) => {
  // console.log("setToken=>" , access_token);
  localStorage.setItem(
    "access_token", access_token,);
};

export const setRefreshToken = (refresh_token) => {
  console.log("refresh_token=>" , refresh_token);
  localStorage.setItem(
    "refresh_token", refresh_token,);
};

export const setUserId = (id) => {
  console.log("user_id" , id);
  localStorage.setItem(
    "_id", id,);
};

export const checkToken = () => {
  if (localStorage.getItem("access_token")) {
    const decryptedAccessToken = localStorage.getItem("access_token")

    return {
      access_token: decryptedAccessToken,
    };
  } else {
    return {
      access_token: null,
      refresh_token: null,
    };
  }
};

export const refreshAccessToken = async () => {
  try {
    const response =await Api.post("user/refresh-token",{refreshToken:localStorage.getItem('refresh_token')})
    // console.log("response--------" , response)
    return response.data.accessToken
  } catch (error) {
    console.log("Failed to refresh", error);
    throw error;
  }
};


export const clearToken = () => {
  console.log("clear done ")
  // localStorage.clear();
  // window.location.href = "/"
};
