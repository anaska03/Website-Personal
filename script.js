// Variabel global untuk menyimpan status permainan
let level = 1; // Level permainan saat ini
let score = 0; // Skor pemain
let correctAnswer = 0; // Jawaban benar dari soal yang sedang ditampilkan
let timer; // Variabel untuk menyimpan interval timer
let timeLeft = 30; // Waktu yang tersisa dalam detik
let highscore = 0; // Skor tertinggi yang pernah dicapai

// Fungsi untuk memulai atau mengatur ulang timer
function startTimer() {
    timeLeft = 30; // Reset waktu ke 30 detik
    document.getElementById("timer").innerText = timeLeft; // Menampilkan waktu di antarmuka
    timer = setInterval(() => {
        timeLeft--; // Mengurangi waktu setiap detik
        document.getElementById("timer").innerText = timeLeft; // Memperbarui tampilan waktu
        if (timeLeft <= 0) { // Cek apakah waktu habis
            clearInterval(timer); // Menghentikan timer
            document.getElementById("feedback").innerText = "Waktu habis! Jawaban salah."; // Memberi umpan balik
            nextQuestion(); // Menghasilkan soal berikutnya
        }
    }, 1000); // Interval 1 detik
}

// Fungsi untuk menghasilkan soal baru
function generateQuestion() {
    let questionType = document.getElementById("questionType").value; // Mendapatkan tipe soal dari dropdown
    let num1 = Math.floor(Math.random() * 10) + 1; // Menghasilkan angka pertama (1-10)
    let num2 = Math.floor(Math.random() * 10) + 1; // Menghasilkan angka kedua (1-10)

    // Memeriksa tipe soal dan mengatur pertanyaan serta jawaban yang benar
    if (questionType === "addition") {
        correctAnswer = num1 + num2; // Menghitung jawaban untuk penjumlahan
        document.getElementById("question").innerText = `Berapa hasil dari ${num1} + ${num2}?`;
    } else if (questionType === "subtraction") {
        correctAnswer = num1 - num2; // Menghitung jawaban untuk pengurangan
        document.getElementById("question").innerText = `Berapa hasil dari ${num1} - ${num2}?`;
    } else if (questionType === "multiplication") {
        correctAnswer = num1 * num2; // Menghitung jawaban untuk perkalian
        document.getElementById("question").innerText = `Berapa hasil dari ${num1} × ${num2}?`;
    }
}

// Fungsi untuk memeriksa jawaban pengguna
function checkAnswer() {
    const userAnswer = parseInt(document.getElementById("answer").value); // Mengambil dan mengonversi jawaban pengguna
    if (userAnswer === correctAnswer) { // Memeriksa apakah jawaban pengguna benar
        score++; // Meningkatkan skor
        document.getElementById("feedback").innerText = "Jawaban Benar!"; // Memberi umpan balik positif
        if (score > highscore) { // Memeriksa apakah skor baru lebih tinggi dari skor tertinggi
            highscore = score; // Memperbarui skor tertinggi
            document.getElementById("highscoreValue").innerText = highscore; // Memperbarui tampilan skor tertinggi
        }
    } else {
        document.getElementById("feedback").innerText = "Jawaban Salah!"; // Memberi umpan balik negatif
    }

    // Menghitung level berdasarkan skor
    level = Math.floor(score / 5) + 1; // Level meningkat setiap 5 poin
    document.getElementById("level").innerText = level; // Memperbarui tampilan level
    document.getElementById("score").innerText = score; // Memperbarui tampilan skor
    clearInterval(timer); // Menghentikan timer setelah menjawab
    nextQuestion(); // Menghasilkan soal baru
}

// Fungsi untuk menghasilkan soal baru dan memulai ulang timer
function nextQuestion() {
    generateQuestion(); // Menghasilkan soal baru
    startTimer(); // Memulai atau mengatur ulang timer
    document.getElementById("answer").value = ""; // Mengosongkan input jawaban
}

// Fungsi untuk mereset permainan
function resetGame() {
    level = 1; // Mengatur ulang level ke 1
    score = 0; // Mengatur ulang skor ke 0
    correctAnswer = 0; // Mengatur ulang jawaban benar
    document.getElementById("level").innerText = level; // Memperbarui tampilan level
    document.getElementById("score").innerText = score; // Memperbarui tampilan skor
    document.getElementById("highscoreValue").innerText = highscore; // Menampilkan skor tertinggi
    clearInterval(timer); // Menghentikan timer
    document.getElementById("timer").innerText = "30"; // Reset waktu
    document.getElementById("feedback").innerText = ""; // Mengosongkan umpan balik
    nextQuestion(); // Menghasilkan soal baru
}

// Memulai permainan pertama kali
nextQuestion(); // Memanggil fungsi untuk menghasilkan soal pertama
