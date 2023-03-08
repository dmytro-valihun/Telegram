// не выкидывает если юзер залогинен
if (isUserLogged === true) {
    userList = JSON.parse(localStorage.getItem('contacts'));
    messagesWindow.textContent = '';
    loginWindow.style.display = 'none';
    messageWindow.style.display = 'flex';
    const userPhone = document.querySelector('.user-info__tel');
    userName.textContent = currentUserInAccount.name;
    userPhone.textContent = currentUserInAccount.phone;
    createList(currentUserInAccount.id);
}