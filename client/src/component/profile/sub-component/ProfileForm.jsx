import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUserData, updateuserData} from '../../store/slice/userSlice'
import { ValidateUpdateData } from '../../validate/validate'
import { toast } from 'react-toastify'
import Api from '../../Api/Api'

const ProfileForm = () => {

    const [userData , setuserData] = useState( {payload: {
      data: {
          name: '',
          email: '',
          phone_number: '',
          address: '',
          profile_image: '',
          id:localStorage.getItem("_id") // Assuming this is the structure of your data
      }
  }})
    const [selectedFile, setSelectedFile] = useState(null);
    const [showUpload , setShowUpload] = useState(false)
    const [isUpload , setIsUpload] = useState(false)
    const dispatch = useDispatch()
    const handleChnage = (e) => {
      setuserData((prevUserData) => ({
          ...prevUserData,
          payload: {
              ...prevUserData.payload,
              data: {
                  ...prevUserData.payload.data,
                  [e.target.name]: e.target.value
              }
          }
      }));
      // console.log("user data change", userData);
  };

    const handleSubmit = async() => {
        const validate = ValidateUpdateData(userData?.payload?.data)
        console.log("validate" , validate)
        if(validate) {
        const update = await dispatch(updateuserData(userData?.payload?.data))
        console.log("update------" , update)
        if(update?.payload?.status) {
          toast.success(update?.payload?.message);
          fetchUserData();
        }
        }
    }

    const fetchUserData = async () => {
      try {
        if(localStorage.getItem("access_token")) {
          const user = await dispatch(getUserData());
          console.log("user", user);
          setuserData(user);
        }
       
      } catch (error) {
          console.error('Error fetching user data:', error);
      }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleImageSubmit = async () => {
    if (!selectedFile) {
      alert('Please select a file');
      return;
    } 
  
    const formData = new FormData();
    formData.append('profileImage', selectedFile);
    formData.append('id', localStorage.getItem("_id"));
  
    // For debugging purposes (optional)
    for (let pair of formData.entries()) {
      console.log(pair[0]+ ': ' + pair[1]); 
    }
  
    try {
      const response = await Api.post('/user/upload-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const {statusCode} = response
      if(statusCode) {
        setShowUpload(false)
        toast.success("Image uploaded successfully")
        fetchUserData();
      }
      // console.log(response);
      // alert('Image uploaded successfully.');
      // Optionally, update UI to display the uploaded image
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    }
  };
  
    

    useEffect(() => {
        fetchUserData();
    }, []);
    
    

  return (
    <div className="card">
    <div className="card-header">
      <div className="card-title">
        <h3>Personal Details:</h3>
      </div>
    </div>

    <div className="card-body">
      <div className="form-main">
      <div className="prfl-card">
      <div className="prfl-picture">
      <span>
    <img src={"http://localhost:4050"+userData?.payload?.data?.profile_image} alt=""></img>   
      </span>
      <div onClick={()=>{setShowUpload(true)}}  className="edit-btn">
        <input onChange={handleFileChange} name="image" id="file" type="file" />
        <em>
          <i className="fa fa-camera" aria-hidden="true"></i>
        </em>
      </div>
     {showUpload ? <h1 onClick={()=>{handleImageSubmit()}}>upload</h1>  :""}
    </div>
                </div>
        <div className="form-flex">
          <div className="form-inner-flx-50">
            <div className="form-inputs">
              <label className="form-label">
               Name <i>*</i>
              </label>
              <input
              onChange={handleChnage}
                type="text"
                name="name"
                value={userData?.payload?.data?.name}
                placeholder={userData?.payload?.data?.name}
              />
            </div>
          </div>
          
          <div className="form-inner-flx-50">
            <div className="form-inputs">
              <label className="form-label">
                Email Address<i>*</i>
              </label>
              <input
                type="text"
                name="email"
                onChange={handleChnage}
                value={userData?.payload?.data?.email}
                placeholder={userData?.payload?.data?.email}
              />
            </div>
          </div>
          <div className="form-inner-flx-50">
            <div className="form-inputs">
              <label className="form-label">
                Mobile Number<i>*</i>
              </label>
              <input
                type="text"
                name="phone_number"
                onChange={handleChnage}
                value={userData?.payload?.data?.phone_number}
                placeholder={userData?.payload?.data?.phone_number}
              />
            </div>
          </div>

          <div className="form-inner-flx-50">
          <div className="form-inputs">
          <label>Address</label>
          <input
                type="text"
                name="address"
                onChange={handleChnage}
                value={userData?.payload?.data?.address}
                placeholder={userData?.payload?.data?.address}
              />
          
        </div>
        
          
        </div>

        <div className="form-btn flex-btn">
          <button type="button" onClick={()=>{handleSubmit()}} className="btn primary-btn">
           Save
          </button>
        </div>
      </div>
    </div>
  </div>
  </div>
  )
}

export default ProfileForm