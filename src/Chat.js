import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import { Search, AttachFile, MoreVert, Mood, Mic } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { db } from "./firebase";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useStateValue } from "./StateProvider";

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const getData = async () => {
      if (roomId) {
        const docRef = doc(db, "rooms", roomId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRoomName(docSnap.data().name);
        }

        const msgRef = collection(db, "rooms", roomId, "messages");
        const q = query(msgRef, orderBy("timestamp", "asc"));
        onSnapshot(q, (snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
      }
    };
    getData();
  }, [roomId]);

  useEffect(() => {
    const rand = Math.floor(Math.random() * 5000);
    setSeed(rand);
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("New Message => ", input);
    addDoc(collection(db, "rooms", roomId, "messages"), {
      message: input,
      name: user?.displayName,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <img
          className="chat__avatar"
          alt="avatar"
          src={`https://api.multiavatar.com/${seed}.svg`}
        />

        <div className="chat__info">
          <h3>{roomName}</h3>
          <p>
            Last Seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <Search />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => {
          return (
            <p
              key={message.timestamp}
              className={`chat__message ${
                message.name === user?.displayName && "chat__receiver"
              }`}
            >
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">
                {new Date(message.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          );
        })}
      </div>
      <div className="chat__footer">
        <IconButton>
          <Mood />
        </IconButton>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            Send Button
          </button>
        </form>
        <IconButton>
          <Mic />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
