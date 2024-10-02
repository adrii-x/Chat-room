// adding new chaft documents
// setting up a real-time listener to get new chats
//updating the username
//updating the room

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use



import { getFirestore,
	collection,
	addDoc,
	query,
	orderBy,
	limit,
	getDocs,
	getDoc,
    where,
	doc,
	setDoc,
    onSnapshot,Timestamp
 } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyBif9hzxHJCQDjzolyCgTSbr9r19BDkorc",
    authDomain: "udemy-modern-javascript-285fd.firebaseapp.com",
    projectId: "udemy-modern-javascript-285fd",
    storageBucket: "udemy-modern-javascript-285fd.appspot.com",
    messagingSenderId: "972550044474",
    appId: "1:972550044474:web:76f092ee6034e48fddae03",
    measurementId: "G-F1TQ0L3GQG"
  };

// Initialize Firebase

const app = initializeApp(firebaseConfig);
console.log(app);

const analytics = getAnalytics(app);

const db = getFirestore(app)





function timestamp() {
    let time = Timestamp.now()
    return time
    
}
  


 
class Chatroom{
    constructor(room,username){
        this.room= room,
        this.username= username,
        this.chats=collection(db, 'chat');
        console.log(this.chats);
        
        this.unsub;
    }
    async addChat(message){
        //format a chat object
        console.log('hiii')
        const now = new Date()
        const chat = {
            message,
            username:this.username,
            room:this.room,
            created_at:timestamp()

        };
        console.log(chat)
    const responce = await addDoc(collection(db, "chat"), chat)
    console.log(responce)

    return responce;
    } 
    getChats(callback){



        let qi = query(collection(db, 'chat'),orderBy("created_at"),where("room", "==", this.room ))  
        this.unsub= this.chats


        onSnapshot(qi,(snapshot)=>{
            snapshot.docChanges().forEach((change)=>{
                if (change.type==='added') {
                    console.log('hekeke');
                    
                    callback(change.doc.data())
                }
                else if (change.type==='removed') {
                    
                }
            })
        })
    

    
    }
    
    updateName(username){
        this.username= username;
        localStorage.setItem('username', username)
        console.log('name updated')
    }
    updateRoom(room){
        this.room = room;
        console.log('room updated') 
        if (this.unsub) {
            this.unsub;
            console.log(this.unsub);
            
        }
        
    }   
}




export{Chatroom}
