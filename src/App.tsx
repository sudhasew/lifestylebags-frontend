import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./App.css";

function App() {
  let navigate = useNavigate();

  const sleep = (milliseconds: any) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  async function timeSensitiveAction() {
    await sleep(3500);
    navigate("/login");
  }

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
    timeSensitiveAction();
    logoutSuccess();
  }

  return (
    <div className="appContainer">
      <div>
        <h1 className="welcome">Welcome to my website!</h1>
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
