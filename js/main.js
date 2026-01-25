AOS.init({
    offset: 100,
    delay: 100,
    duration: 400,
    easing: 'ease-in',
    once: true,
});

const navButton = document.querySelector('.header__navButton');
const navList = document.querySelector('.header__navList');

navButton.addEventListener('click', () => {
  navList.classList.toggle('is-open');
  navButton.classList.toggle('is-active');
});

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY < 50) {
    header.classList.add('is-transparent');
  } else {
    header.classList.remove('is-transparent');
  }
});