const srtBut = document.querySelector('.srt-button');
const srtInfo = document.querySelector('.quiz-info');
const exitBut = document.querySelector('.exit-but');
const main = document.querySelector('.main');
const continueBut = document.querySelector('.continue-but');
const quizSection = document.querySelector('.s-quiz');
const quizBox = document.querySelector('.quiz-box');
const result = document.querySelector('.result');
const tryAgainBut = document.querySelector('.tryAgain-but');
const goHomeBut = document.querySelector('.goHome-but');


srtBut.addEventListener('click', () => {
    srtInfo.classList.add('active');
    main.classList.add('active');
})
exitBut.addEventListener('click', () => {
    srtInfo.classList.remove('active');
    main.classList.remove('active');
})
continueBut.addEventListener('click', () => {
    quizSection.classList.add("active");
    srtInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    score();
})

tryAgainBut.addEventListener('click', () => {
    quizBox.classList.add('active');
    result.classList.remove('active');
    nextBut.classList.remove('active');


    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    score();
})

goHomeBut.addEventListener('click', () => {
    quizSection.classList.remove('active');
    result.classList.remove('active');
    nextBut.classList.remove('active');


    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
})

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBut = document.querySelector('.next-but');

nextBut.addEventListener('click', () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBut.classList.remove('active');
    }
    else {
        showResult();
    }
})

const optionList = document.querySelector('.option-list');

function showQuestions(index) {
    const questionText = document.querySelector('.question1');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div>
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for(let i = 0; i < option.length; i++){
        option[i].setAttribute('onclick','optionSelected(this)');
    }

}

function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if (userAnswer == correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        score();
    }
    else{
        answer.classList.add('incorrect');

        for(let i = 0; i < allOptions; i++) {
            if(optionList.children[i].textContent == correctAnswer){
                optionList.children[i].setAttribute('class', 'option correct')
            }
        }

    }


    for(let i = 0; i < allOptions; i++){
        optionList.children[i].classList.add('disabled');
    }

    nextBut.classList.add('active');

}

function questionCounter(index) {
    const questionTotal = document.querySelector('.total-questions');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function score(){
    const scoreText = document.querySelector('.score');
    scoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResult() {
    quizBox.classList.remove('active');
    result.classList.add('active');

    const fScore = document.querySelector('.f-score');
    fScore.textContent = `Your Score is ${userScore} out of ${questions.length}`;

    const circDisc = document.querySelector('.circ-disc');
    const progress = document.querySelector('.progress');
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;

    let prog = setInterval(() => {
        progressStartValue ++;

        progress.textContent = `${progressStartValue}%`;
        circDisc.style.background = `conic-gradient(#3a7de8 ${progressStartValue * 3.6}deg, rgba(24, 24, 24, 0.1) 0deg)`;

        if (progressStartValue == progressEndValue) {
            clearInterval(prog);
        }

    }, speed);
}