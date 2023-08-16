let timeStorage = localStorage.getItem('time'); // Получаем время из localStorage
let timeElement = document.querySelector('.buying__info-start');

if (timeStorage) {
    timeElement.textContent = `Начало сеанса: ${timeStorage}`;
}

let nameStorage = localStorage.getItem('name');
let nameElement = document.querySelector('.buying__info-title');

if(nameStorage){
    nameElement.textContent = nameStorage;
}