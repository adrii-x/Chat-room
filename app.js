// dom queries




import { ChatUI } from "/ui.js";
import { Chatroom } from "/chat.js";

const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg')
const rooms = document.querySelector('.chat-rooms');
// add a new chat
newChatForm.addEventListener('submit', e=>{
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
    .then(()=> newChatForm.reset())
    .catch(err => console.log(err));
});

// update username
newNameForm.addEventListener('submit', e=>{
    e.preventDefault();
    // update name via chartroom
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName)
    // reset the form
    newNameForm.reset();
    // show then hide the update mssg
    updateMssg.innerText=`your name was updated to ${newName}`
    setTimeout(() => {
        updateMssg.innerText=``;
    }, 3000);
});
// update the chat room
rooms.addEventListener('click', e=>{
    if (e.target.nodeName==='BUTTON') {
        chatUI.clear();
        console.log(e.target.getAttribute('id'));
        chatroom.updateRoom(e.target.getAttribute('id'))
        chatroom.getChats(chat=> chatUI.render(chat));
    };
    // e.preventDefault();
    // // update name via chartroom
    // const newName = newNameForm.name.value.trim();
    // chatroom.updateName(newName)
    // // reset the form
    // newNameForm.reset();
    // // show then hide the update mssg
    // updateMssg.innerText=`your name was updated to ${newName}`
    // setTimeout(() => {
    //     updateMssg.innerText=``;
    // }, 3000);
});

// check local storage for a name
const username = localStorage.username ? localStorage.username : 'someone'



// class instances
const chatUI = new ChatUI(chatList);
const chatroom =  new Chatroom('general', username);

// get chats and render
chatroom.getChats((data)=>{
    
    
    chatUI.render(data);    
});
