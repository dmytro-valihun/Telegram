const users = [
    {name: 'Vania Kupkin', password: '1', phone: '1'},
    {name: 'Valia Rupkina', password: '2', phone: '2'},
    {name: 'Vasia Pupkin', password: '123456Qw', phone: '+380991231212'},
    {name: 'Masha Dupkina', password: '123456As', phone: '+380501231212'},
    {name: 'Petia Lupkin', password: '123456Zx', phone: '+380661231212'},
] 
const messages = [];
let existMessages = JSON.parse(localStorage.getItem('messages')) || [];

const loginWindow = document.querySelector('.login');
const loginForm = document.querySelector('.login__input-login');
const passForm = document.querySelector('.login__input-pass');
const btnGoLogin = document.querySelector('.login__btn');
const messageWindow = document.querySelector('.message-window');
messageWindow.style.display = 'none';
const btnUserMenu = document.querySelector('.burger-menu__wrap');
const userInfoMenu = document.querySelector('.user-info');
const btnCloseUserInfo = document.querySelector('.close-btn-user-info');
const exitPopupWindow = document.querySelector('.exit-popup-wrap');
exitPopupWindow.hidden = true;
const btnExit = document.querySelector('.user-info__btn');
const btnExitYes = document.querySelector('.exit-btn__yes');
const btnExitNo = document.querySelector('.exit-btn__no');
const divWrongPass = document.querySelector('.login__wrong-message');
divWrongPass.style.display = 'none';
const btnForgotPassword = document.querySelector('.login__btn-forgote-message');
btnForgotPassword.addEventListener('click', createNewPassword);
const divCreateNewUserPass = document.querySelector('.create-new-password');
divCreateNewUserPass.style.display = 'none';
const divWrongChangePass = document.querySelector('.create-new-password__wrong-message');
divWrongChangePass.style.display = 'none';
const btnChangeUserPass = document.querySelector('.create-new-password__btn');
btnChangeUserPass.addEventListener('click', changeUserPass);
const windowPassChangeOk = document.querySelector('.popup-pass-changed');
windowPassChangeOk.style.display = 'none';
const btnPassChangeOk = document.querySelector('.popup-pass-changed__ok');
btnPassChangeOk.addEventListener('click', closeWindowChangePass);
const btnCancelSetNewPass = document.querySelector('.close-btn-cancel-new-pass');
btnCancelSetNewPass.addEventListener('click', cancelSetNewPass);
const userList = JSON.parse(localStorage.getItem('users'));
const messChating = document.querySelector('.message__chatting');
messChating.style.display = 'none';
const btnSend = document.querySelector('.btn-send');
const btnSmiles = document.querySelector('.btn-smiles');
const textMessage = document.querySelector('.message__text');
const messagesWindow = document.querySelector('.message__messeges');
const userName = document.querySelector('.user-info__name');

btnSend.addEventListener('click', sendMessage);
btnGoLogin.addEventListener('click', enterInAccount);
btnUserMenu.addEventListener('click', showUserInfo);
btnCloseUserInfo.addEventListener('click', closeUserInfo);
btnExit.addEventListener('click', showPopupExit);
btnExitYes.addEventListener('click', showLoginPage);
btnExitNo.addEventListener('click', closePopupWindow);


function enterInAccount() {
    if (localStorage.length === 0) {
        localStorage.setItem('users', JSON.stringify(users));
    }
    messagesWindow.textContent = '';
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].phone === loginForm.value && userList[i].password === passForm.value) {
            loginWindow.style.display = 'none';
            messageWindow.style.display = 'flex';
            const userPhone = document.querySelector('.user-info__tel');
            userName.textContent = userList[i].name;
            userPhone.textContent = userList[i].phone;
            createList(i);
        } else {
            divWrongPass.style.display = 'block';
        }
    }
}
//  Инфо о пользователе. Левая панель
function showUserInfo() {
    userInfoMenu.style.left = 0;
}
function closeUserInfo() {
    userInfoMenu.style.left = '-100%';
}
//  Создание списка контактов на левой панели
function createList (number) {
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
            elem.addEventListener('click', chattingStart)
        }
    }
}

let currentInterlocutor;

//Начало общения
function chattingStart(event){
    // подтянуть историю ---------------- to do
    messagesWindow.textContent = '';
    messChating.style.display = 'flex';
    const chatName = document.querySelector('.message__addressee');
    const userNumber = event.target.getAttribute('number');
    chatName.textContent = userList[userNumber].name;
    currentInterlocutor = chatName.textContent;
    // console.log(chatName.textContent)
}

//увеличиваем текстовое окно
let messageHeight = 100;

textMessage.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        if (messageHeight > 270) return;
        textMessage.style.height = `${messageHeight}px`;
        messageHeight += 20;
    }
})

