import logo from "./logo.svg";
import "./App.css";
import { Auth } from "./components/Auth";
import { useState } from "react";
import { useRef } from "react";

// -- To grab cookies and pass to use state to check should we keep logged in or not
import Cookies from "universal-cookie";
import { Chat } from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/firebase-config";
import { UserButton } from "./components/layout/UserButton";
import { Input } from "./components/layout/Input";
import { Header } from "./components/layout/Header";
const cookies = new Cookies();

function App() {
  // -- We need to handle states in order keep us signed in based on cookies else ask to sign in
  // -- Render the Chat Component on entering the room

  const [isAuth, setIsAuth] = useState(cookies.get("app-token"));

  // -- Below useState is used to enter the room of the chat

  const [room, setIsRoom] = useState(null);

  const inputRef = useRef();

  // -- useRef explained in line _________________________ 57

  const enterRoom = (e) => {
    setIsRoom(inputRef.current.value);
  };


  // -- Sign Out Functionality of the app
  const signUserOut = async () => {
    // -- Firebase Signout Functionality
    await signOut(auth);
    // -- Removing cookies and setting all states that are set after sign in as default VIMP
    cookies.remove("app-token");
    setIsAuth(false);
    setIsRoom(null)
  };

  return (
    <>
      {!isAuth ? (
        // -- So on Authentication, The component is not rendered automatically although the token is set, you need to refresh.
        // -- Hence we are passing the setIsAuth Function to set it right after the sign in.
        <Auth setIsAuth={setIsAuth} isAuth={isAuth} />
      ) : (
        <div>
          {room ? (
            <Chat room={room} isAuth={isAuth} onClick={signUserOut}/>
          ) : (
            <div>
              {
                /* -- <input onChange={(e) => {  setIsRoom(e.target.value)}}></input> */
                // --  if we use it like this above the first character in the input will the value of isRoom and <Enter the chat> will be rendered
                // --  So we need to use useRef to pass the reference and only on click we will update the value of isRoom.
              }
              <Header isAuth={isAuth}  onClick={signUserOut}/>
              <h1>Enter the Chat Room</h1>
              <Input ref={inputRef} label="Room Name" id={Math.random()}></Input>
              <UserButton enterRoom={enterRoom}>Chat</UserButton>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
