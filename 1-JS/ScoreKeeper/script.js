const scoreDisplay = document.querySelector('.scoreDisplay')
const selectWinner = document.querySelector('#selectWinner')
const buttons = document.querySelectorAll('.btnPlay')
const scorePlayerOne = document.querySelector('.scorePlayerOne')
const scorePlayerTwo = document.querySelector('.scorePlayerTwo')

let playerOne = 0
let playerTwo = 0

for (btn of buttons){
    btn.addEventListener('click',(e)=>{
        e.preventDefault()
        if(e.target.classList[1] === 'green'){
            playerOne +=1
            displaying(playerOne,playerTwo)
        }else if(e.target.classList[1] === 'blue'){
            playerTwo+=1
            displaying(playerOne,playerTwo)
        }else{
            resetScore()
            displaying(playerOne,playerTwo)
        }        
    })
}

const displaying = (One,Two) =>{
    if (One === Number(selectWinner.value) || Two === Number(selectWinner.value)){
        if(One === Number(selectWinner.value)){
            scorePlayerOne.classList.add('greenScore')
            scorePlayerTwo.classList.add('redScore')
            disabledButtons()
        }else{
            scorePlayerOne.classList.add('redScore')
            scorePlayerTwo.classList.add('greenScore')
            disabledButtons()
        }
    }
    scorePlayerOne.innerText = playerOne
    scorePlayerTwo.innerText = playerTwo
}

const disabledButtons = () => {
    buttons[0].disabled = true
    buttons[1].disabled = true
    buttons[0].classList.add('disabledBTN')
    buttons[1].classList.add('disabledBTN')
}


const resetScore = () =>{
    scorePlayerOne.classList.remove(scorePlayerOne.classList[1])
    scorePlayerTwo.classList.remove(scorePlayerTwo.classList[1])
    buttons[0].classList.remove(buttons[0].classList[2])
    buttons[1].classList.remove(buttons[1].classList[2])
    buttons[0].disabled = false
    buttons[1].disabled = false
    playerOne = 0
    playerTwo = 0
}
displaying(0,0)