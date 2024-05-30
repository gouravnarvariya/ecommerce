import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "../../store/slice/userSlice";
import { toast } from "react-toastify";

const ChangePasswordForm = () => {
  const [password , setPassword] = useState({
    id:localStorage.getItem("_id"),
    newpassword:"",
    repeatnewpassword:""
  })

  const dispatch = useDispatch()

  const handleChange = (e) =>{
    setPassword((prev) => ({...prev , [e.target.name]:e.target.value}))
  }

  const handleSubmit = () => {
    if(password.newpassword===password.repeatnewpassword) {
      const body = {newPassword:password.newpassword,
        id:password.id}
      const submit = dispatch(changePassword(body))
      console.log(submit)
    } else {
      toast.error("enter same password");
    }
    
  }
  return (
    <>
      <div className="card">
        <div className="thhdng-chng">
          <h3>Change Password</h3>
        </div>
        <div className="cahnge-password">
        <div className="pwdinput-wthicon">
          <div className="form-inputs">
            <input
              type="password"
              name="newpassword"
              className="form-control"
              placeholder="Enter new password"
              onChange={(e)=>{handleChange(e)}}
            />
          </div>
          <div className="pwdeye-icon">
            <span className="hide-eye"><i className="fa fa-eye" aria-hidden="true"></i></span>
            <span className="show-eye"><i className="fa fa-eye-slash" aria-hidden="true"></i></span>
          </div>
          </div>
         <div className="pwdinput-wthicon">
         <div className="form-inputs">
            <input
              type="password"
              name="repeatnewpassword"
              className="form-control"
              placeholder="Re-enter new password"
              onChange={(e)=>{handleChange(e)}}

            />
          </div>
          <div className="pwdeye-icon">
            <span className="hide-eye"><i className="fa fa-eye" aria-hidden="true"></i></span>
            <span className="show-eye"><i className="fa fa-eye-slash" aria-hidden="true"></i></span>
          </div>
         </div>
          <div className="chngepwd-btn">
            <button className="btn primary-btn"
            onClick={handleSubmit}
            >Change</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordForm;
