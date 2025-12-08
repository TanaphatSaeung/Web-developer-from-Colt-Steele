// 

const container = document.querySelector('#container')

for (let i = 1; i <= 1025; i++){
    const createIMG = document.createElement('img')
    const createLabel = document.createElement('span')
    const createPokemon = document.createElement('div')
    createIMG.src = `https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/${i}.png`
    createLabel.innerText = `#${i}`
    createPokemon.appendChild(createIMG)
    createPokemon.appendChild(createLabel)
    createPokemon.classList.add('pokemon')
    container.append(createPokemon)
}