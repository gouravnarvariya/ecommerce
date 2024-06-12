import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "../../store/slice/userSlice";
import { toast } from "react-toastify";

const ChangePasswordForm = () => {
  const [passwordVisible, setPasswordVisible] = useState({
    newPassword: false,
    repeatNewPassword: false,
  });
  const [password, setPassword] = useState({
    id: localStorage.getItem("_id"),
    newPassword: "",
    repeatNewPassword: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setPassword((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (password.newPassword === password.repeatNewPassword && (password.newPassword !== '' || password.repeatNewPassword !== '')) {
      const body = { newPassword: password.newPassword, id: password.id };
      dispatch(changePassword(body));
      setPassword({
        id: localStorage.getItem("_id"),
        newPassword: "",
        repeatNewPassword: "",
      });
    } else {
      toast.error("Enter the same password");
    }
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisible((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  console.log(passwordVisible)

  return (
    <div className="card">
      <div className="thhdng-chng">
        <h3>Change Password</h3>
      </div>
      <div className="cahnge-password">
        <div className="pwdinput-wthicon">
          <div className="form-inputs">
            <input
              type={passwordVisible.newPassword ? "text" : "password"}
              name="newPassword"
              className="form-control"
              placeholder="Enter new password"
              onChange={handleChange}
              value={password.newPassword}
            />
          </div>
          <div onClick={() => togglePasswordVisibility("newPassword")} className="pwdeye-icon">
            {passwordVisible.newPassword ? (
              <span className="show-eye"><i className="fa fa-eye-slash" aria-hidden="true"></i></span>
            ) : (
              <span className="hide-eye"><i className="fa fa-eye" aria-hidden="true"></i></span>
            )}
          </div>
        </div>
        <div className="pwdinput-wthicon">
          <div className="form-inputs">
            <input
              type={passwordVisible.repeatNewPassword ? "text" : "password"}
              name="repeatNewPassword"
              className="form-control"
              placeholder="Re-enter new password"
              onChange={handleChange}
              value={password.repeatNewPassword}
            />
          </div>
          <div onClick={() => togglePasswordVisibility("repeatNewPassword")} className="pwdeye-icon">
            {passwordVisible.repeatNewPassword ? (
              <span className="show-eye"><i className="fa fa-eye-slash" aria-hidden="true"></i></span>
            ) : (
              <span className="hide-eye"><i className="fa fa-eye" aria-hidden="true"></i></span>
            )}
          </div>
        </div>
        <div className="chngepwd-btn">
          <button className="btn primary-btn" onClick={handleSubmit}>
            Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
