// TEST PASS
document.querySelectorAll('.bzfPab.wFGF8').forEach(elmnt=>{
    elmnt.click()
})










// SHORT ANSWERS SCRABBER
i = -1
mainObj = {
    test1:{
    
    }
}
document.querySelectorAll('.Qr7Oae > .OxAavc').forEach(elmntsContainer => {
    if(!elmntsContainer.previousElementSibling?.querySelector('.SajZGc.w0W4bd.tT7zXd.RVEQke') && !elmntsContainer.querySelector('.Eg06Ee > .hfh9V > .ujnDW > .docssharedWizToggleLabeledContainer.rnFeqc.LygNqb.N2RpBe.RDPZE > .bzfPab.wFGF8 > .uVccjd.aiSeRd.FXLARc.wGQFbe.BJHAP.NCCCpb.oLlshd.N2RpBe.RDPZE')){
    
        // Get Question Header
        let isQuestion = elmntsContainer.querySelectorAll('.pYfr3c > .prOLdf > .g53bl > .cTDvob.D1wxyf.RjsPE > span > p')
        if (isQuestion) {
            i++
            mainObj.test1[`${i}`] = {}
            isQuestion.forEach(elmnt=>{
                if(elmnt.textContent){
                    mainObj.test1[`${i}`]['question'] = elmnt.textContent.trim().replace(/(\r\n|\n|\r)/gm, '')
                }
            })
        }
        // Get Question Answers
        let j = 0
        mainObj.test1[`${i}`]['answers'] = {}
        elmntsContainer.querySelectorAll('div > .lLfZXe.fnxRtf.cNDBpf > .H2Gmcc.tyNBNd > .gEPCre.D5c69b > .yUJIWb').forEach(elmntAnswer=>{
            mainObj.test1[`${i}`]['answers'][`${j}`] = elmntAnswer.querySelector('.docssharedWizToggleLabeledContainer > .bzfPab.wFGF8 > .YEVVod > .ulDsOb > .aDTYNe.snByac.kTYmRb.OIC90c').textContent.trim().replace(/(\r\n|\n|\r)/gm, '')
            j++
        })
        // Get Question Right Answer
        if(elmntsContainer.querySelector('.pYfr3c').classList.contains('LRmqmf')){
            mainObj.test1[`${i}`]['rightAnswer'] = elmntsContainer.querySelector('div > .lLfZXe.fnxRtf.cNDBpf > .H2Gmcc.tyNBNd > .gEPCre.D5c69b > .yUJIWb > .docssharedWizToggleLabeledContainer.O4MBef.LygNqb.N2RpBe.A1MUVb.tXA2Db.RDPZE > .bzfPab.wFGF8 > .YEVVod > .ulDsOb > .aDTYNe.snByac.kTYmRb.OIC90c').textContent.trim().replace(/(\r\n|\n|\r)/gm, '')
        
        }else if(elmntsContainer.querySelector('.D42QGf > .muwQbd > .fiH1oe > .docssharedWizToggleLabeledContainer > .bzfPab.wFGF8 > .YEVVod > .ulDsOb > .aDTYNe.snByac.kTYmRb.OIC90c')){
            mainObj.test1[`${i}`]['rightAnswer'] = elmntsContainer.querySelector('.D42QGf > .muwQbd > .fiH1oe > .docssharedWizToggleLabeledContainer > .bzfPab.wFGF8 > .YEVVod > .ulDsOb > .aDTYNe.snByac.kTYmRb.OIC90c').textContent.trim().replace(/(\r\n|\n|\r)/gm, '')
        }
    }
})
console.log(JSON.stringify(mainObj, null, 2))












