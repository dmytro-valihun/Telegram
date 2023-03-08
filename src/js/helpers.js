// хелпер - создать елемент
function createElements(elem, text, className, parrent) {
    const element = document.createElement(elem);
    element.innerHTML = `<pre>${text}</pre>`;
    element.className = className;
    parrent.appendChild(element);
}