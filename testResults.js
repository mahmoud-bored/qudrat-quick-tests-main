import './testResults.sass'
import { banksCollection, banksInfo } from './firebase.js'
import { questionRecord } from './examOperations.js'

const banks = banksCollection
const defaultTime = 30
const testResultsContainer = document.querySelector('.test-results-container')
const checkBodyElmnt = document.querySelector('.check-filter-body')
const crossBodyElmnt = document.querySelector('.cross-filter-body')
function end(){
    // Show Results Page
    testResultsContainer.style.display = 'flex'
    
    for(const question in questionRecord){
        if(questionRecord.hasOwnProperty(question)){
            const questionObj = questionRecord[question]
            const questionDurationColor = (questionObj.duration > defaultTime) ? 'red' : "green"
            let questionParagraph

            let questionHead
            let questionAnswers = {}
            // Get All question Info: paragraph, head, answers
            try{ questionParagraph = banks[questionObj.bankName][questionObj.testName]['questions'][questionObj.questionNumber]['questionParagraph'] } catch(e) { }
            if(questionObj.questionType == "long"){
                questionHead = banks[questionObj.bankName][questionObj.testName]['questions'][questionObj.questionNumber]['questions'][questionObj.subQuestionNumber]['question']
                for (let i = 0; i < 4; i++) {
                    const tempAnswerHolder = banks[questionObj.bankName][questionObj.testName]['questions'][questionObj.questionNumber]['questions'][questionObj.subQuestionNumber]['answers'][i]
                    if(tempAnswerHolder){ questionAnswers[i] = tempAnswerHolder } else { questionAnswers[i] = '' }
                }
            }else{
                questionHead = banks[questionObj.bankName][questionObj.testName]['questions'][questionObj.questionNumber]['question']
                for (let i = 0; i < 4; i++) {
                    const tempAnswerHolder = banks[questionObj.bankName][questionObj.testName]['questions'][questionObj.questionNumber]['answers'][i]
                    if(tempAnswerHolder){ questionAnswers[i] = tempAnswerHolder } else { questionAnswers[i] = '' }
                }
            }
            // Structure:
            // Result Container
            // == Result Header Container
            // == Result Body Container
            // ==== Result Question Container
            // ==== Result Choices Container


            // Create Result Container
            const resultContainer = document.createElement('div')
            resultContainer.setAttribute('class', 'result-answer-container')
                // Create Result Header Container
                const resultHeaderContainer = document.createElement('div')
                resultHeaderContainer.setAttribute('class', 'result-header-container')
                resultHeaderContainer.innerHTML = `
                    <p>${questionObj.questionCounter} -</p>
                    <span class="result-end-time" style="color:${questionDurationColor}">${questionObj.duration}s</span>
                `
                resultContainer.appendChild(resultHeaderContainer)
                // Create Result Body Container
                const resultBodyContainer = document.createElement('div')
                resultBodyContainer.setAttribute('class', "result-body-container")
                    // Create Result Question Container
                    const resultQuestionContainer = document.createElement('div')
                    resultQuestionContainer.setAttribute('class', "result-body-question-container")
                        // Inject Paragraph if it exsists
                    if(questionObj.questionType == "long"){
                        resultQuestionContainer.innerHTML = `<p class="question-paragraph">${questionParagraph}</p> <hr>`
                    }
                        // Inject Question and Answers
                    resultQuestionContainer.innerHTML += `
                        <p class="question-head">${questionHead}</p>
                        <div class="question-answers-container">
                            <p class="question-answer question-answer-1">أ- <span>${questionAnswers[0]}</span></p>
                            <p class="question-answer question-answer-2">ب- <span>${questionAnswers[1]}</span></p>
                        </div>
            
                        <div class="question-answers-container">
                            <p class="question-answer question-answer-3">ج- <span>${questionAnswers[2]}</span></p>
                            <p class="question-answer question-answer-4">د- <span>${questionAnswers[3]}</span></p>
                        </div>
                    `
                    resultBodyContainer.appendChild(resultQuestionContainer)
                    // Create Result Choices Container
                    const resultChoicesContainer = document.createElement('div')
                    resultChoicesContainer.setAttribute('class', 'result-choice-container')
                    // THERE'S GOTTA BE A BETTER WAY OF DOING THIS, I MEAN... COM'N
                        // Normal result Choice
                    const resultChoicesElmntsObj = {
                        0: `<div class="result-choice">أ</div>`,
                        1: `<div class="result-choice">ب</div>`,
                        2: `<div class="result-choice">ج</div>`,
                        3: `<div class="result-choice">د</div>`,
                    }
                        // Correct result Choice
                    const resultChoicesCorrectElmntsObj = {
                        0: `<div class="result-choice" style="background-color: #52d81d">أ</div>`,
                        1: `<div class="result-choice" style="background-color: #52d81d">ب</div>`,
                        2: `<div class="result-choice" style="background-color: #52d81d">ج</div>`,
                        3: `<div class="result-choice" style="background-color: #52d81d">د</div>`,
                    }
                        // Wrong result Choice
                    const resultChoicesWrongElmntsObj = {
                        0: `<div class="result-choice" style="background-color: #f74354">أ</div>`,
                        1: `<div class="result-choice" style="background-color: #f74354">ب</div>`,
                        2: `<div class="result-choice" style="background-color: #f74354">ج</div>`,
                        3: `<div class="result-choice" style="background-color: #f74354">د</div>`,
                    }
                        // Inject Colored result Choices to the container
                    for (let i = 0; i < 4; i++) {
                        if(questionAnswers[i] == questionObj.correctAnswer){
                            resultChoicesContainer.innerHTML += resultChoicesCorrectElmntsObj[i]
                        }else if(questionAnswers[i] == questionObj.answer){
                            resultChoicesContainer.innerHTML += resultChoicesWrongElmntsObj[i]
                        }else{
                            resultChoicesContainer.innerHTML += resultChoicesElmntsObj[i]
                        }
                        
                    }

                    resultBodyContainer.appendChild(resultChoicesContainer)
                resultContainer.appendChild(resultBodyContainer)


                // Color out Correct and Wrong Choices
                // document.querySelectorAll('.result-choice').forEach((elmnt)=>{
                //     const choiceAnswer = elmnt.getAttribute('data-value')
                //     console.log(choiceAnswer, questionObj.answer, questionObj.correctAnswer)
                //     if(choiceAnswer == questionObj.answer){ elmnt.style.backgroundColor = '#f74354'; console.log('wrong') }
                //     else if(choiceAnswer == questionObj.correctAnswer){ elmnt.style.backgroundColor = '#52d81d'; ; console.log('correct') }
                // })


                
            // Inject question into its page
            if(questionObj.isAnswerCorrect){
                checkBodyElmnt.appendChild(resultContainer)
            }else{
                crossBodyElmnt.appendChild(resultContainer)
            }
            // Show and hide Question details
            document.querySelectorAll('.result-header-container').forEach(elmnt =>{
                elmnt.onclick = toggleAnswer
            })
        }
    }

}




const checkFilterHeaderContainer = document.querySelector('.check-filter-header-container')
const crossFilterHeaderContainer = document.querySelector('.cross-filter-header-container')

function showFilterBody(event) {
    let filter = event.target.getAttribute('data-value')
    checkBodyElmnt.classList.toggle('filter-body-hide')
    crossBodyElmnt.classList.toggle('filter-body-hide')
    checkFilterHeaderContainer.classList.toggle('filter-header-container-disabled')
    crossFilterHeaderContainer.classList.toggle('filter-header-container-disabled')

}
document.querySelectorAll('.filter-header').forEach((elmnt) => { elmnt.onclick = showFilterBody })

function toggleAnswer(event) {
    const elmnt = event.target.nextSibling
    console.log(elmnt)
    if(!elmnt.classList.contains('result-answer-container-open')){
        elmnt.classList.toggle('result-answer-container-show')
        setTimeout(()=>{ elmnt.classList.toggle('result-answer-container-open') }, 50)
    }else{
        elmnt.classList.toggle('result-answer-container-open')
        setTimeout(()=>{ elmnt.classList.toggle('result-answer-container-show') }, 200)
    }
}
function reloadPage(){
    location.reload()
}
export { end }