let page_nav_date = document.querySelectorAll('.page-nav__day');

page_nav_date.forEach(element => {
    element.addEventListener('click', () => {
        page_nav_date.forEach(otherElement => {
            otherElement.classList.remove('page-nav__day_chosen');
        });
        element.classList.add('page-nav__day_chosen');
    });
});