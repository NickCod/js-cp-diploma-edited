document.addEventListener("DOMContentLoaded", function () {
  let datesNumber = document.querySelectorAll(".page-nav__day-number");
  let date = new Date();

  datesNumber.forEach((element, index) => {
    let dateNumber = date.getDate() + index;
    // Проверяем, если номер дня превышает количество дней в текущем месяце
    if (
      dateNumber >
      new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    ) {
      date.setMonth(date.getMonth() + 1); // Увеличиваем месяц на 1
      date.setDate(1); // Устанавливаем день на 1 число
      dateNumber = 1; // Обнуляем счетчик
    }

    element.textContent = dateNumber; // Обновляем содержимое элемента
  });
});

const page_nav_date = document.querySelectorAll(".page-nav__day");

window.addEventListener("load", function () {
  applyStylesToTimeBlocks();

  let applyStylesActive = false;

  page_nav_date.forEach((element) => {
    element.addEventListener("click", () => {
      page_nav_date.forEach((otherElement) => {
        otherElement.classList.remove("page-nav__day_chosen");
      });
      element.classList.add("page-nav__day_chosen");

      if (!element.classList.contains("page-nav_today")) {
        resetTimeBlocks();
        applyStylesActive = false;
      }
      if (element === page_nav_date[0] && !applyStylesActive) {
        applyStylesToTimeBlocks();
        applyStylesActive = true;
      }
      const requestBody = "event=update";
      sendRequest(requestBody, (response) => {
        console.log("Server response:", response);
      });
    });
  });
});
let timeBlock = document.querySelectorAll(".movie-seances__time");
let posterImage = document.querySelectorAll(".movie__poster-image");
let movieTitle = document.querySelectorAll(".movie__title");
let movieSynopsis = document.querySelectorAll(".movie__synopsis");
let duration = document.querySelectorAll(".movie__data-duration");
let movie_origin = document.querySelectorAll(".movie__data-origin");

window.onload = function () {
  const requestBody = "event=update";
  sendRequest(requestBody, (response) => {
    for (let i = 0; i < response.films.result.length; i++) {
      const filmId = response.films.result[i].film_id;

      // Найти все сеансы, связанные с текущим фильмом (по идентификатору фильма)
      const relatedSeances = response.seances.result.filter(
        (seance) => seance.seance_filmid === filmId
      );
      timeBlock.innerHTML = "";

      // Добавить элементы для каждого времени сеанса
      relatedSeances.forEach((seance) => {
        const seanceTimeCell = document.createElement("div");
        seanceTimeCell.textContent = seance.seance_time;
      });

      // Остальные обновления элементов DOM для фильмов
      let filmPoster = response.films.result[i].film_poster;
      if (posterImage[i]) {
        posterImage[i].src = filmPoster;
      }
      let filmName = response.films.result[i].film_name;
      if (movieTitle[i]) {
        movieTitle[i].textContent = filmName;
        movieTitle[i].setAttribute("data-name", filmName);
      }
      let filmDescription = response.films.result[i].film_description;
      if (movieSynopsis[i]) {
        movieSynopsis[i].textContent = filmDescription;
      }
      let filmDuration = response.films.result[i].film_duration;
      if (duration[i]) {
        duration[i].textContent = `${filmDuration + " мин"}`;
      }
      let filmOrigin = response.films.result[i].film_origin;
      if (movie_origin[i]) {
        movie_origin[i].textContent = filmOrigin;
      }
    }
  });
};

timeBlock.forEach((element) => {
  element.addEventListener("click", () => {
    let time = element.textContent;
    localStorage.setItem("time", time);

  let name = movieTitle.getAttribute("data-name");
  
  localStorage.setItem("selectedName", name);

    let hallElement = element.closest('.movie-seances__hall').querySelector('.movie-seances__hall-title'); 
    let hallValue = hallElement.textContent;
    localStorage.setItem('hall_id', hallValue);
  });
});

function applyStylesToTimeBlocks() {
  timeBlock.forEach((element) => {
    let date = new Date();
    let dateTime = date.getTime();
    let elementTime = new Date(date.toDateString() + " " + element.textContent);

    if (elementTime < dateTime) {
      element.classList.add("closed");
      element.setAttribute("href", "#");
      element.setAttribute("disabled", "true");
    }
  });
}

function resetTimeBlocks() {
  timeBlock.forEach((element) => {
    let date = new Date();
    let dateTime = date.getTime();
    let elementTime = new Date(date.toDateString() + " " + element.textContent);

    if (elementTime < dateTime) {
      element.classList.remove("closed");
      element.removeAttribute("disabled");
      element.setAttribute("href", "hall.html");
    }
  });
}
