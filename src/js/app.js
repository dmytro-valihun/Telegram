const messages = [];
// let existMessages = JSON.parse(localStorage.getItem('messages')) || [];

const loginWindow = document.querySelector('.login');
const loginForm = document.querySelector('.login__input-login');
const passForm = document.querySelector('.login__input-pass');
const btnGoLogin = document.querySelector('.login__btn');
const messageWindow = document.querySelector('.message-window');
const btnUserMenu = document.querySelector('.burger-menu__wrap');
const userInfoMenu = document.querySelector('.user-info');
const btnCloseUserInfo = document.querySelector('.close-btn-user-info');
const exitPopupWindow = document.querySelector('.exit-popup-wrap');
const btnExit = document.querySelector('.user-info__btn');
const btnExitYes = document.querySelector('.exit-btn__yes');
const btnExitNo = document.querySelector('.exit-btn__no');
const divWrongPass = document.querySelector('.login__wrong-message');
const btnForgotPassword = document.querySelector('.login__btn-forgote-message');
const divCreateNewUserPass = document.querySelector('.create-new-password');
const divWrongChangePass = document.querySelector('.create-new-password__wrong-message');
const btnChangeUserPass = document.querySelector('.create-new-password__btn');
const windowPassChangeOk = document.querySelector('.popup-pass-changed');
const btnPassChangeOk = document.querySelector('.popup-pass-changed__ok');
const btnCancelSetNewPass = document.querySelector('.close-btn-cancel-new-pass');
const messChating = document.querySelector('.message__chatting');
const btnSend = document.querySelector('.btn-send');
const btnSmiles = document.querySelector('.btn-smiles');
const textMessage = document.querySelector('.message__text');
const messagesWindow = document.querySelector('.message__messeges');
const userName = document.querySelector('.user-info__name');
const smilesList = document.querySelector('.message__smiles');
let userList; // сюда запишем подтянутых юзеров
let currentInterlocutor; // чел с которым общается шлавный юзер
let messageHeight = 100;// данные для увеличения окна набора смс

exitPopupWindow.hidden = true;
divWrongChangePass.style.display = 'none';
divCreateNewUserPass.style.display = 'none';
divWrongPass.style.display = 'none';
smilesList.style.display = 'none';
messChating.style.display = 'none';
windowPassChangeOk.style.display = 'none';
messageWindow.style.display = 'none';

btnChangeUserPass.addEventListener('click', changeUserPass);
btnPassChangeOk.addEventListener('click', closeWindowChangePass);
btnCancelSetNewPass.addEventListener('click', cancelSetNewPass);
btnChangeUserPass.addEventListener('click', changeUserPass);
btnForgotPassword.addEventListener('click', createNewPassword);
btnSend.addEventListener('click', sendMessage);
btnGoLogin.addEventListener('click', enterInAccount);
btnUserMenu.addEventListener('click', showUserInfo);
btnCloseUserInfo.addEventListener('click', closeUserInfo);
btnExit.addEventListener('click', showPopupExit);
btnExitYes.addEventListener('click', showLoginPage);
btnExitNo.addEventListener('click', closePopupWindow);
btnSmiles.addEventListener('click', btnSmilesHandler);


// логинимся
function enterInAccount () {
    const usersArr = [];
    fetch('http://127.0.0.1:5501/build/users.json')
    .then(res => res.json())
    .then(result => {
        usersArr.push(...result);
        finalEnter(usersArr)
    })
}
// логинимся
function finalEnter(arr) {
    userList = arr;
    messagesWindow.textContent = '';
    const matchesUser = userList.find(user => user.phone === +loginForm.value && user.password === +passForm.value);
    if (matchesUser) {
        loginWindow.style.display = 'none';
        messageWindow.style.display = 'flex';
        const userPhone = document.querySelector('.user-info__tel');
        userName.textContent = matchesUser.name;
        userPhone.textContent = matchesUser.phone;
        createList(matchesUser.id);
    } else {
        divWrongPass.style.display = 'block';
    }
}

