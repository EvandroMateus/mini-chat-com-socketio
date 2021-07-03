let socket = io("http://localhost:3000");
let sendBtn = document.querySelector("#send-btn");

sendBtn.addEventListener('click', send);

socket.on("disconnect", () => console.log("Desconectado"));

socket.on("showmsg", data => {
    let chat = document.querySelector("#chat");

    if(data.username != undefined && data.msg != undefined){
        let msgBox = createMsgBox(data.username, data.msg);
        
        chat.append(msgBox);
        msgBox.scrollIntoView();
    }
})

function send(){
    let msgField = document.querySelector('#msg');
    let usernameField = document.querySelector('#username');
    let msg = msgField.value;
    let username = usernameField.value;

    if(username != "" && msg != ""){
        socket.emit("msg", {msg, username});
        msgField.value = "";
    }
    msgField.focus();
}

function createMsgBox(username, msgText){
    let msgBox = document.createElement("div");
    let usernameSpan = document.createElement("span");
    let msg = document.createElement("p");

    msgBox.classList.add("bg-gray-200", "my-2", "py-2", "px-4", "rounded-md", "shadow", "msg-box");
    usernameSpan.classList.add("text-sm", "text-gray-500");
    msg.classList.add("text-gray-800", "font-medium");

    usernameSpan.innerHTML = "@" + username;
    msg.innerHTML = msgText;

    msgBox.appendChild(usernameSpan);
    msgBox.appendChild(msg);

    return msgBox;
}