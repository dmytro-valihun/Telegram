function sendMessage() {
    smilesList.style.display = 'none';
    messageHeight = 100;
    textMessage.style.height = '51px'
    const myMessage = textMessage.value.trim();

    if (!myMessage) return;
    textMessage.value = '';
    let nowDate = new Date();
    let nowHour = nowDate.getHours();
    let nowMinutes = nowDate.getMinutes();
    if (nowMinutes >= 0 && nowMinutes <= 9) {
        nowMinutes = '0' + nowMinutes;
    }
    const currentUser = userName.textContent;
    createElements('div', `${currentUser} - ${nowHour}:${nowMinutes}`, 'message__time', messagesWindow);
    createElements('div', myMessage, 'message__to-friend', messagesWindow.lastChild);
    
    const messageFromUser = {
        id: Date.now(),
        currentUser,
        currentInterlocutor,
        time: [nowHour, nowMinutes], 
        sms: myMessage, 
        author: currentUser
    };
    messages.push(messageFromUser);
    localStorage.setItem('messages', JSON.stringify(messages))
}

//увеличиваем текстовое окно
textMessage.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        if (messageHeight > 270) return;
        textMessage.style.height = `${messageHeight}px`;
        messageHeight += 20;
    }
})

// использование смайлов
function btnSmilesHandler(){
    if (smilesList.style.display === 'block') {
        smilesList.style.display = 'none'; 
    }
    else {
        smilesList.style.display = 'block';
    }       
}
addUnicode = function(n) {
    let text = document.querySelector('.message__text');
    let s = String.fromCodePoint(n);
	text.focus();
	if (text.selectionStart!=undefined) {
		let p = text.selectionStart;
		text.value = text.value.substring(0,text.selectionStart)+s+text.value.substring(text.selectionEnd,text.value.length);
		text.selectionStart = p+s.length;
		text.selectionEnd = text.selectionStart;
	}
	else text.value += s;
}