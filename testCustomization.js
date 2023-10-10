import './testCustomization.sass'
import { banksCollection, banksInfo } from './firebase.js'

const banks = banksCollection
let activeTestsList = {}
// add banks containers to the list
const banksOptionsContainer = document.querySelector('.test-options-banks-container')
for(const bankName in banksInfo){
    // register banks in the active list
    activeTestsList[bankName] = []
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
// full-bank-checkbox
document.querySelectorAll('.bank-check-name').forEach(elmnt =>{
    elmnt.onclick = (e) => {
        e.target.querySelector('.bank-check').classList.toggle('bank-checked')
        const bankName = e.target.getAttribute('data-value')
        const bankTestsArr = activeTestsList[bankName]
        // check if active list is empty
        // if empty: uncheck the bankContainer,
        //     else: check the bankContainer
        if(bankTestsArr.length == 0){
            for(const testName in banks[bankName]){
                if(banks[bankName].hasOwnProperty(testName)){
                    bankTestsArr.push(testName)
                }
            }
        }else{
            activeTestsList[bankName] = []
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
        for(let i = 1; i <= Object.keys(banks[bankName]).length; i++){
            document.querySelector('.test-check-container').innerHTML += `
            <div class="test-check" data-value-bank='${bankName}' data-value-test='test${i}'>
                <div class="test-name">${i}- ${banks[bankName][`test${i}`]["info"]["name"]}</div>
                <div class="test-checker"></div>
            </div>
            `
        }
        // checks already exsits tests in the activeTestsList
        for(const testNameIndex in activeTestsList[bankName]){
            if(activeTestsList[bankName].hasOwnProperty(testNameIndex)){
                const testName = activeTestsList[bankName][testNameIndex]
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
                let bankTestsArr = activeTestsList[bankName]
                if(!bankTestsArr.includes(testName)){
                    // Add
                    bankTestsArr.push(testName)
                }else {
                    // Remove
                    const itemIndex = bankTestsArr.indexOf(testName);
                    if (itemIndex > -1) { // only splice array when item is found
                        bankTestsArr.splice(itemIndex, 1); // 2nd parameter means remove one item only
                    }
                }
                // Toggle check-box
                e.target.querySelector('.test-checker').classList.toggle('test-checked')
                e.target.classList.toggle('test-check-checked')
            }
        })

        // ADD FEATURE LATER, ID: 0
        //
        //
        // check-all button event listener
        // document.querySelector('.test-check-all').onclick = () =>{
        //     if(activeTestsList[bankName].length == 0){
        //         for(const testName in banks[bankName]){
        //             const testCheckElmnt = document.querySelector(`.test-check[data-value-bank='${bankName}'][data-value-test='${testName}']`)
        //             activeTestsList[bankName].push(testName)
        //             if(!testCheckElmnt.classList.contains('test-check-checked')){
        //                 testCheckElmnt.classList.add('test-check-checked')
        //             }
        //             if(!testCheckElmnt.querySelector('.test-checker').classList.contains('test-checked')){
        //                 testCheckElmnt.querySelector('.test-checker').classList.add('test-checked')
        //             }
        //         }
        //     }else {
        //         activeTestsList[bankName] = []
        //         for(const testName in banks[bankName]){
        //             const testCheckElmnt = document.querySelector(`.test-check[data-value-bank='${bankName}'][data-value-test='${testName}']`)
        //             activeTestsList[bankName].push(testName)

        //             try{ testCheckElmnt.classList.remove('test-check-checked')} catch(e) {}
        //             try{ testCheckElmnt.querySelector('.test-checker').classList.remove('test-checked') } catch(e) {}
                    
        //             testCheckElmnt.classList.add('test-check-checked')
        //             testCheckElmnt.querySelector('.test-checker').classList.add('test-checked')
        //         }
        //     }
        // }
    }
})

// close bank customization tab
document.querySelector('.test-check-submit-button').onclick = ()=>{
    document.querySelector('.bank-customize-tab').classList.remove('bank-customize-tab-show')
    // check if there's still any tests activated in any bank
    // => if so, keep the bank checked
    for(const bankName in banksInfo){
        const bankCheckElmnt = document.querySelector(`.bank-check-name[data-value='${bankName}'] > .bank-check`)
        if(activeTestsList[bankName].length == 0){
            try{ bankCheckElmnt.classList.remove('bank-checked') }catch(e){}
        }else if(!activeTestsList[bankName].length == 0 && !bankCheckElmnt.classList.contains('bank-checked')){
            bankCheckElmnt.classList.add('bank-checked')
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