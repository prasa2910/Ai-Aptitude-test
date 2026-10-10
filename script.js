let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;

let testQuestions = [];

const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", startTest);

function startTest() {
    // Make a copy of the question bank
    testQuestions = [...questions];

    // Shuffle the questions randomly
    testQuestions.sort(() => Math.random() - 0.5);

    // Select only 5 questions
    testQuestions = testQuestions.slice(0, 5);

    currentQuestion = 0;
    score = 0;

    showQuestion();
}

function showQuestion() {
    clearInterval(timer);
    timeLeft = 30;

    const container = document.querySelector(".container");
    const question = testQuestions[currentQuestion];

    container.innerHTML = `
        <h2>Question ${currentQuestion + 1} of ${testQuestions.length}</h2>
        <div class="progress-container">
            <div class="progress-bar" style="width: ${((currentQuestion + 1) / testQuestions.length) * 100}%"></div>
        </div>
        <div class="timer">
            ⏱️ Time Left: <span id="time">30</span> seconds
        </div>

        <h3>${question.question}</h3>

        ${question.options.map(option => `
            <button class="option-btn" onclick="checkAnswer('${option}')">
                ${option}
            </button>
        `).join("")}
    `;

    startTimer();
}

function startTimer() {
    const timeDisplay = document.getElementById("time");

    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            currentQuestion++;

            if (currentQuestion < testQuestions.length) {
                showQuestion();
            } else {
                showResult();
            }
        }
    }, 1000);
}

function checkAnswer(selectedAnswer) {
    clearInterval(timer);

    // Check the selected answer
    if (selectedAnswer === testQuestions[currentQuestion].answer) {
        score++;
    }

    // Move to the next question
    currentQuestion++;

    // Show the next question or final result
    if (currentQuestion < testQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const container = document.querySelector(".container");

    container.innerHTML = `
        <h1>🎉 Test Completed!</h1>
        <h2>Your Score</h2>
        <p>You scored <strong>${score}</strong> out of <strong>${testQuestions.length}</strong>.</p>
        <button onclick="location.reload()">Try Again</button>
    `;
}