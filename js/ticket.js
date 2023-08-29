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
});
  const qrcode1 = QRCreator(
    `На фильм: ${parsedselectedChairs.filmName},
    Зал: ${parsedselectedChairs.hallName},
    Ряд/Место: ${parsedselectedChairs.takenChairs},
    Время: ${parsedselectedChairs.seanceTime}`,
    {
      mode: 4,
      eccl: 0,
      mask: -1,
      image: 'html',
      modsize: -1,
      margin: 0
    }
  );

const content = (qrcode) =>{
  return qrcode.error ?
    `недопустимые исходные данные ${qrcode.error}`:
     qrcode.result;
};

document.getElementById('qr').append(content(qrcode1));
