let questions = [
    {
        'question': 'Wer hat HTML erfunden?',
        'answer_1': 'Robbie Wiliams',
        'answer_2': 'Lady Gaga',
        'answer_3': 'Tim Berners-Lee',
        'answer_4': 'Justin Biber',
        'right_answer': 3
    },
    {
        'question': 'Royale Kindheit: Welche Frage des 13-Jährigen Charles hätte Queen Elizabeth wohl mit "Ja" beantwortet?',
        'answer_1': 'Mama, fliegen wir zusammen in den Urlaub?',
        'answer_2': 'Mama, spielen wir Monopoly?',
        'answer_3': 'Mama, fährst du mich in die Stadt?',
        'answer_4': 'Mama, xxx',
        'right_answer': 3
    },
    {
        'question': 'Wofür steht das "L" in RTL?',
        'answer_1': 'Luxembourg',
        'answer_2': 'London',
        'answer_3': 'Live',
        'answer_4': 'Level',
        'right_answer': 1
    },
    {
        'question': 'Außer auf Speisekarten, wo findet man noch ein Hamburger-Menü?',
        'answer_1': 'Wanderkarten',
        'answer_2': 'Etiketten auf Kleidungsstücken',
        'answer_3': 'Netzteilen',
        'answer_4': 'Mobile-Websiten',
        'right_answer': 4
    },
    {
        'question': 'Ä bitte? Im alten Buchstabieralphabet hieß es bis 2022 "Ö" wie Ökonom und "Ä" wie? ',
        'answer_1': 'Ärger',
        'answer_2': 'Äquator',
        'answer_3': 'Ägypten',
        'answer_4': 'Äpfel',
        'right_answer': 1
    },
    {
        'question': 'Wer hat HTML erfunden?',
        'answer_1': 'Robbie Wiliams',
        'answer_2': 'Lady Gaga',
        'answer_3': 'Tim Berners-Lee',
        'answer_4': 'Justin Biber',
        'right_answer': 3
    },
    {
        'question': 'Wer hat HTML erfunden?',
        'answer_1': 'Robbie Wiliams',
        'answer_2': 'Lady Gaga',
        'answer_3': 'Tim Berners-Lee',
        'answer_4': 'Justin Biber',
        'right_answer': 3
    }
]


let currentQuestion = 0
let countCorrectAnswers = 0
let AUDIO_SUCCESS = new Audio('./audio/success.mp3')
let AUDIO_FAIL = new Audio('./audio/fail.mp3')


function init() {
    if (gameIsOver()) {
        showResult()
    } else {
        showQuestion()
        updateProgressBar()
    }
}


function gameIsOver() {
    return currentQuestion >= questions.length
}


function showResult() {
    document.getElementById('end-screen').classList.remove('d-none')
    document.getElementById('end-screen-img').classList.remove('d-none')
    document.getElementById('questions-screen').classList.add('d-none')
    document.getElementById('card-container').classList.remove('padding-right')
    document.getElementById('count-correct-answers').textContent = countCorrectAnswers
    document.getElementById('number-of-questions-end-screen').textContent = questions.length
}


function showQuestion() {
    let question = questions[currentQuestion]
    document.getElementById('start-screen').classList.add('d-none')
    document.getElementById('questions-screen').classList.remove('d-none')
    document.getElementById('number-of-questions').textContent = questions.length
    document.getElementById('current-number-of-question').textContent = currentQuestion + 1
    document.getElementById('question-text').textContent = question.question
    document.getElementById('answer-1').textContent = question.answer_1
    document.getElementById('answer-2').textContent = question.answer_2
    document.getElementById('answer-3').textContent = question.answer_3
    document.getElementById('answer-4').textContent = question.answer_4
}


function checkAnswer(element) {
    let idOfRightAnswer = `answer-${questions[currentQuestion].right_answer}`
    if (checkForRightAnswer(element)) {
        successFunc(element)
    } else {
        failFunc(idOfRightAnswer, element)
    }
    document.getElementById('btn-next-question').disabled = false
    currentQuestion++
    changeBtnContent()
    updateProgressBar()
    disableRemainingQuestions()
}


function changeBtnContent() {
    if (currentQuestion == questions.length) {
        document.getElementById('btn-next-question').textContent = 'Ergebnis anzeigen'
    }
}


function successFunc(element) {
    document.getElementById(`answer-${element}`).parentNode.classList.add('bg-success')
    AUDIO_SUCCESS.play()
    countCorrectAnswers++
}


function failFunc(idOfRightAnswer, element) {
    document.getElementById(`answer-${element}`).parentNode.classList.add('bg-danger')
    document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success')
    AUDIO_FAIL.play()
}


function checkForRightAnswer(element) {
    return element == questions[currentQuestion].right_answer
}


function disableRemainingQuestions() {
    let content = document.querySelectorAll('.quiz-answer-card')
    for (let i = 0; i < content.length; i++) {
        document.getElementById(`answer-${i + 1}`).parentNode.classList.add('disabled') 
    }
}


function nextQuestion() {
    document.getElementById('btn-next-question').disabled = true
    init()
    enableAllQuestions()
}


function enableAllQuestions() {
    let content = document.querySelectorAll('.quiz-answer-card')
    for (let i = 0; i < content.length; i++) {
        document.getElementById(`answer-${i + 1}`).parentNode.classList.remove('disabled')
        if (content[i].classList.contains('bg-danger')) {
            content[i].classList.remove('bg-danger')
        } else if (content[i].classList.contains('bg-success')) {
            content[i].classList.remove('bg-success')
        }
    }
}


function restart() {
    currentQuestion = 0
    countCorrectAnswers = 0
    document.getElementById('end-screen').classList.add('d-none')
    document.getElementById('end-screen-img').classList.add('d-none')
    document.getElementById('card-container').classList.add('padding-right')
    document.getElementById('btn-next-question').textContent = 'Nächste Frage'
    init()
}


function updateProgressBar() {
    let progress = Math.round((currentQuestion / questions.length) * 100)
    document.getElementById('progress-bar').style.width = `${progress}%`
}