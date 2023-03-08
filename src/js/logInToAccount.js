// Вход в аккаунт
function showLoginPage() {
    loginWindow.style.display = 'flex';
    messageWindow.style.display = 'none';
    userInfoMenu.style.left = '-100%';
    exitPopupWindow.hidden = true;
    divWrongPass.style.display = 'none';
    loginForm.value = '';
    passForm.value = '';
    isUserLogged = false;
    localStorage.setItem('isUserLogged', JSON.stringify(isUserLogged));
    currentUserInAccount = false;
    localStorage.setItem('currentUserInAccount', JSON.stringify(currentUserInAccount));
    localStorage.setItem('contacts', JSON.stringify(false));
}

// логинимся
function enterInAccount() {
    const usersArr = [];
    fetch('http://127.0.0.1:5502/build/users.json')
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
        isUserLogged = true;
        localStorage.setItem('isUserLogged', JSON.stringify(isUserLogged));
        currentUserInAccount = matchesUser;
        localStorage.setItem('currentUserInAccount', JSON.stringify(currentUserInAccount));
        localStorage.setItem('contacts', JSON.stringify(userList));
    } else {
        divWrongPass.style.display = 'block';
    }
}