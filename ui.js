// render chat templates to the dom
// clear  the list of chats (when the room changes)

//    anything related to <list>
import { formatDistanceToNow } from "https://unpkg.com/date-fns/formatDistanceToNow.js";
// const { formatDistanceToNow } = require("date-fns");
// import { formatDistanceToNow } from "date-fns";

let date;
class ChatUI{
    
    constructor(list){
        this.list = list;
    }

    

    clear(){
       this.list.innerHTML='' 
    }
    render(data){

        let milliseconds = data.created_at.seconds * 1000;
        let totalMilliseconds = milliseconds + data.created_at.nanoseconds / 1000000;

        // Create a Date object
        date = new Date(totalMilliseconds);

        let b = formatDistanceToNow(
            date,
            {addSuffix: true}
          )
        console.log(date);
        // console.log(Date(2016, 0, 1));     
        // console.log(b);
        console.log("herrre");
        // const when = formatDistanceToNow(
        //     data.created_at.toDate(),{addSuffix:true}
        // );
        const html = `
            <li class='list-group-item'>
               <span class='username'>${data.username}</span> 
               <span class='message'>${data.message}</span> 
               <br>
               <span class='time'>${b}</span> 
            </li>
        `;
        this.list.innerHTML += html;
    }
    
};


export {ChatUI}