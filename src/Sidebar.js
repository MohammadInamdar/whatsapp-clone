import {Avatar, IconButton} from '@mui/material'
import React, { useState ,useEffect } from 'react'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MessageIcon from '@mui/icons-material/Message';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import './css/sidebar.css'
import SidebarChats from './SidebarChats';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// import 'firebase/compat/firestore';


// import { Room } from '@mui/icons-material';
const Sidebar = () => {
  const [rooms , setRooms] = useState([])
// const firebase = require('firebase')
  const [{user},dispatch] = useStateValue()
  useEffect(()=>{
    db.collection('rooms').onSnapshot(snapshot =>{
      setRooms(snapshot.docs.map(doc =>({
        id: doc.id,
        data:doc.data()
      })))
    })
  },[])
  
  return (
    <div className='sidebar'>
  <div className="sidebar__header">
    
    <Avatar src={user.photoURL} onClick={e=>firebase.auth().signOut()} />

   <div className="header__right">
    <IconButton>
    <DonutLargeIcon/>
    </IconButton>

    <IconButton>
    <MessageIcon/>
    </IconButton>

    <IconButton>
    <MoreVertIcon/>
    </IconButton>

   </div>
  </div>

  <div className="sidebar__search">
    <div className="sidebar__searchConatainer">
        <SearchIcon/>

  <input type="text" placeholder="Search or start a new Chat"/>

    </div>
  </div>
  <div className="sidebar__Chats">
    <SidebarChats addnewchat/>
    {
      rooms.map(room=>{
        return <SidebarChats key={room.id} id={room.id} name={room.data.name}/>
      })
    }
    
  </div>
    </div>
  )
}

export default Sidebar