// SHORT ANSWERS SCRABBER للمفردة الشاذة
i = -1
mainObj = {
    test1:{
    
    }
}
document.querySelectorAll('.Qr7Oae > .OxAavc').forEach(elmntsContainer => {
    if(!elmntsContainer.previousElementSibling?.querySelector('.SajZGc.w0W4bd.tT7zXd.RVEQke') && !elmntsContainer.querySelector('.Eg06Ee > .hfh9V > .ujnDW > .docssharedWizToggleLabeledContainer.rnFeqc.LygNqb.N2RpBe.RDPZE > .bzfPab.wFGF8 > .uVccjd.aiSeRd.FXLARc.wGQFbe.BJHAP.NCCCpb.oLlshd.N2RpBe.RDPZE')){
    
        // Get Question Header
        let isQuestion = elmntsContainer.querySelectorAll('.pYfr3c > .prOLdf > .g53bl > .cTDvob.D1wxyf.RjsPE > span:nth-child(1)')
        if (isQuestion) {
            i++
            mainObj.test1[`${i}`] = {}
            isQuestion.forEach(elmnt=>{
                if(elmnt.textContent){
                    mainObj.test1[`${i}`]['question'] = elmnt.textContent.trim().replace(/(\r\n|\n|\r)/gm, '')
                }
            })
        }
        // Get Question Answers
        let j = 0
        mainObj.test1[`${i}`]['answers'] = {}
        elmntsContainer.querySelectorAll('div > .lLfZXe.fnxRtf.cNDBpf > .H2Gmcc.tyNBNd > .gEPCre.D5c69b > .yUJIWb').forEach(elmntAnswer=>{
            mainObj.test1[`${i}`]['answers'][`${j}`] = elmntAnswer.querySelector('.docssharedWizToggleLabeledContainer > .bzfPab.wFGF8 > .YEVVod > .ulDsOb > .aDTYNe.snByac.kTYmRb.OIC90c').textContent.trim().replace(/(\r\n|\n|\r)/gm, '')
            j++
        })
        // Get Question Right Answer
        if(elmntsContainer.querySelector('.pYfr3c').classList.contains('LRmqmf')){
            mainObj.test1[`${i}`]['rightAnswer'] = elmntsContainer.querySelector('div > .lLfZXe.fnxRtf.cNDBpf > .H2Gmcc.tyNBNd > .gEPCre.D5c69b > .yUJIWb > .docssharedWizToggleLabeledContainer.O4MBef.LygNqb.N2RpBe.A1MUVb.tXA2Db.RDPZE > .bzfPab.wFGF8 > .YEVVod > .ulDsOb > .aDTYNe.snByac.kTYmRb.OIC90c').textContent.trim().replace(/(\r\n|\n|\r)/gm, '')
        
        }else if(elmntsContainer.querySelector('.D42QGf > .muwQbd > .fiH1oe > .docssharedWizToggleLabeledContainer > .bzfPab.wFGF8 > .YEVVod > .ulDsOb > .aDTYNe.snByac.kTYmRb.OIC90c')){
            mainObj.test1[`${i}`]['rightAnswer'] = elmntsContainer.querySelector('.D42QGf > .muwQbd > .fiH1oe > .docssharedWizToggleLabeledContainer > .bzfPab.wFGF8 > .YEVVod > .ulDsOb > .aDTYNe.snByac.kTYmRb.OIC90c').textContent.trim().replace(/(\r\n|\n|\r)/gm, '')
        }
    }
})
console.log(JSON.stringify(mainObj, null, 2))












