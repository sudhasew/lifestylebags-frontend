import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import "./Signup.css";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordConfirmShown, setPasswordConfirmShown] = useState(false);

  const navigate = useNavigate();
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const toggleConfirmPasswordVisiblity = () => {
    setPasswordConfirmShown(passwordConfirmShown ? false : true);
  };

  const signUpError = () =>
    toast.error("Invalid email or password", {
      position: "top-right",
      autoClose: 900,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  const passwordLengthError = () =>
    toast.error("Password must be at least 8 characters", {
      position: "top-right",
      autoClose: 900,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  const passwordNoMatchError = () =>
    toast.error("Passwords do not match", {
      position: "top-right",
      autoClose: 900,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  function handleSubmit(e: any) {
    e.preventDefault();

    if (email.length === 0 && password.length === 0) {
      signUpError();
      return;
    } else if (password.length < 8 && confirmPassword.length < 8) {
      passwordLengthError();
    } else if (password !== confirmPassword) {
      passwordNoMatchError();
    }
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");

    navigate("/login");
  }

  return (
    <div className="signupContainer">
      <h1 className="signupHeader"> SignUp </h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>First Name</p>
          <input
            type="text"
            name="first_name"
            id="f_name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          <p>Last Name</p>
          <input
            type="text"
            name="last_name"
            id="l_name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          <p>Email</p>
          <FaUser className="conmfirm_fauser"></FaUser>
          <input
            type="text"
            name="email"
            id="confirm_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <FaLock className="confirm_falock"></FaLock>
          <input
            type={passwordShown ? "text" : "password"}
            name="password"
            id="confirm_password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <i className="confirm_faEye" onClick={togglePasswordVisiblity}>
          {passwordShown ? <FaEye /> : <FaEyeSlash />}
        </i>
        <label>
          <p className="confirm">Confirm Password</p>
          <FaLock className="confirm_falock"></FaLock>
          <input
            className="confirmPass"
            type={passwordConfirmShown ? "text" : "password"}
            value={confirmPassword}
            onChange={(e: any) => setConfirmPassword(e.target.value)}
          />
        </label>
        <i className="faEyeConfirm" onClick={toggleConfirmPasswordVisiblity}>
          {passwordConfirmShown ? <FaEye /> : <FaEyeSlash />}
        </i>
        <div>
          <label className="alreadyAcc">Already have an account?</label>
          <Link className="link" to="/login">
            Log In
          </Link>
        </div>
        <div>
          <button className="submit" type="submit">
            SignUp
          </button>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
}
