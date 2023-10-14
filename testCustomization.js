import './testCustomization.sass'
import { banksCollection, banksInfo } from './firebase.js'

Object.prototype.length = function(){
    return Object.keys(this).length
}

const banks = banksCollection
let activeTestsList = {}
// add banks containers to the list
const banksOptionsContainer = document.querySelector('.test-options-banks-container')
for(const bankName in banksInfo){
    if(banksInfo.hasOwnProperty(bankName)){
        // remove the loading animation
        document.querySelector('.ring').classList.add('hide')
        // register banks in the active list
        activeTestsList[bankName] = {}
        // add banks containers
        banksOptionsContainer.innerHTML += `
        <div class="bank-container">
            <div class="bank-check-name" data-value='${bankName}'>
                <div class="bank-check"></div>
                <div class="bank-name">${banksInfo[bankName].name}</div>
            </div>
            <div class="bank-customize" data-value='${bankName}'>تخصيص</div>

        </div>
        `
    }
}
// full-bank-checkbox
document.querySelectorAll('.bank-check-name').forEach(elmnt =>{
    elmnt.onclick = (e) => {
        e.target.querySelector('.bank-check').classList.toggle('bank-checked')
        const bankName = e.target.getAttribute('data-value')
        const bankTestsObj = activeTestsList[bankName]
        // check if active list is empty
        // if empty: uncheck the bankContainer,
        //     else: check the bankContainer
        if(bankTestsObj.length() == 0){
            for(const testName in banks[bankName]){
                if(banks[bankName].hasOwnProperty(testName)){
                    activeTestsList[bankName][testName] = {
                        info:{
                            name: banks[bankName][testName]['info']['name']
                        },
                        questions: {}
                    }
                }
            }
        }else{
            activeTestsList[bankName] = {}
        }
    }
})
// Activate the First bank
document.querySelectorAll('.bank-check-name').forEach(elmnt =>{
    if(elmnt.getAttribute('data-value') == banksInfo[Object.keys(banksInfo)[0]]['id']){
        elmnt.click()
    }
})

// Customize bank questions Tab Functions
document.querySelectorAll('.bank-customize').forEach(elmnt => {
    elmnt.onclick = function(event){
        const bankName = event.target.getAttribute('data-value')
        // Clean the customization tab
        document.querySelector('.test-check-container').innerHTML = ''
        // Open Customization tab
        document.querySelector('.bank-customize-tab').classList.add('bank-customize-tab-show')

        // Add tests to the customize tab
        for(let i = 1; i <= banks[bankName].length(); i++){
            document.querySelector('.test-check-container').innerHTML += `
            <div class="test-check" data-value-bank='${bankName}' data-value-test='test${i}'>
                <div class="test-name">${i}- ${banks[bankName][`test${i}`]["info"]["name"]}</div>
                <div class="test-checker"></div>
            </div>
            `
        }
        // checks already exsits tests in the activeTestsList
        for(const testName in activeTestsList[bankName]){
            if(activeTestsList[bankName].hasOwnProperty(testName)){
                document.querySelector(`.test-check[data-value-bank='${bankName}'][data-value-test='${testName}']`).classList.add('test-check-checked')
                document.querySelector(`.test-check[data-value-bank='${bankName}'][data-value-test='${testName}'] > .test-checker`).classList.add('test-checked')
            }
        }
        // test-checkers listeners
        document.querySelectorAll('.test-check').forEach(elmnt => {
            elmnt.onclick = (e) => {
                // Add or Remove Checked boxes
                const bankName = e.target.getAttribute('data-value-bank')
                const testName = e.target.getAttribute('data-value-test')
                let bankTestsObj = activeTestsList[bankName]
                if(!bankTestsObj.hasOwnProperty(testName)){
                    // Add
                    activeTestsList[bankName][testName] = {
                        info:{
                            name: banks[bankName][testName]['info']['name'] 
                        },
                        questions:{}
                    }
                }else {
                    // Remove
                    // delete test from object
                    delete bankTestsObj[testName]
                }
                // Toggle check-box
                e.target.querySelector('.test-checker').classList.toggle('test-checked')
                e.target.classList.toggle('test-check-checked')
            }
        })
    }
})

// close bank customization tab
document.querySelector('.test-check-submit-button').onclick = ()=>{
    document.querySelector('.bank-customize-tab').classList.remove('bank-customize-tab-show')
    // check if there's still any tests activated in any bank
    // => if so, keep the bank checked
    for(const bankName in banksInfo){
        if(banksInfo.hasOwnProperty(bankName)){
            const bankCheckElmnt = document.querySelector(`.bank-check-name[data-value='${bankName}'] > .bank-check`)
            if(activeTestsList[bankName].length() == 0){
                try{ bankCheckElmnt.classList.remove('bank-checked') } catch(e) { }
            }else if(!activeTestsList[bankName].length() == 0 && !bankCheckElmnt.classList.contains('bank-checked')){
                bankCheckElmnt.classList.add('bank-checked')
            }
        }
    }
}
// Set Actions for questionsCount elmnts
document.querySelectorAll('.questions-count').forEach(elmnt => {
    elmnt.onclick = (e)=>{
        const buttonNumberVal = e.target.getAttribute('data-value')
        document.querySelector('.questions-count-input').value = buttonNumberVal
    }
})

// checkbox functions for "Don't repeat questions" elmnt 
let repeatQuestions = false
document.querySelector('.questions-repeat-check').onclick = (e)=>{
    repeatQuestions = !repeatQuestions
    e.target.querySelector('.questions-repeat-checkbox').classList.toggle('questions-repeat-checkbox-checked')
}
export { activeTestsList, repeatQuestions }