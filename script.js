// ==================== 参数可调 ====================
// 背景闪烁星点大小范围 (px)
const REAL_STAR_MIN = 4;
const REAL_STAR_MAX = 7;

// 漂浮星星大小范围 (px)
const FLOAT_STAR_MIN = 30;
const FLOAT_STAR_MAX = 50;

// “影”字占星星大小比例在 CSS 中 font-size:0.4em 可调

// 流星出现概率和间隔
const METEOR_INTERVAL = 3000; // 毫秒
const METEOR_PROBABILITY = 0.9; // 50% 概率

// SVG五角星模板（白色或浅黄色渐变）
function getStarSVG(color1, color2) {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <polygon points="32,4 39,24 60,24 42,38 48,58 32,46 16,58 22,38 4,24 25,24"
        fill="url(#grad)" stroke="#fff" stroke-width="1.2" />
      <defs>
        <radialGradient id="grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:${color1}; stop-opacity:1"/>
          <stop offset="100%" style="stop-color:${color2}; stop-opacity:1"/>
        </radialGradient>
      </defs>
    </svg>`;
}

// 背景小星点
function createRealStars(count = 100) {
    const container = document.querySelector(".real-stars");
    for (let i = 0; i < count; i++) {
        const star = document.createElement("div");
        star.classList.add("real-star");
        const size = Math.random() * (REAL_STAR_MAX - REAL_STAR_MIN) + REAL_STAR_MIN;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = Math.random() * 100 + "vw";
        star.style.top = Math.random() * 100 + "vh";
        star.style.animationDuration = (3 + Math.random() * 3) + "s";
        container.appendChild(star);
    }
}

// 漂浮大星星
function createFloatingStar() {
    const star = document.createElement("div");
    star.classList.add("star");

    const colors = [
        ["#ffffff", "#ffffcc"],
        ["#fff9e6", "#ffd966"]
    ];
    const [c1, c2] = colors[Math.floor(Math.random() * colors.length)];
    star.innerHTML = getStarSVG(c1, c2);

    const text = document.createElement("div");
    text.classList.add("star-text");
    text.textContent = "影";
    star.appendChild(text);

    const size = Math.floor(Math.random() * (FLOAT_STAR_MAX - FLOAT_STAR_MIN)) + FLOAT_STAR_MIN;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.querySelector("svg").style.width = "100%";
    star.querySelector("svg").style.height = "100%";
    text.style.fontSize = `${size * 0.3}px`; // ⭐ 可调比例

    star.style.left = Math.random() * 100 + "vw";
    const duration = 6 + Math.random() * 6;
    star.style.animationDuration = `${duration}s, ${Math.random() * 3 + 2}s`;

    document.querySelector(".stars").appendChild(star);

    setTimeout(() => {
        star.remove();
    }, (duration + 2) * 1000);
}

// 流星
function createMeteor() {
    const meteor = document.createElement("div");
    meteor.classList.add("meteor");

    const startX = Math.random() * window.innerWidth * 0.4;
    const startY = Math.random() * window.innerHeight * 0.3;
    meteor.style.left = `${startX}px`;
    meteor.style.top = `${startY}px`;

    const text = document.createElement("div");
    text.classList.add("meteor-text");
    text.textContent = "影";
    meteor.appendChild(text);

    const colors = [
        "linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0))",
        "linear-gradient(90deg, rgba(255,255,200,1), rgba(255,255,255,0))"
    ];
    meteor.style.background = colors[Math.floor(Math.random() * colors.length)];

    const length = Math.random() * 80 + 80;
    meteor.style.width = `${length}px`;
    const speed = Math.random() * 2 + 2;
    meteor.style.animationDuration = `${speed}s`;

    document.body.appendChild(meteor);
    setTimeout(() => meteor.remove(), speed * 1000);
}

createRealStars();
setInterval(createFloatingStar, 1000);

// 随机流星
setInterval(() => {
    if (Math.random() < METEOR_PROBABILITY) {
        createMeteor();
    }
}, METEOR_INTERVAL);

// ========== 背景音乐播放（首次点击触发） ==========
document.addEventListener("click", function () {
    const audio = document.getElementById("bgm");
    audio.play().catch(err => console.log("音乐播放失败：", err));
}, { once: true }); // 保证只触发一次



// ================== 流星雨按钮触发 ==================
// 流星雨祝福文字
const messages = ["开心", "快乐", "顺其自然", "自由", "永远快快乐乐", "心想事成"];

// 生成单颗流星
function createBurstMeteor() {
    const meteor = document.createElement("div");
    meteor.classList.add("meteor");

    // 起始位置随机
    const startX = Math.random() * window.innerWidth * 0.5;
    const startY = Math.random() * window.innerHeight * 0.3;
    meteor.style.left = `${startX}px`;
    meteor.style.top = `${startY}px`;

    // 随机是否带文字
    if (Math.random() > 0.4) {
        const text = document.createElement("div");
        text.classList.add("meteor-text");
        text.textContent = messages[Math.floor(Math.random() * messages.length)];
        meteor.appendChild(text);
    }

    // 随机颜色
    const colors = [
        "linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0))",
        "linear-gradient(90deg, rgba(255,255,200,1), rgba(255,255,255,0))"
    ];
    meteor.style.background = colors[Math.floor(Math.random() * colors.length)];

    // 随机长度和速度
    const length = Math.random() * 120 + 100; // 100-220px
    meteor.style.width = `${length}px`;
    const speed = Math.random() * 2 + 1.5; // 1.5-3.5秒
    meteor.style.animationDuration = `${speed}s`;

    document.body.appendChild(meteor);
    setTimeout(() => meteor.remove(), speed * 1000);
}

// 点击按钮生成一场流星雨
document.getElementById("meteorButton").addEventListener("click", () => {
    const count = Math.floor(Math.random() * 40) + 60; // 40~60颗流星
    for (let i = 0; i < count; i++) {
        setTimeout(createBurstMeteor, i * 900); // 每颗稍微延迟
    }
});

// ================= 背景音乐点击播放 =================
document.addEventListener("click", function () {
    const audio = document.getElementById("bgm");
    audio.play().catch(err => console.log("音乐播放失败：", err));
}, { once: true });

document.getElementById("fireworkButton").addEventListener("click", () => {
    // 跳转到烟花页面
    window.location.href = "./fireworks/index.html"; 
});
