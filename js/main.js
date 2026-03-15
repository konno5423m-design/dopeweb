
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
const cursor = document.querySelector(".cursor");

let mouseX = 0;
let mouseY = 0;
let posX = 0;
let posY = 0;

document.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor(){
  posX += (mouseX - posX) * 0.15;
  posY += (mouseY - posY) * 0.15;

  cursor.style.left = posX + "px";
  cursor.style.top = posY + "px";

  requestAnimationFrame(animateCursor);
}

animateCursor();

document.querySelectorAll("a, button").forEach(el=>{
  el.addEventListener("mouseenter",()=>{
    cursor.classList.add("active");
  });

  el.addEventListener("mouseleave",()=>{
    cursor.classList.remove("active");
  });
});