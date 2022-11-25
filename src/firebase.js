import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBn91NgWW0VfVdEAa8Gr8j7n-jV_Evcn9Y",
  authDomain: "whatsapp-clone-937c1.firebaseapp.com",
  projectId: "whatsapp-clone-937c1",
  storageBucket: "whatsapp-clone-937c1.appspot.com",
  messagingSenderId: "249430213402",
  appId: "1:249430213402:web:ebc54f3887414ae862a2a3"
};

// this is special line of code connected everything 

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();

const auth = firebaseApp.auth();


// i use google for login whatsapp 
const provider = new firebase.auth.GoogleAuthProvider();

export{auth, provider}

export default db;