import './examOperations.sass'
import { banksCollection } from "./firebase";
import { activeTestsList, repeatQuestions } from './testCustomization'
import { end } from './testResults.js'

const banks = banksCollection
// Create new function in Array.prototype to return random item from array
Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}
Object.prototype.random = function(){
    let i = Math.floor((Math.random()*(Object.keys(this).length - 1)))
    return Object.keys(this)[i]
}
Object.prototype.length = function(){
    return Object.keys(this).length
}

// Question and Answers Text Resize input Range
const questionTextResizeInput = document.querySelector('.question-text-resize-input')
questionTextResizeInput.oninput = () => {
    document.querySelector('.question-container').style.fontSize = `${questionTextResizeInput.value / 100 + 0.8}em`
}
// Paragraph Text Resize input Range
const paragraphTextResizeInput = document.querySelector('.question-paragraph-resize-input')
paragraphTextResizeInput.oninput = () => {
    document.querySelector('.question-paragraph-container').style.fontSize = `${paragraphTextResizeInput.value / 100 + 0.8}em`
}

const currentQuestionsCounterElmnt = document.querySelector('.current-questions-count')
const totalQuestionsCounterElmnt = document.querySelector('.total-questions-count')
const testOptionsContainer = document.querySelector('.test-options-container')
const testQuestionsAmountInput = document.querySelector('.questions-count-input')
let testQuestionsAmount = testQuestionsAmountInput.value
testQuestionsAmountInput.onchange = ()=>{testQuestionsAmount = testQuestionsAmountInput.value}
function startTest() {
    // Clean up empty active banks
    for(const bank in activeTestsList){
        if(activeTestsList[bank].length == 0){
            delete activeTestsList[bank]
        }
    }
    // Calculate Max allowed questions
    let testQuestionsMaxAmount = 0
    for(const bank in activeTestsList){
        for (let i = 0; i < activeTestsList[bank].length; i++) {
            const testName = activeTestsList[bank][i];
            if(typeof(banks[bank][testName]) == 'object'){
                testQuestionsMaxAmount += banks[bank][testName]['questions'].length()
            }
        }
    }
    if(!repeatQuestions && testQuestionsAmount > testQuestionsMaxAmount){
        testQuestionsAmount == testQuestionsMaxAmount
    }
    // Set Total Questions Counter
    totalQuestionsCounterElmnt.textContent = testQuestionsAmount

    // Hide Test Options and Start the Exam
    testOptionsContainer.style.display = 'none'
    generateRandomQuestion()
}


let questionLocation = {}
let maxRepetitions
let subQuestionsCounter = undefined
let questionCounter = 0
function generateRandomQuestion() {
    function generate(){
        // Generate New Question
        questionCounter++
        // Refresh Question Counter
        currentQuestionsCounterElmnt.textContent = questionCounter
        // Turn Counter to Red When its being Held
        if(questionCounter > testQuestionsAmount){currentQuestionsCounterElmnt.style.color = '#ba1818'}
        // Check if there's any Pending Long questions
        if(subQuestionsCounter == undefined){
            const randomBank = activeTestsList.random()
            const randomTest = activeTestsList[randomBank].random()
            const randomQuestionNumber = banks[randomBank][randomTest]['questions'].random()
            questionLocation = {
                bankName: randomBank,
                testName: randomTest,
                questionNumber: randomQuestionNumber,
            }
        }
    
        fetchQuestion(questionLocation)
        startTimer(30)
    }

    // Check if Exam Ended
    if(questionCounter < testQuestionsAmount){
        queue = false
        return generate()
    }else{
        if(holdEnd){
            return generate()
        }else{
            // End Exam
            return end()
        }
    }
}

