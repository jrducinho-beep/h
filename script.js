// Trang envelope
document.getElementById('envelope').addEventListener('click', function() {
    this.classList.add('open');
    setTimeout(() => {
        document.getElementById('envelope-page').classList.add('hidden');
        document.getElementById('wish-page').classList.remove('hidden');
        typeWriter("Chúc mừng Ngày Nhà Giáo Việt Nam 20/11! Cảm ơn thầy cô đã dạy dỗ và truyền cảm hứng cho chúng em. Chúc thầy cô luôn mạnh khỏe, hạnh phúc và thành công!");
    }, 1000);
});

// Hiệu ứng gõ chữ
function typeWriter(text) {
    const element = document.getElementById('wish-text');
    element.textContent = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        } else {
            setTimeout(() => {
                document.getElementById('wish-page').classList.add('hidden');
                document.getElementById('game-page').classList.remove('hidden');
                startGame();
            }, 2000);
        }
    }
    type();
}

// Minigame
let playerPos = 50; // % left
let gameInterval;
let obstacles = [];
function startGame() {
    playerPos = 50;
    document.getElementById('player').style.left = playerPos + '%';
    obstacles.forEach(obs => obs.remove());
    obstacles = [];
    gameInterval = setInterval(createObstacle, 1500);
}

document.getElementById('left-btn').addEventListener('click', () => movePlayer(-10));
document.getElementById('right-btn').addEventListener('click', () => movePlayer(10));
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') movePlayer(-10);
    if (e.key === 'ArrowRight') movePlayer(10);
});

function movePlayer(delta) {
    playerPos = Math.max(0, Math.min(90, playerPos + delta));
    document.getElementById('player').style.left = playerPos + '%';
}

function createObstacle() {
    const obs = document.createElement('div');
    obs.classList.add('obstacle');
    obs.style.left = Math.random() * 70 + 15 + '%';
    document.getElementById('obstacles').appendChild(obs);
    obstacles.push(obs);
    setTimeout(() => {
        if (checkCollision(obs)) {
            clearInterval(gameInterval);
            if (confirm('Bạn đụng vào điểm kém! Bạn muốn qua hay chơi tiếp? (OK = Qua, Cancel = Chơi tiếp)')) {
                document.getElementById('game-page').classList.add('hidden');
                document.getElementById('earth-page').classList.remove('hidden');
            } else {
                startGame();
            }
        }
        obs.remove();
        obstacles = obstacles.filter(o => o !== obs);
    }, 3000);
}

function checkCollision(obs) {
    const player = document.getElementById('player');
    const pRect = player.getBoundingClientRect();
    const oRect = obs.getBoundingClientRect();
    return !(pRect.right < oRect.left || pRect.left > oRect.right || pRect.bottom < oRect.top || pRect.top > oRect.bottom);
}

// Trái đất
document.getElementById('earth').addEventListener('click', function() {
    document.getElementById('class-selection').classList.remove('hidden');
});

// Dữ liệu giáo viên
const teachers = {
    1: { name: "Cô giáo CN Trinh (Lớp 1)", wish: "Chúc cô Trinh luôn mạnh khỏe, hạnh phúc và tiếp tục truyền cảm hứng cho các em lớp 1!" },
    2: { name: "Cô giáo CN Nhung (Lớp 2)", wish: "Chúc cô Nhung luôn vui vẻ, sáng tạo và dạy dỗ chúng em thật tốt!" },
    3: { name: "Thầy giáo CN Thầy Quang (Lớp 3)", wish: "Chúc thầy Quang luôn khỏe mạnh, thành công và là người thầy mẫu mực!" },
    4: { name: "Cô giáo CN Cô Hà (Lớp 4)", wish: "Chúc cô Hà luôn hạnh phúc, nhiệt huyết và truyền kiến thức cho chúng em!" },
    5: { name: "Cô giáo CN Cô Nhan (Lớp 5)", wish: "Chúc cô Nhan luôn mạnh khỏe, vui tươi và tiếp tục đồng hành cùng lớp 5!" },
    6: [
        { name: "Cô giáo CN Cô Sương (Lớp 6)", wish: "Chúc cô Sương luôn hạnh phúc và là người cô mẫu mực!" },
        { name: "Thầy Tâm/Khang Toán (Lớp 6)", wish: "Chúc thầy Tâm/Khang luôn sáng tạo trong dạy toán và thành công!" },
        { name: "Cô Dương Tiếng Anh (Lớp 6)", wish: "Chúc cô Dương luôn vui vẻ và giúp chúng em giỏi tiếng Anh hơn!" }
    ]
};

// Chọn lớp
document.querySelectorAll('.class-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const classNum = this.getAttribute('data-class');
        document.getElementById('earth-page').classList.add('hidden');
        document.getElementById('final-wish-page').classList.remove('hidden');
        
        const teacherData = teachers[classNum];
        if (Array.isArray(teacherData)) {
            let names = teacherData.map(t => t.name).join('<br>');
            let wishes = teacherData.map(t => `<p>${t.wish}</p>`).join('');
            document.getElementById('teacher-name').innerHTML = names;
            document.getElementById('final-wish-text').innerHTML = wishes;
        } else {
            document.getElementById('teacher-name').textContent = teacherData.name;
            document.getElementById('final-wish-text').textContent = teacherData.wish;
        }
        
        createConfetti();
    });
});

// Quay lại
document.getElementById('back-to-earth').addEventListener('click', function() {
    document.getElementById('final-wish-page').classList.add('hidden');
    document.getElementById('earth-page').classList.remove('hidden');
    document.getElementById('confetti-container').innerHTML = '';
});

// Nhạc
let musicPlaying = false;
document.getElementById('music-toggle').addEventListener('click', function() {
    const music = document.getElementById('bg-music');
    if (musicPlaying) {
        music.pause();
        this.textContent = '🎵 Bật nhạc';
    } else {
        music.play();
        this.textContent = '🔇 Tắt nhạc';
    }
    musicPlaying = !musicPlaying;
});

// Hoa rơi
function createConfetti() {
    const container = document.getElementById('confetti-container');
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(confetti);
    }
}