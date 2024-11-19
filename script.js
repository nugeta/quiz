const quizContainer = document.getElementById('quiz-container');
const quizElement = document.getElementById('quiz');
const resultElement = document.getElementById('result');
const nextButton = document.getElementById('next');
const playAgainButton = document.getElementById('play-again');
const statsButton = document.getElementById('stats');
const darkModeSwitch = document.getElementById('darkModeSwitch');
const progressBar = document.getElementById('progress-bar');

const questions = [
    {
        question: "Koji je glavni grad Francuske?",
        options: ["Berlin", "Madrid", "Pariz", "Rim"],
        correct: 2
    },
    {
        question: "Koje je najveće jezero u Hrvatskoj?",
        options: ["Jezero Jarun", "Plitvička jezera", "Vransko jezero", "Peruća"],
        correct: 2
    },
    {
        question: "Koji je planet najbliži Suncu?",
        options: ["Zemlja", "Venera", "Mars", "Merkur"],
        correct: 3
    },
    {
        question: "Tko je napisao 'Gorski vijenac'?",
        options: ["Ivan Mažuranić", "Petar II Petrović Njegoš", "Antun Gustav Matoš", "Tin Ujević"],
        correct: 1
    },
    {
        question: "Koliko boja ima hrvatska zastava?",
        options: ["Dva", "Tri", "Četiri", "Pet"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let failedQuestions = [];

function loadQuestion(index) {
    quizContainer.classList.add('hidden');
    setTimeout(() => {
        quizElement.innerHTML = '';
        const questionData = questions[index];
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `<p>${questionData.question}</p>`;
        questionData.options.forEach((option, i) => {
            const button = document.createElement('button');
            button.classList.add('option');
            button.innerText = option;
            button.onclick = () => selectOption(index, i, button);
            questionDiv.appendChild(button);
        });
        quizElement.appendChild(questionDiv);
        quizContainer.classList.remove('hidden');
        updateProgressBar();
    }, 300);
}

function selectOption(questionIndex, optionIndex, button) {
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    button.classList.add('selected');

    if (optionIndex !== questions[questionIndex].correct) {
        failedQuestions.push({
            question: questions[questionIndex].question,
            selectedAnswer: questions[questionIndex].options[optionIndex],
            correctAnswer: questions[questionIndex].options[questions[questionIndex].correct]
        });
    }

    nextButton.style.display = 'block';
}

nextButton.addEventListener('click', () => {
    nextButton.style.display = 'none';
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion(currentQuestionIndex);
    } else {
        showResult();
    }
});

function showResult() {
    quizElement.innerHTML = '';
    playAgainButton.style.display = 'block';
    statsButton.style.display = 'block';
}

playAgainButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    failedQuestions = [];
    resultElement.style.display = 'none';
    playAgainButton.style.display = 'none';
    statsButton.style.display = 'none';
    loadQuestion(currentQuestionIndex);
});

statsButton.addEventListener('click', () => {
    resultElement.style.display = 'block';
    resultElement.innerHTML = `
        <div class="stats">
            <h2>Statistika:</h2>
            <p><strong>Točne odgovore:</strong> ${questions.length - failedQuestions.length}</p>
            <p><strong>Neuspješni odgovori:</strong></p>
            <ul>
                ${failedQuestions
                    .map(
                        q => `        
                        <li>
                            <strong>Pitanje:</strong> ${q.question} <br>
                            <strong>Vaš odgovor:</strong> ${q.selectedAnswer} <br>
                            <strong>Točan odgovor:</strong> ${q.correctAnswer}
                        </li>`
                    )
                    .join('')}
            </ul>
        </div>
    `;
});

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.value = progress;
}

darkModeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    quizContainer.classList.toggle('dark-mode');
});

loadQuestion(currentQuestionIndex);
