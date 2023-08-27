let paymentInfo = localStorage.getItem('seance-data');
let parsedselectedChairs = JSON.parse(paymentInfo);

document.addEventListener('DOMContentLoaded', function(){
    let paymentInfo = localStorage.getItem('seance-data');
    let parsedselectedChairs = JSON.parse(paymentInfo);
  
    let ticketName = document.querySelector('.ticket__title');
    let hallId = document.querySelector('.ticket__hall');
    let ticketTime = document.querySelector('.ticket__start');
    let chairs = document.querySelector('.ticket__chairs');
  
    ticketName.textContent = parsedselectedChairs.filmName;
    hallId.textContent = parsedselectedChairs.hallName;
    ticketTime.textContent = parsedselectedChairs.seanceTime;
    chairs.textContent = parsedselectedChairs.takenChairs;
  
    let qr = new QRCode(document.getElementById('qr')); 
    let savedQRCode = localStorage.getItem('savedQRCode');
  
    if (savedQRCode) {
      qr.makeCode(savedQRCode); 
    } else {
      generateAndSaveQRCode(); 
    }
  });
  
  function generateAndSaveQRCode() {
    let qrContent = generateQRCodeContent(); 
    let qr = new QRCode(document.getElementById('qr')); 
    qr.makeCode(qrContent); 
    localStorage.setItem('savedQRCode', qrContent); 
  }
  function generateQRCodeContent() {
    let qrContent = JSON.parse(`На фильм: ${parsedselectedChairs.filmName},Зал: ${parsedselectedChairs.hallName},Ряд/Место: ${parsedselectedChairs.takenChairs},Время: ${parsedselectedChairs.ticketTime}`);
    return qrContent;
  }; 