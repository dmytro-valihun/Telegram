//Начало общения
function chattingStart(event){
    messagesWindow.textContent = '';
    smilesList.style.display = 'none';
    messChating.style.display = 'flex';
    const chatName = document.querySelector('.message__addressee');
    const userNumber = event.target.getAttribute('number');
    chatName.textContent = userList[userNumber].name;
    currentInterlocutor = chatName.textContent;
    const currentUser = userName.textContent;

    for (let i = 0; i < messages.length; i++){
       if ((messages[i].currentUser === currentUser)&&(messages[i].currentInterlocutor === currentInterlocutor)){
        createElements('div', `${currentUser} - ${messages[i].time[0]}:${messages[i].time[1]}`, 'message__time', messagesWindow);
        createElements('div', `${messages[i].sms}`, 'message__to-friend', messagesWindow.lastChild);
       }
       if ((messages[i].currentUser === currentInterlocutor)&&(messages[i].currentInterlocutor === currentUser)){
        createElements('div', `${currentInterlocutor} - ${messages[i].time[0]}:${messages[i].time[1]}`, 'message__time', messagesWindow);
        createElements('div', `${messages[i].sms}`, 'message__to-friend', messagesWindow.lastChild);
       }
    }
}