function sendMessage() {
    messageHeight = 100;
    textMessage.style.height = '51px'
    const myMessage = textMessage.value.trim();
    if (!myMessage) return;
    textMessage.value = '';
    let nowDate = new Date();
    let nowHour = nowDate.getHours();
    let nowMinutes = nowDate.getMinutes();
    let nowSeconds = nowDate.getSeconds();
    const currentUser = userName.textContent;
    createElements('div', `${currentUser} - ${nowHour}:${nowMinutes}`, 'message__time', messagesWindow);
    createElements('div', myMessage, 'message__to-friend', messagesWindow.lastChild);
    //сохрянять смс в локалстор, 
    //------------------------------------

    if (!existMessages.length > 0) {
        const messageFromUser = {
            [currentUser]: 
            [{[currentInterlocutor]: [{time: [nowHour, nowMinutes, nowSeconds], sms: myMessage, author: currentUser}]}]
        };
        existMessages.push(messageFromUser);
    } else {
        existMessages.map(user => {
            for ( key in user) {
                if (currentUser === key) {
                    user[currentUser].map(interlocuter => {
                        for (key in interlocuter) {
                            if (key === currentInterlocutor) {
                                interlocuter[currentInterlocutor].push({time: [nowHour, nowMinutes, nowSeconds], sms: myMessage, author: currentUser})
                            } else {
                                user[currentUser].push({[currentInterlocutor]: [{time: [nowHour, nowMinutes, nowSeconds], sms: myMessage, author: currentUser}]})
                            }
                        }
                    })  
                } else {
                    const messageFromUser = {
                        [currentUser]: 
                        [{[currentInterlocutor]: [{time: [nowHour, nowMinutes, nowSeconds], sms: myMessage, author: currentUser}]}]
                    };
                    existMessages.push(messageFromUser);
                }
            }
        })
    }

    console.log(existMessages)


    // messages.push(messageFromUser);
    // existMessages = JSON.parse(localStorage.getItem('messages'));
    // localStorage.setItem('messages', JSON.stringify(messages));
    // for (let i = 0; i < existMessages.length; i++) {
        // console.log(existMessages)
    // }
    // console.log(existMessages[0][[currentUser]])
    // console.log(messageFromUser)
}

function createElements(elem, text, className, parrent) {
    const element = document.createElement(elem);
    element.textContent = text;
    element.className = className;
    parrent.appendChild(element);
}


// Выход из аккаунта
function showPopupExit() {
    exitPopupWindow.hidden = false;
}

// Вход в аккаунт
function showLoginPage() {
    loginWindow.style.display = 'flex';
    messageWindow.style.display = 'none';
    userInfoMenu.style.left = '-100%';
    exitPopupWindow.hidden = true;
    divWrongPass.style.display = 'none';
    loginForm.value = '';
    passForm.value = '';
}
function closePopupWindow() {
    exitPopupWindow.hidden = true;
}
function createNewPassword() {
    document.forms['createNewPass'].userName.value = '';
    document.forms['createNewPass'].userNewPass.value = '';
    document.forms['createNewPass'].repeatUserNewPass.value = '';
    divWrongChangePass.style.display = 'none';
    loginWindow.style.display = 'none';
    divCreateNewUserPass.style.display = 'flex';
}
function changeUserPass() {
    divWrongPass.style.display = 'none';
    const userName = document.forms['createNewPass'].userName.value;
    const userNewPass = document.forms['createNewPass'].userNewPass.value;
    const repeatUserNewPass = document.forms['createNewPass'].repeatUserNewPass.value;
    const pass_1 = checkPass(userNewPass);
    const pass_2 = checkPass(repeatUserNewPass);
    const userList = JSON.parse(localStorage.getItem('users'));

    for (let i = 0; i < userList.length; i++) {
        if (userList[i].name === userName && pass_1 === true && userNewPass === repeatUserNewPass) {
            // const userList = JSON.parse(localStorage.getItem('users'));
            console.log(userList)
            console.log(pass_1)
            console.log(pass_2)
            userList[i].password = userNewPass;
            localStorage.setItem('users', JSON.stringify(userList));
            divCreateNewUserPass.style.display = 'none';
            divWrongChangePass.style.display = 'none';
            windowPassChangeOk.style.display = 'block';
        } else {
            divWrongChangePass.style.display = 'flex';
        }
    }
}
function checkPass(string) {
    //ЭТИ 2 СТРОКИ НИЖЕ РАСКОММЕНТИРОВАТЬ, А 2 НИЖНИЕ УДАЛИТЬ!!!
    // const pattern = /^(?=.+[0-9])(?=.+[a-z])(?=.+[A-Z])[0-9a-zA-Z]{8,16}$/;
    // const result = pattern.test(string);
    const pattern = /\d/;
    const result = pattern.test(string);
    return result ? true : false;
}
function closeWindowChangePass() {
    windowPassChangeOk.style.display = 'none';
    loginWindow.style.display = 'flex';
}

function cancelSetNewPass() {
    divCreateNewUserPass.style.display = 'none';
    divWrongPass.style.display = 'none';
    loginForm.value = '';
    passForm.value = '';
    loginWindow.style.display = 'flex';
}