let holdEnd = false
function fetchQuestion(questionLocationObj){
    const bankName = questionLocationObj['bankName']
    const testName = questionLocationObj['testName']
    const questionNumber = questionLocationObj['questionNumber']
    const questionType = banks[bankName][testName]['questions'][questionNumber]['questionType']
    questionLocationObj.questionType = questionType
    
    // Check if there's any Pending Long questions
    // if Yes, inject the sub question number
    if(subQuestionsCounter != undefined){
        questionLocationObj.subQuestionNumber = subQuestionsCounter
        // Cancel the subQuestionsCounter when the Long questions ends
        if(!(subQuestionsCounter < (maxRepetitions - 1))){
            subQuestionsCounter = undefined
            holdEnd = false
        }
    }else{
        // if New question is 'long' set the maxRepetitions and start the subQuestionsCounter
        if(questionType == "long"){
            maxRepetitions = banks[bankName][testName]['questions'][questionNumber]['questions'].length()
            subQuestionsCounter = 0
            questionLocationObj.subQuestionNumber = subQuestionsCounter
            // Hold Exam End untill long question ends
            holdEnd = true
        }
    }

    injectQuestion(questionLocationObj)
    if(!subQuestionsCounter < maxRepetitions){
        if(typeof(subQuestionsCounter) == 'number'){
            subQuestionsCounter++
        }
    }



}
function injectQuestion(injectedObj){
    const questionHeadElmnt = document.querySelector('.question-head')
    const questionParagraphElmnt = document.querySelector('.question-paragraph')

    const bankName = injectedObj['bankName']
    const testName = injectedObj['testName']
    const questionNumber = injectedObj['questionNumber']
    const subQuestionNumber = injectedObj['subQuestionNumber']

    const isLong = (injectedObj.questionType == "long") ? true : false
    let answers
    let question
    // If injected question is "long", inject questionParagraph
    if(isLong){
        // Inject Paragraph
        questionParagraphElmnt.innerHTML = banks[bankName][testName]['questions'][questionNumber]['questionParagraph']
        
        // Get Question and Answers Locations (Long)
        question = banks[bankName][testName]['questions'][questionNumber]['questions'][subQuestionNumber]['question']
        answers = banks[bankName][testName]['questions'][questionNumber]['questions'][subQuestionNumber]['answers']
    }else{
        // Inject Paragraph Lock Img
        questionParagraphElmnt.innerHTML = '<div class="question-paragraph-img-container"><img src="./imgs/lock.png"></div>'
        
        // Get Question and Answers Locations (Normal)
        question = banks[bankName][testName]['questions'][questionNumber]['question']
        answers = banks[bankName][testName]['questions'][questionNumber]['answers']
    }
    // Inject Questions
    for (let i = 0; i < 4; i++) {
        if(answers[i]){
            document.querySelector(`.question-answer-${i + 1} > span`).innerHTML = answers[i]
        }
    }
    questionHeadElmnt.innerHTML = question
    // Inject question Info into Choices
    let i = 0
    document.querySelectorAll('.choice').forEach((elmnt) => {
        elmnt.setAttribute('data-value', answers[i])
        elmnt.setAttribute('data-type', injectedObj['questionType'])
        elmnt.setAttribute('data-bank', injectedObj['bankName'])
        elmnt.setAttribute('data-test', injectedObj['testName'])
        elmnt.setAttribute('data-question', injectedObj['questionNumber'])
        if(isLong){elmnt.setAttribute('data-sub-question', injectedObj['subQuestionNumber'])}
        i++
    })
    // Inject question Info into Skip button
    i = 0
    document.querySelectorAll('.skip-question-button').forEach((elmnt) => {
        elmnt.setAttribute('data-type', injectedObj['questionType'])
        elmnt.setAttribute('data-bank', injectedObj['bankName'])
        elmnt.setAttribute('data-test', injectedObj['testName'])
        elmnt.setAttribute('data-question', injectedObj['questionNumber'])
        if(isLong){elmnt.setAttribute('data-sub-question', injectedObj['subQuestionNumber'])}
        i++
    })
}
const timerElmnt = document.querySelector('.timer')
let timer
let positiveTimer = 0
function startTimer(duration){
    let time = duration
    positiveTimer = 0
    timerElmnt.textContent = time
    timer = setInterval(()=>{
        if(time >= 20){
            timerElmnt.style.color = 'rgb(23, 130, 25)'
        }else if(time >= 10){
            timerElmnt.style.color = 'rgb(240, 171, 8)'
        }else if(time < 10){
            timerElmnt.style.color = 'rgb(238, 28, 18)'
        }
        time--
        positiveTimer++
        timerElmnt.textContent = time
        // Set Timer Color
    }, 1000)
}


let questionRecord = {}


