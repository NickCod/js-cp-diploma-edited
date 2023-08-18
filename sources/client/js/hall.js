let timeStorage = localStorage.getItem('time'); // Получаем время из localStorage
let timeElement = document.querySelector('.buying__info-start');

if (timeStorage) {
    timeElement.textContent = `Начало сеанса: ${timeStorage}`;
}

let selectedNameStorage = localStorage.getItem('selectedName');
let nameElement = document.querySelector('.buying__info-title');

if (selectedNameStorage) {
  nameElement.textContent = selectedNameStorage;
}

let hall = document.querySelector('.buying__info-hall');
let hallStorage = localStorage.getItem('hall_id');

if(hallStorage) {
    hall.textContent = hallStorage;
}