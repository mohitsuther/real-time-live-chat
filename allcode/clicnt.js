const socket = io()




let i = 0; 
let name;
let textarea = document.querySelector("#textarea");
let massagearea = document.querySelector(".massagearea");
let button = document.getElementById("button");
do{
     name = prompt('please enter your name');
}while(!name);


let username = document.getElementById("user_name");
let username2 = document.querySelector(".messag");
username.innerHTML = "Hi "+ " " + name;
username2.innerHTML = "Wellcome"+ " " + name;


button.addEventListener('click',()=>{

    if( button.type === 'submit' )
{
    let m = textarea.value;
    // e.target.value
    sendMessage(m);
}

})

function sendMessage(messages){
    let msg = {
        user:name,
        message:messages.trim()
        // msg.trim()
    }

    appendMessage(msg,'outgoing');
    textarea.value =''
    scrollToBottom()
    socket.emit('message',msg)
}

function appendMessage(msg,type){
    let maindiv = document.createElement('div');
    let classname = type;
    maindiv.classList.add(classname,'message');

    let markup = `
    <h3>${msg.user}</h3>

    <p>${msg.message}</p>
`
    maindiv.innerHTML = markup;
    massagearea.appendChild(maindiv);

   


}
socket.on('message',(msg)=>{
    appendMessage(msg,'incoming');
    scrollToBottom()
})
function scrollToBottom(){
    massagearea.scrollTop = massagearea.scrollHeight;
}


