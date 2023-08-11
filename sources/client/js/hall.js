let timeStorage = localStorage.getItem('time'); // Получаем время из localStorage
let timeElement = document.querySelector('.buying__info-start');

if (timeStorage) {
    timeElement.textContent = `Начало сеанса: ${timeStorage}`;
}