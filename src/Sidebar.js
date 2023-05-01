import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import "./SidebarChat.css";
import Avatar from "@mui/material/Avatar";
import { Search, DonutLarge, Chat, MoreVert } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { useStateValue } from "./StateProvider";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const getFirebaseDB = async () => {
      const querySnapshot = await getDocs(collection(db, "rooms"));
      setRooms(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data()
        }))
      );
    };

    getFirebaseDB();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />

        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <Search />
          <input placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
