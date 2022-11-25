// import react from 'react';
import './App.css';
import Sidebar from './Sidebar.js'
import Chat from './Chat.js'
import Login from './Login.js'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { useStateValue } from './StateProvider';
import { useEffect } from 'react';
import { auth } from './firebase';
function App() {
  const [{user},dispatch ]= useStateValue();
useEffect(() => {
  auth.onAuthStateChanged(user=>{
    dispatch({
      type:"SET_USER",
      user:user
    })
  })
}, [])

  return (
    <BrowserRouter>
    {
      !user ? (<Login />) : (
               <div className="App">
      <div className="app__body">
        
          <Sidebar/> 
        <Routes>

          <Route exact path="/" element={<Chat/>} />
             <Route path="/room/:roomId" element={<Chat/>} /> 
        
         
         </Routes>
      </div>
  
    </div>
      )
    }
    
   
</BrowserRouter>
  );
}

export default App;
