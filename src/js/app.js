const messages = JSON.parse(localStorage.getItem('messages')) || [];
let isUserLogged = JSON.parse(localStorage.getItem('isUserLogged')) || false;
let currentUserInAccount = JSON.parse(localStorage.getItem('currentUserInAccount')) || false;

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
let currentInterlocutor; // чел с которым общается главный юзер
let messageHeight = 100;// данные для увеличения окна набора смс

exitPopupWindow.hidden = true;
divWrongChangePass.style.display = 'none';
divCreateNewUserPass.style.display = 'none';
divWrongPass.style.display = 'none';
smilesList.style.display = 'none';
messChating.style.display = 'none';
windowPassChangeOk.style.display = 'none';
messageWindow.style.display = 'none';