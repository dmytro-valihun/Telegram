// проверка нового пароля
function checkPass(string) {
    //ЭТИ 2 СТРОКИ НИЖЕ РАСКОММЕНТИРОВАТЬ, А 2 НИЖНИЕ УДАЛИТЬ!!!
    // const pattern = /^(?=.+[0-9])(?=.+[a-z])(?=.+[A-Z])[0-9a-zA-Z]{8,16}$/;
    // const result = pattern.test(string);
    const pattern = /\d/;
    const result = pattern.test(string);
    return result ? true : false;
}