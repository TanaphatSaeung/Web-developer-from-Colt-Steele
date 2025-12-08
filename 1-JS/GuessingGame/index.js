
let maximum = parseInt(prompt("Enter maximum number! "))
while(!maximum){
    maximum = parseInt(prompt("Please Enter valid number! "))
}

const maxNum = Math.floor(Math.random() * maximum) + 1
let guessingNum = prompt("Enter your guessing Number! ")
let attempt = 0
while(maxNum !== guessingNum){
    if (guessingNum === 'q') break
    else if(guessingNum>maxNum){
        attempt++
        guessingNum = prompt("too high")
    }else if(guessingNum<maxNum){
        attempt++
        guessingNum = prompt("too low")
    }else if(typeof(guessingNum) != Number && guessingNum != 'q'){
        guessingNum = prompt("Enter the number or q ")
    }
}
if (guessingNum === 'q'){
    console.log('ew');
}else{
    console.log(`congrate, your attempt ${attempt}`);
}
