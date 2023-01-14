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
    loginForm.value = '';
    passForm.value = '';
}
function closePopupWindow() {
    exitPopupWindow.hidden = true;
}