import React, { useEffect , useState} from 'react'
import './css/Chat.css'
import { Avatar , IconButton } from '@mui/material';
import {useParams} from 'react-router'
import db from './firebase'
// import firebase from './firebase';
import 'firebase/compat/firestore';
import { serverTimestamp } from '@firebase/firestore'
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MicIcon from '@mui/icons-material/Mic';
import { useStateValue } from './StateProvider';

const Chat = () => {

  const { roomId } = useParams();
  const [roomName, setRoomName]=useState("");
  const [input,setInput]=useState('')
  const [messages,setMessages]=useState([]);
   
  const[{user},dispatch] = useStateValue()
  useEffect(()=>{
    if(roomId){
      db.collection('rooms').doc(roomId).onSnapshot(snapshot=>{
        setRoomName(snapshot.data().name);
      })
      db.collection("rooms").doc(roomId).collection('message').orderBy("timestamp", "asc").onSnapshot(snapshot=>{
      setMessages(snapshot.docs.map(doc=>doc.data())) 
      })
    }

  },[roomId])

  const sendMessage=(e)=>{
    e.preventDefault();
    if(input ==="")
    {
      return alert('Please enter Your message')
    }
    db.collection("rooms").doc(roomId).collection("message").add({
      name:user.displayName,
      message: input,
      timestamp:serverTimestamp()
    })
    setInput('');
  }
  return (
    <div className='chat'>
    <div className="chat__header">
       <Avatar/>
         <div className="chat__headerInfo">
           <h3>{roomName}</h3>
           <p>
              {
              // new Date(messages[messages.length-1]?.timestamp?.seconds*1000)
                new Date(messages[messages.length-1]?.timestamp?.seconds*1000).toUTCString()
              }
           </p>
         </div>
        <div className="header__right">
              <IconButton>
                <SearchIcon/>
              </IconButton>

               <IconButton>
                <AttachFileIcon/>
              </IconButton>

               <IconButton>
                <MoreVertIcon/>
              </IconButton>
        </div>
    </div>


    <div className="chat__body">
      {
        messages.map(message=>(
                  <p className={`chat__message ${user.displayName==message.name && "chat__receiver" }`}>
            <span className="chat__name"> {message.name}</span>
              &nbsp;{message.message}
          <span className="chat__time">
            {
              new Date(message.timestamp ?.seconds*1000).toLocaleTimeString()
            }
          </span>
         </p>

        ))
      }
      
    </div>

    <div className="chat__footer">
              <EmojiEmotionsIcon/>
              <AttachFileIcon/>
           
              <form onSubmit={sendMessage}>
                <input type='text' value={input} placeholder='Type your message here' onChange={e=>setInput(e.target.value)}/>
                <input type='submit' />
              </form>
                <MicIcon/>
    </div>
    </div>
  )
}

export default Chat