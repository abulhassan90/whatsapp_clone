import React from "react";
import Button from "@mui/material/Button";
import "./Login.css";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionType } from "./reducer";

function Login() {
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
          type: actionType.SET_USER,
          user: result.user
        });
      })
      .then((error) => console.log(error));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://raw.githubusercontent.com/appicons/Whatsapp/master/icons/whatsapp_194x194.png"
          alt="whatsapp_logo"
        />
        <div className="login__text">
          <h1>SignIn with a Whatsapp</h1>
        </div>

        <Button onClick={signIn}>SignIn with Google</Button>
      </div>
    </div>
  );
}

export default Login;
