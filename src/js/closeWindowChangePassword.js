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