//  Инфо о пользователе. Левая панель показать
function showUserInfo() {
    userInfoMenu.style.left = 0;
}
//  Инфо о пользователе. Левая панель скрыть
function closeUserInfo() {
    userInfoMenu.style.left = '-100%';
}

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
            elem.addEventListener('click', chattingStart)
        }
    }
}



//Начало общения
function chattingStart(event){
    // подтянуть историю ---------------- to do
       
    messagesWindow.textContent = '';
    messChating.style.display = 'flex';
    const chatName = document.querySelector('.message__addressee');
    const userNumber = event.target.getAttribute('number');
    chatName.textContent = userList[userNumber].name;
    currentInterlocutor = chatName.textContent;
    const currentUser = userName.textContent
    // console.log(currentInterlocutor)
    // console.log(currentUser)

    // console.log(JSON.parse(localStorage.getItem('messages')))

    const history = [];
    console.log(222, messages);
    for (let i = 0; i < messages.length; i++){
        // console.log (messages[i].currentUser === currentUser)
       if ((messages[i].currentUser === currentUser)&&(messages[i].currentInterlocutor === currentInterlocutor)){
        // console.log(messages[i].time, messages[i].sms);
        createElements('div', `${currentInterlocutor} - ${messages[i].time[0]}:${messages[i].time[1]}`, 'message__time', messagesWindow);
        createElements('div', `${messages[i].sms}`, 'message__to-friend', messagesWindow.lastChild);
       }
       if ((messages[i].currentUser === currentInterlocutor)&&(messages[i].currentInterlocutor === currentUser)){
        // console.log(messages[i].time, messages[i].sms);
        createElements('div', `${currentUser} - ${messages[i].time[0]}:${messages[i].time[1]}`, 'message__time', messagesWindow);
        createElements('div', `${messages[i].sms}`, 'message__from-friend', messagesWindow.lastChild);
       }
    }
}




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
    //сохраняем смс в локалстор
    //------------------------------------
    let messageFromUser = {
        ID:messages.length,
        currentUser,
        currentInterlocutor,
        time: [nowHour, nowMinutes, nowSeconds], 
        sms: myMessage, 
        author: currentUser
        };
    // let messageFromUser = {
    //     [currentUser]: 
    //     [{[currentInterlocutor]: [{time: [nowHour, nowMinutes, nowSeconds], sms: myMessage, author: currentUser}]}]
    //     };
    messages.push(messageFromUser);
    // console.log(111, messageFromUser);
    // console.log(222, messages);
    localStorage.setItem('messages', JSON.stringify(messages))
    

    // if (!existMessages.length > 0) {
    //     const messageFromUser = {
    //         [currentUser]: 
    //         [{[currentInterlocutor]: [{time: [nowHour, nowMinutes, nowSeconds], sms: myMessage, author: currentUser}]}]
    //     };
    //     existMessages.push(messageFromUser);
    // } else {
    //     existMessages.map(user => {
    //         for ( key in user) {
    //             if (currentUser === key) {
    //                 user[currentUser].map(interlocuter => {
    //                     for (key in interlocuter) {
    //                         if (key === currentInterlocutor) {
    //                             interlocuter[currentInterlocutor].push({time: [nowHour, nowMinutes, nowSeconds], sms: myMessage, author: currentUser})
    //                         } else {
    //                             user[currentUser].push({[currentInterlocutor]: [{time: [nowHour, nowMinutes, nowSeconds], sms: myMessage, author: currentUser}]})
    //                         }
    //                     }
    //                 })  
    //             } else {
    //                 const messageFromUser = {
    //                     [currentUser]: 
    //                     [{[currentInterlocutor]: [{time: [nowHour, nowMinutes, nowSeconds], sms: myMessage, author: currentUser}]}]
    //                 };
    //                 existMessages.push(messageFromUser);
    //             }
    //         }
    //     })
    // }

    // console.log(existMessages)

    // messages.push(existMessages);
    // localStorage.setItem('messages', JSON.stringify(existMessages))

    // JSON.stringify(localStorage(setItem('messages', existMessages)))


    // messages.push(messageFromUser);
    // existMessages = JSON.parse(localStorage.getItem('messages'));
    // localStorage.setItem('messages', JSON.stringify(messages));
    // for (let i = 0; i < existMessages.length; i++) {
        // console.log(existMessages)
    // }
    // console.log(existMessages[0][[currentUser]])
    // console.log(messageFromUser)
}


