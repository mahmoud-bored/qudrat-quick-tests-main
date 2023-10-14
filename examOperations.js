import './examOperations.sass'
import { banksCollection } from "./firebase";
import { activeTestsList, repeatQuestions } from './testCustomization'
import { end } from './testResults.js'

const banks = banksCollection
let questionRecord = {}

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
// Get and Update test questions amount
let testQuestionsAmount = testQuestionsAmountInput.value
testQuestionsAmountInput.onchange = ()=>{testQuestionsAmount = testQuestionsAmountInput.value}

function startTest() {
    // Clean up empty active banks
    for(const bank in activeTestsList){
        if(activeTestsList.hasOwnProperty(bank)){
            if(activeTestsList[bank].length() == 0){
                delete activeTestsList[bank]
            }
        }
    }
    // Add Questions to Active Bank Tests
    for(const bank in activeTestsList){
        if(activeTestsList.hasOwnProperty(bank)){
            for(const test in activeTestsList[bank]){
                if(activeTestsList[bank].hasOwnProperty(test)){
                    for(const question in banks[bank][test]['questions']){
                        if(banks[bank][test]['questions'].hasOwnProperty(question)){
                            activeTestsList[bank][test]['questions'][question] = banks[bank][test]['questions'][question]
                        }
                    }
                }
            }
        }
    }
    // Calculate Max allowed questions
    let testQuestionsMaxAmount = 0
    // Loop through Banks in activeTestsList
    for(const bank in activeTestsList){
        if(activeTestsList.hasOwnProperty(bank)){
            // Loop through tests in activeTestsList banks
            for (const test in activeTestsList[bank]) {
                if(activeTestsList[bank].hasOwnProperty(test)){
                    // Loop through questions in activeTestsList Banks's Tests
                    for(const question in activeTestsList[bank][test]['questions']){
                        if(activeTestsList[bank][test]['questions'].hasOwnProperty(question)){
                            // Check if it's a long or short question and fetch the long question's length, short questions are only counted as one
                            if(activeTestsList[bank][test]['questions'][question]['questionType'] == 'long'){
                                testQuestionsMaxAmount += activeTestsList[bank][test]['questions'][question]['questions'].length()
                            }else {
                                testQuestionsMaxAmount++
                            }

                        }
                    }
                }
            }
        }
    }
    // Set questions count to the max allowed number if it was higher than that
    if(!repeatQuestions && testQuestionsAmount > testQuestionsMaxAmount){
        testQuestionsAmount = testQuestionsMaxAmount
    }
    // Set Total Questions Counter
    totalQuestionsCounterElmnt.textContent = testQuestionsAmount

    // Hide Test Options and Start the Exam
    testOptionsContainer.style.display = 'none'
    generateRandomQuestion()
}

let firstLoad = true
let questionLocation = {}
let maxRepetitions
let subQuestionsCounter = undefined
let questionCounter = 0
function generateRandomQuestion() {
    function generate(){
        function randomize(){
            const randomBank = activeTestsList.random()
            const randomTest = activeTestsList[randomBank].random()
            const randomQuestionNumber = activeTestsList[randomBank][randomTest]['questions'].random()
            questionLocation = {
                bankName: randomBank,
                testName: randomTest,
                questionNumber: randomQuestionNumber,
            }
        }
        questionCounter++
        // Refresh Question Counter
        currentQuestionsCounterElmnt.textContent = questionCounter
        // Turn Counter to Red When its being Held OverCounter
        if(questionCounter > testQuestionsAmount){ currentQuestionsCounterElmnt.style.color = '#ba1818' }
        // Check if there's any Pending Long questions
        if(subQuestionsCounter == undefined){ randomize() }
        // Inject Question Location and Start Timer
        fetchQuestion(questionLocation)
        startTimer(30)
    }


    // Check if Exam Ended
    if(questionCounter <= testQuestionsAmount){
        // Load Instantly if its the first question in the exam
        if(firstLoad){
            firstLoad = false
            queue = false
            return generate()
        }else{
            setTimeout(() => {
                queue = false
                return generate()
            }, 450);
        }
    }else{
        if(longQuestionInProgress){
            setTimeout(() => {
                return generate()
            }, 450);
        }else{
            // End Exam
            return end()
        }
    }
}

