// Hiệu ứng mở màn tách màn hình
window.onload = function() {
    setTimeout(() => {
        document.getElementById('curtain-left').classList.add('open');
        document.getElementById('curtain-right').classList.add('open');
        setTimeout(() => {
            document.getElementById('curtain-left').style.display = 'none';
            document.getElementById('curtain-right').style.display = 'none';
            document.getElementById('main-page').classList.remove('hidden');
        }, 1500);
    }, 500);
};

// Dữ liệu giáo viên theo lớp
const teachers = {
    1: { name: "Cô giáo CN Trinh (Lớp 1)", img: "https://via.placeholder.com/150?text=Co+Trinh", wish: "Chúc cô Trinh luôn mạnh khỏe, hạnh phúc và tiếp tục truyền cảm hứng cho các em lớp 1!" },
    2: { name: "Cô giáo CN Nhung (Lớp 2)", img: "https://via.placeholder.com/150?text=Co+Nhung", wish: "Chúc cô Nhung luôn vui vẻ, sáng tạo và dạy dỗ chúng em thật tốt!" },
    3: { name: "Thầy giáo CN Thầy Quang (Lớp 3)", img: "https://via.placeholder.com/150?text=Thay+Quang", wish: "Chúc thầy Quang luôn khỏe mạnh, thành công và là người thầy mẫu mực!" },
    4: { name: "Cô giáo CN Cô Hà (Lớp 4)", img: "https://via.placeholder.com/150?text=Co+Ha", wish: "Chúc cô Hà luôn hạnh phúc, nhiệt huyết và truyền kiến thức cho chúng em!" },
    5: { name: "Cô giáo CN Cô Nhan (Lớp 5)", img: "https://via.placeholder.com/150?text=Co+Nhan", wish: "Chúc cô Nhan luôn mạnh khỏe, vui tươi và tiếp tục đồng hành cùng lớp 5!" },
    6: [
        { name: "Cô giáo CN Cô Sương (Lớp 6)", img: "https://via.placeholder.com/150?text=Co+Suong", wish: "Chúc cô Sương luôn hạnh phúc và là người cô mẫu mực!" },
        { name: "Thầy Tâm/Khang Toán (Lớp 6)", img: "https://via.placeholder.com/150?text=Thay+Tam+Khang", wish: "Chúc thầy Tâm/Khang luôn sáng tạo trong dạy toán và thành công!" },
        { name: "Cô Dương Tiếng Anh (Lớp 6)", img: "https://via.placeholder.com/150?text=Co+Duong", wish: "Chúc cô Dương luôn vui vẻ và giúp chúng em giỏi tiếng Anh hơn!" }
    ]
};

// Xử lý chọn lớp
document.querySelectorAll('.class-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const classNum = this.getAttribute('data-class');
        document.getElementById('main-page').classList.add('hidden');
        document.getElementById('wish-page').classList.remove('hidden');
        
        const teacherData = teachers[classNum];
        if (Array.isArray(teacherData)) {
            // Lớp 6: Hiển thị nhiều giáo viên
            let names = teacherData.map(t => t.name).join('<br>');
            let imgs = teacherData.map(t => `<img src="${t.img}" alt="${t.name}" class="teacher-img">`).join('');
            let wishes = teacherData.map(t => `<p>${t.wish}</p>`).join('');
            document.getElementById('teacher-name').innerHTML = names;
            document.getElementById('teacher-img').outerHTML = imgs;
            document.getElementById('wish-text').innerHTML = wishes;
        } else {
            document.getElementById('teacher-name').textContent = teacherData.name;
            document.getElementById('teacher-img').src = teacherData.img;
            document.getElementById('wish-text').textContent = teacherData.wish;
        }
        
        // Hiệu ứng gõ chữ
        typeWriter();
        
        // Hoa rơi
        createConfetti();
    });
});

// Quay lại
document.getElementById('back-btn').addEventListener('click', function() {
    document.getElementById('wish-page').classList.add('hidden');
    document.getElementById('main-page').classList.remove('hidden');
    document.getElementById('confetti-container').innerHTML = '';
});

// Nhạc ON/OFF
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

// Hiệu ứng gõ chữ
function typeWriter() {
    const text = document.getElementById('wish-text').textContent;
    document.getElementById('wish-text').textContent = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            document.getElementById('wish-text').textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    type();
}

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