let queue = false
function choicePick(event) {
    // Get Elements
    const checkElmnt = document.querySelector('.check-pick')
    const crossElmnt = document.querySelector('.cross-pick')
    const questionHeadElmnt = document.querySelector('.question-head')
    const questionAnswersElmnts = document.querySelectorAll('.question-answers-container')
    // Get Data
    const pick = event.target.getAttribute('data-value')
    const bankName = event.target.getAttribute('data-bank')
    const testName = event.target.getAttribute('data-test')
    const questionType = event.target.getAttribute('data-type')
    const questionNumber = event.target.getAttribute('data-question')
    const subQuestionNumber = event.target.getAttribute('data-sub-question')

    
    let correctAnswer
    if(questionType == 'long'){
        correctAnswer = banks[bankName][testName]['questions'][questionNumber]['questions'][subQuestionNumber]['correctAnswer']
    }else{
        correctAnswer = banks[bankName][testName]['questions'][questionNumber]['correctAnswer']
    }
    
    const isAnswerCorrect = (pick == correctAnswer) ? true : false
    // Prevent Clicking untill Cross or Check img animation Ends
    if(!queue){
        queue = true
        // Reset Timer
        clearInterval(timer)
        // Record Answer
        questionRecord[questionCounter] = {
            // Question Info
            isAnswerCorrect: isAnswerCorrect,
            questionCounter: questionCounter,
            questionType: questionType,
            bankName: bankName,
            testName: testName,
            questionNumber: questionNumber,
            subQuestionNumber: subQuestionNumber,
            correctAnswer: correctAnswer,
            answer: pick,
            duration: positiveTimer,
        }
        // Show Check or Cross Img based on Picked answer
        if(pick == correctAnswer){
            // Show Check Image Animation
            checkElmnt.classList.toggle('hide')
            checkElmnt.classList.toggle('hide-animation')
            // Hide Check Image Animation
            setTimeout(()=>{
                checkElmnt.classList.toggle('hide')
                checkElmnt.classList.toggle('hide-animation')
            }, 500)

        }else{
            // Show Cross Image Animation
            crossElmnt.classList.toggle('hide')
            crossElmnt.classList.toggle('hide-animation')
            // Hide Cross Image Animation
            setTimeout(()=>{
                crossElmnt.classList.toggle('hide')
                crossElmnt.classList.toggle('hide-animation')
            }, 500)
        }

        // Hide Current question
        questionHeadElmnt.classList.toggle('hide-animation')
        questionAnswersElmnts.forEach(elmnt => {
            elmnt.classList.toggle('hide-animation')
        })
        // Show New Question
        setTimeout(()=>{
            questionHeadElmnt.classList.toggle('hide-animation')
            questionAnswersElmnts.forEach(elmnt => {
                elmnt.classList.toggle('hide-animation')
            })

        }, 500)
        setTimeout(() => {
            generateRandomQuestion()
        }, 450);
    }
    
}
document.querySelectorAll('.choice').forEach((elmnt)=>{ elmnt.onclick = choicePick })
// Skip Question Button
document.querySelector('.skip-question-button').onclick = (event) => {
    const pick = undefined
    const bankName = event.target.getAttribute('data-bank')
    const testName = event.target.getAttribute('data-test')
    const questionType = event.target.getAttribute('data-type')
    const questionNumber = event.target.getAttribute('data-question')
    const subQuestionNumber = event.target.getAttribute('data-sub-question')
    const isAnswerCorrect = false
    // Get Correct Answer
    let correctAnswer
    if(questionType == 'long'){
        correctAnswer = banks[bankName][testName]['questions'][questionNumber]['questions'][subQuestionNumber]['correctAnswer']
    }else{
        correctAnswer = banks[bankName][testName]['questions'][questionNumber]['correctAnswer']
    }
    // Reset Timer
    clearInterval(timer)
    // Record Answer
    questionRecord[questionCounter] = {
        // Question Info
        isAnswerCorrect: isAnswerCorrect,
        questionCounter: questionCounter,
        questionType: questionType,
        bankName: bankName,
        testName: testName,
        questionNumber: questionNumber,
        subQuestionNumber: subQuestionNumber,
        correctAnswer: correctAnswer,
        answer: pick,
        duration: positiveTimer,
    }
    generateRandomQuestion()
}
export { startTest, questionRecord }