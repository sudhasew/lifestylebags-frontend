import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope, FaEye, FaEyeSlash, FaKey } from "react-icons/fa";
import "./Signup.css";
import { BagsContext } from "../context/BagsContext";
import { signUp } from "../services/LifeStyleBags";

export function SignUp() {
  const { addCustomer, loginCustomer } = useContext(BagsContext);
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

    console.log("email length", email.length);
    if (email.length === 0 && password.length === 0) {
      signUpError();
      console.log("email length", email.length);
      return;
    } else if (password.length < 8 && confirmPassword.length < 8) {
      passwordLengthError();
    } else if (password !== confirmPassword) {
      passwordNoMatchError();
    } else {
      loginCustomer();
      let formData = new FormData(e.currentTarget);
      let first_name: string = formData.get("first_name") as string;
      let last_name: string = formData.get("last_name") as string;
      let email: string = formData.get("email") as string;
      let password: string = formData.get("password") as string;
      signUp(first_name, last_name, email, password).then((newuser) =>
        addCustomer(newuser)
      );
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");

      navigate("/login");
    }
  }

  return (
    <div className="signupContainer">
      <h1 className="signupHeader"> Sign-Up </h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>First Name</p>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
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
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          <p>Email</p>
          <FaEnvelope className="conmfirm_fauser"></FaEnvelope>
          <input
            type="text"
            name="email"
            id="confirm_email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <FaKey className="confirm_falock"></FaKey>
          <input
            type={passwordShown ? "text" : "password"}
            name="password"
            id="confirm_password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <i className="confirm_faEye" onClick={togglePasswordVisiblity}>
          {passwordShown ? <FaEye /> : <FaEyeSlash />}
        </i>
        <label>
          <p className="confirm">Confirm Password</p>
          <FaKey className="confirm_falock"></FaKey>
          <input
            className="confirmPass"
            type={passwordConfirmShown ? "text" : "password"}
            placeholder="Password"
            value={confirmPassword}
            onChange={(e: any) => setConfirmPassword(e.target.value)}
          />
        </label>
        <i className="faEyeConfirm" onClick={toggleConfirmPasswordVisiblity}>
          {passwordConfirmShown ? <FaEye /> : <FaEyeSlash />}
        </i>
        <div className="signup_details">
          <label className="signup_alreadyAcc">Already have an account?</label>
          <Link className="login_link" to="/login">
            Log In
          </Link>
        </div>
        <div>
          <button className="signUpBtn" type="submit">
            Sign Up
          </button>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
}
