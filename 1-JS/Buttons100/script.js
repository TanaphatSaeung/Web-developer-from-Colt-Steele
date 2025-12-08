for(let i = 0; i < 100;i++){
    const btn = document.createElement('button')
    const containerBtn = document.querySelector('.containerBtn')
    btn.innerText = 'CLICKED!'
    containerBtn.append(btn)
    // document.body.append(containerBtn)
}
for(let i = 0; i < 100;i++){
    const h1 = document.createElement('h1')
    h1.innerText = 'CLICKED!'
    document.body.append(h1)
}

const randomColor = () => {
    const red = Math.floor(Math.random() * 255) + 1
    const green = Math.floor(Math.random() * 255) + 1
    const blue = Math.floor(Math.random() * 255) + 1
    return `rgb(${red},${green},${blue})`
}

const buttons = document.querySelectorAll('button')
const h1 = document.querySelectorAll('h1')

for(let button of buttons){
    button.addEventListener('click', colorize)
}
for(let str of h1){
    str.addEventListener('click', colorize)
}
function colorize() {
    this.style.backgroundColor = randomColor()
    this.style.color = randomColor()
}