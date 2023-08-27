let paymentInfo = localStorage.getItem('seance-data');
let parsedselectedChairs = JSON.parse(paymentInfo);

document.addEventListener('DOMContentLoaded', function(){
    let paymentInfo = localStorage.getItem('seance-data');
    let parsedselectedChairs = JSON.parse(paymentInfo);
  
    let ticketName = document.querySelector('.ticket__title');
    let hallId = document.querySelector('.ticket__hall');
    let ticketId = document.querySelector('.ticket__start');
    let chairs = document.querySelector('.ticket__chairs');
  
    ticketName.textContent = parsedselectedChairs.filmName;
    hallId.textContent = parsedselectedChairs.hallName;
    ticketId.textContent = parsedselectedChairs.seanceTime;
    chairs.textContent = parsedselectedChairs.takenChairs;
  
    let qr = new QRCode(document.getElementById('qr')); // Создание экземпляра QRCode
    let savedQRCode = localStorage.getItem('savedQRCode');
  
    if (savedQRCode) {
      qr.makeCode(savedQRCode); // Отображение сохраненного QR-кода
    } else {
      generateAndSaveQRCode(); // Генерация и сохранение нового QR-кода
    }
  });
  
  function generateAndSaveQRCode() {
    let qrContent = generateQRCodeContent(); // Функция для генерации содержимого QR-кода
    let qr = new QRCode(document.getElementById('qr')); // Создание экземпляра QRCode
    qr.makeCode(qrContent); // Отображение нового QR-кода
    localStorage.setItem('savedQRCode', qrContent); // Сохранение нового QR-кода в localStorage
  }
  function generateQRCodeContent() {
    // Здесь вы можете сгенерировать содержимое QR-кода на основе нужных данных
    let qrContent = 'https://vk.com/doggyfaggot'; // Замените на актуальное содержимое
    return qrContent;
  }; 