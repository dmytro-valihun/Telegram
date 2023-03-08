// меняем пароль
function changeUserPass() {
    divWrongPass.style.display = 'none';
    const userName = document.forms['createNewPass'].userName.value;
    const userNewPass = document.forms['createNewPass'].userNewPass.value;
    const repeatUserNewPass = document.forms['createNewPass'].repeatUserNewPass.value;
    const pass_1 = checkPass(userNewPass);
    checkPass(repeatUserNewPass);

    if ((userNewPass === repeatUserNewPass) && pass_1 === true) {
        checkUsers(userName, userNewPass);
    } else {
        divWrongChangePass.style.display = 'flex';
    }
}

// меняем пароль
const checkUsers = (userName, userNewPass) => {
    const usersArr = [];
    fetch('http://127.0.0.1:5502/build/users.json')
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
        // matchesPass.password = userNewPass => и это вставить в бекенд
    } else {
        divWrongChangePass.style.display = 'flex';
    }
}