document.addEventListener('DOMContentLoaded', () => {
  // --- 1. ハンバーガーメニューの処理 ---
  const button = document.querySelector('.header__navButton');
  const navList = document.querySelector('.header__navList');
  if (button && navList) {
    button.addEventListener('click', () => {
      button.classList.toggle('is-active');
      navList.classList.toggle('is-open');
    });
  }

  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.remove("is-transparent");
      } else {
        header.classList.add("is-transparent");
      }
    });
  }

  // --- 2. FAQのアコーディオン処理 ---
  document.querySelectorAll(".faq-q").forEach(q => {
    q.addEventListener("click", () => {
      const answer = q.nextElementSibling;
      if (answer) {
        if (answer.style.display === "block") {
          answer.style.display = "none";
        } else {
          answer.style.display = "block";
        }
      }
    });
  });

  // --- 3. カスタムカーソルの処理 ---
  const cursor = document.querySelector(".cursor");
  if (cursor) {
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
  }

  // --- 4. microCMSから【ブログ記事一覧】を取得する処理 ---
  const apiUrl = `https://dopeblog.microcms.io/api/v1/blogs`;

  fetch(apiUrl, {
    headers: {
      'X-MICROCMS-API-KEY': 'i28N45WC5BNWGLeWaGJwUpjJFdNwyjUdcEZs'
    }
  })
  .then(response => {
    if (!response.ok) throw new Error('データが取得できませんでした');
    return response.json();
  })
  .then(data => {
    // 新しいブログ用の箱（id="blog-list"）を取得します
    const listElement = document.getElementById('blog-list');
    if (!listElement) return;
    
    listElement.innerHTML = ''; // 「準備中...」を消す

    // ブログ記事をループで回して、リンク付きで画面に追加します
    data.contents.forEach(blog => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      
      // クリックしたら詳細ページに飛ぶリンク（推せるようになります！）
a.href = `detail.html?contentId=${blog.id}`; 
     a.textContent = blog.title; 
     // 「（サンプル）まずはこの記事を開きましょう」が表示されます
      
      li.appendChild(a);
      listElement.appendChild(li);
    });
  })
  .catch(error => {
    console.error('エラー:', error);
    const listElement = document.getElementById('blog-list');
    if (listElement) {
      listElement.innerHTML = '<li>読み込みに失敗しました</li>';
    }
  });

});