const button = document.querySelector('button')
const lists = document.querySelector('#jokes')

 const addNewJoke = async () => {
    const joke = await getDadJoke()
    const list = document.createElement('li')
    list.append(joke)
    lists.append(list)
}



const getDadJoke = async () => {
    const config = { headers: { Accept: 'application/json'}}
    const res = await axios.get('https://icanhazdadjoke.com/',config)
    return res.data.joke
}

button.addEventListener('click', addNewJoke)