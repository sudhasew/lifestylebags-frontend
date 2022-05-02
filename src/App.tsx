import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./App.css";
import { BagsContext } from "./context/BagsContext";

function App() {
  let navigate = useNavigate();

  const { logoutCustomer, loggedCustomers } = useContext(BagsContext);

  const sleep = (milliseconds: any) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  async function timeSensitiveAction() {
    await sleep(3500);
    navigate("/login");
  }

  useEffect(() => {
    if (loggedCustomers === false) {
      navigate("/login");
    }
  }, []);

  const logoutSuccess = () => {
    toast.success("You are successfully logged out", {
      position: "top-right",
      autoClose: 2200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  function handleLogout() {
    const saved = localStorage.getItem("customerLogin");
    if (saved === "true") {
      logoutCustomer();
      localStorage.removeItem("customerLogin");
    }
    timeSensitiveAction();
    logoutSuccess();
  }

  return (
    <div className="appContainer">
      <div>
        <Link to="/">
          <img className="welcome" src="myLogo.jpeg" alt="my logo"></img>
        </Link>
      </div>
      <div className="appLinks">
        <Link className="loginApp_link" to="/login">
          LogIn
        </Link>
        <Link className="signupApp_link" to="/signup">
          SignUp
        </Link>
        <a className="signoutApp_link" onClick={handleLogout}>
          SignOut
        </a>
      </div>
    </div>
  );
}

export default App;
