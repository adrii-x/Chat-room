// render chat templates to the dom
// clear  the list of chats (when the room changes)

//    anything related to <list>


class ChatUI{
    constructor(list){
        this.list = list;
    }
    clear(){
       this.list.innerHTML='' 
    }
    render(data){
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),{addSuffix:true}
        );
        const html = `
            <li class='list-group-item'>
               <span class='username'>${data.username}</span> 
               <span class='message'>${data.message}</span> 
               <br>
               <span class='time'>${when}</span> 
            </li>
        `;
        this.list.innerHTML += html;
    }
    
};