import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query
} from "firebase/firestore";

function SidebarChat({ addNewChat, id, name }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (id) {
      const msgRef = collection(db, "rooms", id, "messages");
      const q = query(msgRef, orderBy("timestamp", "desc"));
      onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
    }
  }, [id]);

  console.log(messages);

  useEffect(() => {
    const rand = "seed" + Math.floor(Math.random() * 5000);
    setSeed(rand);
  }, []);

  const createChat = async () => {
    const roomName = prompt("Please enter name for chat");
    if (roomName) {
      // Condition coming soon...
      await addDoc(collection(db, "rooms"), {
        name: roomName
      });
    }
  };

  return !addNewChat ? (
    <Link to={`rooms/${id}`}>
      <div className="sidebarChat">
        <img
          className="sidebarChat_avatar"
          src={`https://api.multiavatar.com/${seed}.svg`}
          alt="avatar"
        />
        <div className="sidebarChat__info">
          <h3>{name}</h3>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h3>Add New Chat</h3>
    </div>
  );
}

export default SidebarChat;

// https://api.multiavatar.com/${seed}.svg
// https://avatars.dicebear.com/api/human/${seed}.svg