let longQuestionInProgress = false
function fetchQuestion(questionLocationObj){
    const bankName = questionLocationObj['bankName']
    const testName = questionLocationObj['testName']
    const questionNumber = questionLocationObj['questionNumber']
    const questionType = activeTestsList[bankName][testName]['questions'][questionNumber]['questionType']
    questionLocationObj.questionType = questionType
    
    // Check if there's any Pending Long questions
    // if Yes, inject the sub question number
    if(subQuestionsCounter != undefined){
        questionLocationObj.subQuestionNumber = subQuestionsCounter
        // Cancel the subQuestionsCounter when the Long questions ends
        if(!(subQuestionsCounter < (maxRepetitions - 1))){
            subQuestionsCounter = undefined
            longQuestionInProgress = false
        }
    }else{
        // if New question is 'long' set the maxRepetitions and start the subQuestionsCounter
        if(questionType == "long"){
            maxRepetitions = banks[bankName][testName]['questions'][questionNumber]['questions'].length()
            subQuestionsCounter = 0
            questionLocationObj.subQuestionNumber = subQuestionsCounter
            // Hold Exam End untill long question ends
            longQuestionInProgress = true
        }
    }

    injectQuestion(questionLocationObj)
    if(!subQuestionsCounter < maxRepetitions){
        // Prevent from Adding to an undefined variable
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
        questionParagraphElmnt.innerHTML = activeTestsList[bankName][testName]['questions'][questionNumber]['questionParagraph']
        
        // Get Question and Answers Locations (Long)
        question = activeTestsList[bankName][testName]['questions'][questionNumber]['questions'][subQuestionNumber]['question']
        answers = activeTestsList[bankName][testName]['questions'][questionNumber]['questions'][subQuestionNumber]['answers']
    }else{
        // Inject Paragraph Lock Img
        questionParagraphElmnt.innerHTML = '<div class="question-paragraph-img-container"><img src="./imgs/lock.png"></div>'
        
        // Get Question and Answers Locations (Normal)
        question = activeTestsList[bankName][testName]['questions'][questionNumber]['question']
        answers = activeTestsList[bankName][testName]['questions'][questionNumber]['answers']
    }
    // Inject Questions
    for (let i = 0; i < 4; i++) {
        if(answers[i]){
            document.querySelector(`.question-answer-${i + 1} > span`).innerHTML = answers[i]
        }else{
            document.querySelector(`.question-answer-${i + 1} > span`).innerHTML = " "
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
const timerElmntContainer = document.querySelector('.timer')
let timer
let positiveTimer = 0

// We're removing the timer Elmnt because if you reset the timer to 30 it will activate the animation class
//   on css and its gonna take time to reset back to the original color, 
//   but if you remove it from the DOM and add it again you won't have that problem
function startTimer(duration){
    // Remove Timer Elmnt from the DOM
    timerElmntContainer.innerHTML = '<img src="./imgs/Personal-Logo-1.png">'
    // Create New Timer Elmnt
    const newTimerElmnt = document.createElement('p')
    timerElmntContainer.appendChild(newTimerElmnt)
    // Injecting Time
    let time = duration
    positiveTimer = 0
    newTimerElmnt.textContent = time
    timer = setInterval(()=>{
        // Set Timer Color
        if(time >= 20){
            newTimerElmnt.style.color = 'rgb(23, 130, 25)'
        }else if(time >= 10){
            newTimerElmnt.style.color = 'rgb(240, 171, 8)'
        }else if(time < 10){
            newTimerElmnt.style.color = 'rgb(238, 28, 18)'
        }
        time--
        positiveTimer++
        // Stop Timer when it hits 0
        if(time < 0){
            newTimerElmnt.textContent = '0'
        }else{
            newTimerElmnt.textContent = time
        }
    }, 1000)
}

function preventRepeat(questionLocation){
    if(!repeatQuestions && (subQuestionsCounter == undefined)){
        delete activeTestsList[questionLocation.bankName][questionLocation.testName]['questions'][questionLocation.questionNumber]
    }
}


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
        preventRepeat(questionLocation)
        generateRandomQuestion()
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
    preventRepeat(questionLocation)
    generateRandomQuestion()
}
export { startTest, questionRecord }