// использование смайлов
function btnSmilesHandler(){
    if (smilesList.style.display === 'block') {
        smilesList.style.display = 'none'; 
    }
    else {
        smilesList.style.display = 'block';
    }       
}
addUnicode=function(n){
    let text=document.querySelector('.message__text');
    let s=String.fromCodePoint(n);
    console.log(s);
	text.focus();
	if(text.selectionStart!=undefined){
		let p=text.selectionStart;
		text.value=text.value.substring(0,text.selectionStart)+s+text.value.substring(text.selectionEnd,text.value.length);
		text.selectionStart=p+s.length;
		text.selectionEnd=text.selectionStart;
	}
	else text.value+=s;
}




// хелпер - создать елемент
function createElements(elem, text, className, parrent) {
    const element = document.createElement(elem);
    element.textContent = text;
    element.className = className;
    parrent.appendChild(element);
}

//увеличиваем текстовое окно
textMessage.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        if (messageHeight > 270) return;
        textMessage.style.height = `${messageHeight}px`;
        messageHeight += 20;
    }
})

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

// кнопка не выходить с аккаунта
function closePopupWindow() {
    exitPopupWindow.hidden = true;
}

// кнопка если забыл пароль
function createNewPassword() {
    document.forms['createNewPass'].userName.value = '';
    document.forms['createNewPass'].userNewPass.value = '';
    document.forms['createNewPass'].repeatUserNewPass.value = '';
    divWrongChangePass.style.display = 'none';
    loginWindow.style.display = 'none';
    divCreateNewUserPass.style.display = 'flex';
}

// меняем пароль
function changeUserPass() {
    divWrongPass.style.display = 'none';
    const userName = document.forms['createNewPass'].userName.value;
    const userNewPass = document.forms['createNewPass'].userNewPass.value;
    const repeatUserNewPass = document.forms['createNewPass'].repeatUserNewPass.value;
    const pass_1 = checkPass(userNewPass);
    const pass_2 = checkPass(repeatUserNewPass);

    if ((userNewPass === repeatUserNewPass) && pass_1 === true) {
        checkUsers(userName, userNewPass);
    } else {
        divWrongChangePass.style.display = 'flex';
    }
}
// меняем пароль
const checkUsers = (userName, userNewPass) => {
    const usersArr = [];
    fetch('http://127.0.0.1:5501/build/users.json')
    .then(res => res.json())
    .then(result => {
        usersArr.push(...result);
        finalChange(usersArr, userName, userNewPass)
    })
}
// меняем пароль
function finalChange(arr, userName, userNewPass) {
    const matchesPass = arr.find(user => user.name === userName);
    if (matchesPass) {
        divCreateNewUserPass.style.display = 'none';
        divWrongChangePass.style.display = 'none';
        windowPassChangeOk.style.display = 'block';
        //надо тут записать новый пароль в json чтобы он был доступен, а так остается старый пароль
        // matchesPass.password = userNewPass => и это сплайсом вставить в бекенд
    } else {
        divWrongChangePass.style.display = 'flex';
    }
}
// проверка нового пароля
function checkPass(string) {
    //ЭТИ 2 СТРОКИ НИЖЕ РАСКОММЕНТИРОВАТЬ, А 2 НИЖНИЕ УДАЛИТЬ!!!
    // const pattern = /^(?=.+[0-9])(?=.+[a-z])(?=.+[A-Z])[0-9a-zA-Z]{8,16}$/;
    // const result = pattern.test(string);
    const pattern = /\d/;
    const result = pattern.test(string);
    return result ? true : false;
}
// закрытие окна смены пароля
function closeWindowChangePass() {
    windowPassChangeOk.style.display = 'none';
    loginWindow.style.display = 'flex';
}
// принудительное закрытие окна смены пароля
function cancelSetNewPass() {
    divCreateNewUserPass.style.display = 'none';
    divWrongPass.style.display = 'none';
    loginForm.value = '';
    passForm.value = '';
    loginWindow.style.display = 'flex';
}