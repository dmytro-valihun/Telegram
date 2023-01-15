const loginWindow = document.querySelector('.login');
const loginForm = document.querySelector('.login__input-login');
const passForm = document.querySelector('.login__input-pass');
const btnGoLogin = document.querySelector('.login__btn');
const messageWindow = document.querySelector('.message-window');
messageWindow.style.display = 'none';
const btnUserMenu = document.querySelector('.burger-menu__wrap');
const userInfoMenu = document.querySelector('.user-info');
const btnCloseUserInfo = document.querySelector('.user-info__close-btn');
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
btnChangeUserPass.addEventListener('click', changeUserPass) 

loginWindow.style.display = 'none';
divCreateNewUserPass.style.display = 'flex';


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
    const userList = JSON.parse(localStorage.getItem('users'));
    for (let i = 0; i < users.length; i++) {
        if (users[i].phone === loginForm.value && users[i].password === passForm.value) {
            loginWindow.style.display = 'none';
            messageWindow.style.display = 'flex';
        } else {
            divWrongPass.style.display = 'block';
        }
    }
}
function showUserInfo() {
    userInfoMenu.style.left = 0;
}
function closeUserInfo() {
    userInfoMenu.style.left = '-100%';
}
function showPopupExit() {
    exitPopupWindow.hidden = false;
}
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
    for (let i = 0; i < users.length; i++) {
        if (users[i].name === userName && pass_1 === true && pass_1 === pass_2) {
            const userList = JSON.parse(localStorage.getItem('users'));
            userList[i].password = userNewPass;
            localStorage.setItem('users', JSON.stringify(userList));
            console.log(userList);
            divCreateNewUserPass.style.display = 'none';
            loginWindow.style.display = 'flex';
            divWrongChangePass.style.display = 'none';
        } else {
            divWrongChangePass.style.display = 'flex';
        }
    }
}

function checkPass(string) {
    // const pattern = /^(?=.+[0-9])(?=.+[a-z])(?=.+[A-Z])[0-9a-zA-Z]{8,16}$/;
    // const result = pattern.test(string);
    const pattern = /\d/;
    const result = pattern.test(string);
    return result ? true : false;
}

// доделать ВЫ ИЗМЕНИЛИ ПАРОЛЬ