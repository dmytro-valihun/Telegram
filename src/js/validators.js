// проверка нового пароля
function checkPass(string) {
    const pattern = /^(?=.+[0-9])(?=.+[a-z])(?=.+[A-Z])[0-9a-zA-Z]{8,16}$/;
    const result = pattern.test(string);
    return result ? true : false;
}