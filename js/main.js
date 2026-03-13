AOS.init({
    offset: 100,
    delay: 100,
    duration: 400,
    easing: 'ease-in',
    once: true,
});

document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.header__navButton');
  const navList = document.querySelector('.header__navList');

  console.log(button, navList);

  if (!button || !navList) return;

  button.addEventListener('click', () => {
    button.classList.toggle('is-active');
    navList.classList.toggle('is-open');
  });
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.remove("is-transparent");
    } else {
      header.classList.add("is-transparent");
    }
  });
  
});
document.querySelectorAll(".faq-q").forEach(q => {
  q.addEventListener("click", () => {

    const answer = q.nextElementSibling;

    if(answer.style.display === "block"){
      answer.style.display = "none";
    } else {
      answer.style.display = "block";
    }

  });
});