// ANSWERS WITH PARAGRAPH SCRABBER 
i = -1
mainObj = {
    test1:{
    
    }
}
document.querySelectorAll('.Qr7Oae > .OxAavc').forEach(elmntsContainer => {
    console.log(elmntsContainer)
    if(!elmntsContainer.previousElementSibling?.querySelector('.SajZGc.w0W4bd.tT7zXd.RVEQke') && !elmntsContainer.querySelector('.Eg06Ee > .hfh9V > .ujnDW > .docssharedWizToggleLabeledContainer.rnFeqc.LygNqb.N2RpBe.RDPZE > .bzfPab.wFGF8 > .uVccjd.aiSeRd.FXLARc.wGQFbe.BJHAP.NCCCpb.oLlshd.N2RpBe.RDPZE')){
        // Get Question Paragraph
        if(elmntsContainer.classList.contains('NVbRL')){
            i++
            k = 0
            mainObj.test1[`${i}`] = {}
            mainObj.test1[`${i}`]['questionType'] = "long"
            let fullParagraphStr = ''
            if(elmntsContainer.querySelector('.pYfr3c > .prOLdf > .g53bl > .cTDvob.D1wxyf.RjsPE > .M7eMe > p') && elmntsContainer.querySelectorAll('.pYfr3c > .prOLdf > .g53bl > .cTDvob.D1wxyf.RjsPE > .M7eMe > span')){
                let paragraphTexts = elmntsContainer.querySelector('.pYfr3c > .prOLdf > .g53bl > .cTDvob.D1wxyf.RjsPE > .M7eMe').children
                for(let i = 0; i < paragraphTexts.length; i++){
                    if(paragraphTexts[i].textContent){
                        fullParagraphStr += ` ${paragraphTexts[i].textContent.trim().replace(/(\r\n|\n|\r)/gm, '')}`
                    }else{
                        fullParagraphStr += ` ${paragraphTexts[i].innerText.trim().replace(/(\r\n|\n|\r)/gm, '')}`
                    }
                    
                }
            }
            else if(elmntsContainer.querySelector('.pYfr3c > .prOLdf > .g53bl > .cTDvob.D1wxyf.RjsPE > .M7eMe > p')){
                elmntsContainer.querySelectorAll('.pYfr3c > .prOLdf > .g53bl > .cTDvob.D1wxyf.RjsPE > .M7eMe > p').forEach(elmnt=>{
                    fullParagraphStr += ` ${elmnt.textContent.trim().replace(/(\r\n|\n|\r)/gm, '')}`
                })
            }else{
                elmntsContainer.querySelectorAll('.pYfr3c > .prOLdf > .g53bl > .cTDvob.D1wxyf.RjsPE > .M7eMe > span').forEach(elmnt=>{
                    fullParagraphStr += ` ${elmnt.textContent.trim().replace(/(\r\n|\n|\r)/gm, '')}`
                })
            }
            mainObj.test1[`${i}`]['questionParagraph'] = fullParagraphStr
            mainObj.test1[`${i}`]['questions'] = {}
        }else{
            mainObj.test1[`${i}`]['questions'][`${k}`] = {}
            // Get Question Header
            let isQuestion
            if(elmntsContainer.querySelector('.pYfr3c > .prOLdf > .g53bl > .cTDvob.D1wxyf.RjsPE > span > p')){
                isQuestion = elmntsContainer.querySelectorAll('.pYfr3c > .prOLdf > .g53bl > .cTDvob.D1wxyf.RjsPE > span > p')
            }else {
                isQuestion = elmntsContainer.querySelectorAll('.pYfr3c > .prOLdf > .g53bl > .cTDvob.D1wxyf.RjsPE > span > span')
            }
            if (isQuestion) {
                let fullQuestionStr = ''
                isQuestion.forEach(elmnt=>{
                    if(elmnt.textContent){
                        fullQuestionStr += ` ${elmnt.textContent.trim().replace(/(\r\n|\n|\r)/gm, ' ')}`
                    }
                })
                mainObj.test1[`${i}`]['questions'][`${k}`]['question'] = fullQuestionStr
            }
            // Get Question Answers
            let j = 0
            mainObj.test1[`${i}`]['questions'][`${k}`]['answers'] = {}
            elmntsContainer.querySelectorAll('div > .lLfZXe.fnxRtf.cNDBpf > .H2Gmcc.tyNBNd > .gEPCre.D5c69b > .yUJIWb').forEach(elmntAnswer=>{
                mainObj.test1[`${i}`]['questions'][`${k}`]['answers'][`${j}`] = elmntAnswer.querySelector('.docssharedWizToggleLabeledContainer > .bzfPab.wFGF8 > .YEVVod > .ulDsOb > .aDTYNe.snByac.kTYmRb.OIC90c').textContent.trim().replace(/(\r\n|\n|\r)/gm, '')
                j++
            })
            // Get Question Right Answer
            if(elmntsContainer.querySelector('.pYfr3c').classList.contains('LRmqmf')){
                mainObj.test1[`${i}`]['questions'][`${k}`]['rightAnswer'] = elmntsContainer.querySelector('div > .lLfZXe.fnxRtf.cNDBpf > .H2Gmcc.tyNBNd > .gEPCre.D5c69b > .yUJIWb > .docssharedWizToggleLabeledContainer.O4MBef.LygNqb.N2RpBe.A1MUVb.tXA2Db.RDPZE > .bzfPab.wFGF8 > .YEVVod > .ulDsOb > .aDTYNe.snByac.kTYmRb.OIC90c').textContent.trim().replace(/(\r\n|\n|\r)/gm, '')
            
            }else if(elmntsContainer.querySelector('.D42QGf > .muwQbd > .fiH1oe > .docssharedWizToggleLabeledContainer > .bzfPab.wFGF8 > .YEVVod > .ulDsOb > .aDTYNe.snByac.kTYmRb.OIC90c')){
                mainObj.test1[`${i}`]['questions'][`${k}`]['rightAnswer'] = elmntsContainer.querySelector('.D42QGf > .muwQbd > .fiH1oe > .docssharedWizToggleLabeledContainer > .bzfPab.wFGF8 > .YEVVod > .ulDsOb > .aDTYNe.snByac.kTYmRb.OIC90c').textContent.trim().replace(/(\r\n|\n|\r)/gm, '')
            }
            k++
        }

    }
})
console.log(JSON.stringify(mainObj, null, 2))







