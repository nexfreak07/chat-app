import { useEffect, useState } from "react";
// -- Server Time Stamp is used to get the time at what instance the document is added or created
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

// - auth.currentUser.displayName is used to generate the name data
import { auth, db } from "../firebase/firebase-config";
import { Form } from "./layout/Form";
import { Texts } from "./Texts";
import { Header } from "./layout/Header";
export const Chat = (props) => {
  const { room } = props;
  const [message, setNewMessage] = useState("");

  // -- Here we are accessing the collection [messages] in the firestore
  const messageRef = collection(db, "messages");

  // -- Below function extracts the entered value, here we dont render component so normal extraction is OK rather using useRef()
  const messageHandler = (e) => {
    setNewMessage(e.target.value);
  };

  // -- Submitting the message, as we are updating the firestore we need to use async and await
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(message);

    // -- Return if no message
    if (message == "") {
      return;
    }

    // -- We need to send the message to firestore db hence we need to use addDoc() and also access the collection
    // -- In No SQL all the data is in object format
    await addDoc(messageRef, {
      text: message,
      time: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: room,
    });

    // -- Updating the message with empty values once sent
    setNewMessage("");
  };

  //-------------------------------------- Getting the data from the firebase -------------------------------------------

  // -- We use useEffect() to do it.

  // -- VIMP- REMEMBER WHENEVER YOU GET DATA FROM DB YOU PUT IT IN AN ARRAY/ ANY DATA STRUCTURE AND THEN DISPLAY
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    // -- Create a query at first
    // -- Query is created like collection where the room == (whatever the room is) , Using order by to sort the messages by time - Index Config is also needed
    const queryMessage = query(
      messageRef,
      where("room", "==", room),
      orderBy("time")
    );

    // -- onSnapshot - This is used to listen the changes in fire store so we can reproduce ---------- Unsuscribe is used to clean up useEffect always
    const unsuscribe = onSnapshot(queryMessage, (snapshot) => {
      // -- Below Looping through the snapshot and pushing the previous data and the (new data if any) ---> doc.data() IS A FUNCTION
      let message = [];
      snapshot.forEach((doc) => {
        message.push({ ...doc.data(), id: doc.id });
      });

      // -- Updating the state to display on the page
      setTexts(message);

      // Use Effect Cleanup is very imp other wise there will be performance issues
      return () => unsuscribe();
    });
  }, [messageRef]);

  return (
    <div>
      {/* <div>
        <h1>Welcome to : {room}</h1>
      </div>
      <div>
        {texts.map((message) => (
          <div key={message.id}>
            <div>
              <span>
                <h4>{message.user}</h4>
              </span>
              {message.text}
            </div>
          </div>
        ))}
      </div> */}

      <Header isAuth={props.isAuth} onClick={props.onClick}/>
        <Texts room={room} texts={texts}></Texts>
      {/* <form onSubmit={submitHandler}>
        <label>Type your message</label>
        <input
          placeholder="message"
          onChange={messageHandler}
          value={message}
        ></input>
        <button type="submit">Send Message</button>
      </form> */}

      <Form
        onSubmit={submitHandler}
        onChange={messageHandler}
        value={message}
      ></Form>
    </div>
  );
};
