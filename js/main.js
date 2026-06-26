
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

// 1. URLからプレビュー用の情報を自動で読み取る
const urlParams = new URLSearchParams(window.location.search);
const contentId = urlParams.get('contentId') || 'k8kpwrm_c'; 
const draftKey = urlParams.get('draftKey');

// 2. config.js に書いた「SERVICE_ID」を使ってURLを組み立てる
let apiUrl = `https://${MICROCMS_CONFIG.SERVICE_ID}.microcms.io/api/v1/blogs/${contentId}`;

if (draftKey) {
  apiUrl += `?draftKey=${draftKey}`;
}

// 3. microCMSからデータを取得する
fetch(apiUrl, {
  headers: {
    // 🔑 config.js に書いた「API_KEY」をここで自動的に読み込みます
    'X-MICROCMS-API-KEY': MICROCMS_CONFIG.API_KEY 
  }
})
.then(response => response.json())
.then(data => {
  // HTMLの箱に流し込む
  document.getElementById('blog-title').textContent = data.title;
  document.getElementById('blog-content').innerHTML = data.content;
})
.catch(error => {
  console.error('読み込み失敗:', error);
});