// Answers With Paragraph Scrabber V2
console.log('=========================================================================================================================')
i = -1
mainObj = {
    test1:{
      info:{
        name: document.querySelector('.LgNcQe, .LgNcQe .Wic03c .tL9Q4c, .LgNcQe .I9OJHe .KRoqRc, .LgNcQe .PyrB4, .LgNcQe .snByac').textContent
      },
      questions: {
        
      }
    }
}
document.querySelectorAll('.Qr7Oae > .OxAavc').forEach(elmntsContainer => {
    if(!elmntsContainer.previousElementSibling?.querySelector('.SajZGc.w0W4bd.tT7zXd.RVEQke') && !elmntsContainer.querySelector('.Eg06Ee > .hfh9V > .ujnDW > .docssharedWizToggleLabeledContainer.rnFeqc.LygNqb.N2RpBe.RDPZE > .bzfPab.wFGF8 > .uVccjd.aiSeRd.FXLARc.wGQFbe.BJHAP.NCCCpb.oLlshd.N2RpBe.RDPZE')){
        // Get Question Paragraph
        if(elmntsContainer.classList.contains('NVbRL')){
            i++
            k = 0
            mainObj.test1['questions'][`${i}`] = {}
            mainObj.test1['questions'][`${i}`]['questionType'] = "long"
            let fullParagraphStr
            if(elmntsContainer.querySelector('.pYfr3c > .prOLdf > .g53bl > .cTDvob.D1wxyf.RjsPE > .M7eMe ')){
                fullParagraphStr = elmntsContainer.querySelector('.pYfr3c > .prOLdf > .g53bl > .cTDvob.D1wxyf.RjsPE > .M7eMe').innerHTML
            }

            mainObj.test1['questions'][`${i}`]['questionParagraph'] = fullParagraphStr
            mainObj.test1['questions'][`${i}`]['questions'] = {}
        }else{
            mainObj.test1['questions'][`${i}`]['questions'][`${k}`] = {}
            // Get Question Header
          	let fullQuestionStr = ''
            let isQuestion = elmntsContainer.querySelector('.pYfr3c > .prOLdf > .g53bl > .cTDvob.D1wxyf.RjsPE > span:nth-child(1)')
            if(isQuestion){	
								fullQuestionStr = elmntsContainer.querySelector('.pYfr3c > .prOLdf > .g53bl > .cTDvob.D1wxyf.RjsPE > span').innerHTML
              	mainObj.test1['questions'][`${i}`]['questions'][`${k}`]['question'] = fullQuestionStr

            }

            // Get Question Answers
            let j = 0
            mainObj.test1['questions'][`${i}`]['questions'][`${k}`]['answers'] = {}
            elmntsContainer.querySelectorAll('div > .lLfZXe.fnxRtf.cNDBpf > .H2Gmcc.tyNBNd > .gEPCre.D5c69b > .yUJIWb').forEach(elmntAnswer=>{
                mainObj.test1['questions'][`${i}`]['questions'][`${k}`]['answers'][`${j}`] = elmntAnswer.querySelector('.docssharedWizToggleLabeledContainer > .bzfPab.wFGF8 > .YEVVod > .ulDsOb > .aDTYNe.snByac.kTYmRb.OIC90c').innerHTML
                j++
            })
            // Get Question Right Answer
            if(elmntsContainer.querySelector('.pYfr3c').classList.contains('LRmqmf')){
                mainObj.test1['questions'][`${i}`]['questions'][`${k}`]['rightAnswer'] = elmntsContainer.querySelector('div > .lLfZXe.fnxRtf.cNDBpf > .H2Gmcc.tyNBNd > .gEPCre.D5c69b > .yUJIWb > .docssharedWizToggleLabeledContainer.O4MBef.LygNqb.N2RpBe.A1MUVb.tXA2Db.RDPZE > .bzfPab.wFGF8 > .YEVVod > .ulDsOb > .aDTYNe.snByac.kTYmRb.OIC90c').innerHTML
            
            }else if(elmntsContainer.querySelector('.D42QGf > .muwQbd > .fiH1oe > .docssharedWizToggleLabeledContainer > .bzfPab.wFGF8 > .YEVVod > .ulDsOb > .aDTYNe.snByac.kTYmRb.OIC90c')){
                mainObj.test1['questions'][`${i}`]['questions'][`${k}`]['rightAnswer'] = elmntsContainer.querySelector('.D42QGf > .muwQbd > .fiH1oe > .docssharedWizToggleLabeledContainer > .bzfPab.wFGF8 > .YEVVod > .ulDsOb > .aDTYNe.snByac.kTYmRb.OIC90c').innerHTML
            }
            k++
        }

    }
})
console.log(JSON.stringify(mainObj, null, 2) + ',')
