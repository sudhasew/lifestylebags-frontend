import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope, FaEye, FaEyeSlash, FaKey, FaUser } from "react-icons/fa";
import { fetchCustomer, logIn } from "../services/LifeStyleBags";
import { BagsContext } from "../context/BagsContext";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  let navigate = useNavigate();
  const { loginCustomer, addFirstName, addLastName, addCustomerId } =
    useContext(BagsContext);

  const loginError = () =>
    toast.error("Invalid email or password", {
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
    if (email.length === 0 || password.length === 0) {
      loginError();
      return;
    } else {
      let formData = new FormData(e.currentTarget);

      let email: string = formData.get("email") as string;
      let password: string = formData.get("password") as string;
      logIn(email, password)
        .then((response) => fetchCustomer(response.id))
        .then((data) => {
          addFirstName(data.first_name);
          addLastName(data.last_name);
          addCustomerId(data.id);
        })
        .catch((error) => console.log(error));

      // checked for logged users
      logIn(email, password)
        .then((response) => {
          if (response.email !== email) {
            return;
          }
          loginCustomer();
          navigate("/signup");
        })
        .catch((error) => {
          loginError();
          console.log(error);
        });
    }
  }

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <div className="loginContainer">
      <FaUser className="faUserIcon"></FaUser>
      <h1 className="loginHeader"> Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <FaEnvelope className="fauser"></FaEnvelope>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <FaKey className="falock"></FaKey>
          <input
            type={passwordShown ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <i className="faEye" onClick={togglePasswordVisiblity}>
          {passwordShown ? <FaEye /> : <FaEyeSlash />}
        </i>

        <div className="accDetails">
          <label className="dontHaveAcc">Don't have an account?</label>
          <Link className="link" to="/signup">
            Sign Up
          </Link>
        </div>

        <div>
          <button className="signUpBtn" type="submit">
            Log In
          </button>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
}
