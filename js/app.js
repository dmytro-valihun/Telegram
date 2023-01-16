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
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].phone === loginForm.value && userList[i].password === passForm.value) {
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