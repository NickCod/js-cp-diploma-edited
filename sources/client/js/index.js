document.addEventListener("DOMContentLoaded", function () {
  let datesNumber = document.querySelectorAll(".page-nav__day-number");
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  let dateWeek = document.querySelectorAll(".page-nav__day-week");
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

page_nav_date.forEach((element) => {
  element.addEventListener("click", () => {
    page_nav_date.forEach((otherElement) => {
      otherElement.classList.remove("page-nav__day_chosen");
    });
    element.classList.add("page-nav__day_chosen");

    const requestBody = "event=update";
    sendRequest(requestBody, (response) => {
      console.log("Server response:", response);
      // Дополнительные действия с ответом от сервера
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
    for (let i = 0; i < response.seances.result.length; i++) {
      let seanceTime = response.seances.result[i].seance_time;
      timeBlock[i].textContent = seanceTime;
    }
    let posterImages = document.querySelectorAll(".movie__poster-image");

    for (let i = 0; i < response.films.result.length; i++) {
      let filmPoster = response.films.result[i].film_poster;
      if (posterImages[i]) {
        posterImages[i].src = filmPoster;
      }
    }
    for (let i = 0; i < response.films.result.length; i++) {
      let filmName = response.films.result[i].film_name;
      if (movieTitle[i]) {
        movieTitle[i].textContent = filmName;
      }
    }
    for (let i = 0; i < response.films.result.length; i++) {
        let filmDescriptoin = response.films.result[i].film_description;
        if (movieTitle[i]) {
            movieSynopsis[i].textContent = filmDescriptoin;
        }
      }
      for (let i = 0; i < response.films.result.length; i++) {
        let filmDuration = response.films.result[i].film_duration;
        if (movieTitle[i]) {
            duration[i].textContent = `${filmDuration + ' минут'}`;
        }
      }
      for (let i = 0; i < response.films.result.length; i++) {
        let filmOrigin = response.films.result[i].film_origin;
        if (movieTitle[i]) {
            movie_origin[i].textContent = filmOrigin;
        }
      }
      
  });
};

timeBlock.forEach((element) => {
  element.addEventListener("click", () => {
    let time = element.textContent;
    localStorage.setItem("time", time);
  });
});
