//  Создание списка контактов на левой панели
function createList(number) {
    messChating.style.display = 'none';
    const chatList = document.querySelector('.chat-list__user-list');
    chatList.textContent = "";
    for (let j = 0; j < userList.length; j++){
        if (j !== number) {
            const elem = document.createElement('li');
            elem.textContent = userList[j].name;
            elem.className = 'chat-list__user';
            elem.setAttribute('number', j);
            chatList.appendChild(elem); 
            elem.addEventListener('click', chattingStart);
        }
    }
}