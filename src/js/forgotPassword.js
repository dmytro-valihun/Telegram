function createNewPassword() {
    document.forms['createNewPass'].userName.value = '';
    document.forms['createNewPass'].userNewPass.value = '';
    document.forms['createNewPass'].repeatUserNewPass.value = '';
    divWrongChangePass.style.display = 'none';
    loginWindow.style.display = 'none';
    divCreateNewUserPass.style.display = 'flex';
}