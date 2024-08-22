// adding new chaft documents
// setting up a real-time listener to get new chats
//updating the username
//updating the room 
class Chatroom{
    constructor(room,username){
        this.room= room,
        this.username= username,
        this.chats=db.collection('chat');
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
            created_at:firebase.firestore.Timestamp.fromDate(now)

        };
    const responce = await this.chats.add(chat);
    console.log(responce)

    return responce;
    } 
    getChats(callback){
        this.unsub= this.chats
        .where( 'room','==', this.room )
        .orderBy('created_at')
        .onSnapshot((snapshot)=>{
            snapshot.docChanges().forEach((change)=>{
                if (change.type==='added') {
                    callback(change.doc.data())
                }
                // else if (change.type==='removed') {
                    
                // }
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
            //if u dont want the value to be null from the start
            this.unsub();
        }
        
    }   
}


// setTimeout(() => {
//     chatroom.updateRoom('gaming');
//     chatroom.updateName('Yoshi');
//     chatroom.getChats((data)=>{
//         console.log(data);
    
//     });
//     chatroom.addChat('hello');
    
// }, 8000);



// chatroom.addChat('hello everyone')
// .then(()=>console.log('chat added'))
// .catch((err)=>console.log(err))