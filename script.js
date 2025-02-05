document.addEventListener("DOMContentLoaded", function () {
    // スクロールアニメーション
    const fadeElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";
                entry.target.classList.add("fade-in-visible");  // 見えた時にクラス追加
            }
        });
    });

    fadeElements.forEach(el => observer.observe(el));
});

// 背景の葉のようなエフェクト
const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
const numParticles = 100;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createParticles() {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2
        });
    }
}
createParticles();

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(68, 170, 68, 0.8)";  // 緑の光の粒

    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(animateParticles);
}
animateParticles();

// ライトボックス
const images = document.querySelectorAll('.portfolio-media');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeBtn = document.getElementById('close-btn');

images.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImage.src = img.src;
        lightboxImage.style.opacity = 0;  // 初期状態で透明
        setTimeout(() => lightboxImage.style.opacity = 1, 50);  // フェードイン
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// ポートフォリオアイテムのマウスホバー時に拡大表示
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = "scale(1.05)";  // ホバー時に少し拡大
        item.style.transition = "transform 0.3s ease";  // なめらかな遷移
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = "scale(1)";  // ホバー解除時に元に戻る
    });
});
