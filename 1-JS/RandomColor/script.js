const btn = document.querySelector('button')
const h1 = document.querySelector('h1')
const body = document.querySelector('body')

btn.addEventListener('click',()=>{
    const newColor = randomColor()
    h1.innerText = newColor
    body.style.backgroundColor = newColor
})

const randomColor = () => {
    const red = Math.floor(Math.random() * 255) + 1
    const green = Math.floor(Math.random() * 255) + 1
    const blue = Math.floor(Math.random() * 255) + 1
    return `rgb(${red},${green},${blue})`
}