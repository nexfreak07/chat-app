import { auth, provider } from "../firebase/firebase-config";
import { signInWithPopup } from "firebase/auth";

// -- In order to stay signed in all the time
import Cookies from "universal-cookie";
import { Header } from "./layout/Header";

import classes from './Auth.module.css';
const cookies = new Cookies();

export const Auth = (props) => {
  const { setIsAuth } = props;

  // -- In Firebase most of the things are promises so we need to use async and await
  // -- Error in popup can be handled by chrome browser settings to enable popup and set location in firebase
  const signInWithGoogle = async () => {
    // -- As we are working with async / await. We are using try catch

    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      // -- Now we see that we have a lot of data in result we need to set the refresh token to cookies
      // so if we refresh/leave the page we are not logged out. So we have set/remove the cookie.
      cookies.set("app-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Header onClick={signInWithGoogle} isAuth={props.isAuth} />
      <div className={classes.content}>
        <h1>Welcome to Sky Chat</h1>
        <h3>Sign in with Google to Continue</h3>
      </div>
    </div>
  );
};
