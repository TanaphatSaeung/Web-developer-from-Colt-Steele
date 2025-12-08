const tweetForm = document.querySelector('#tweetForm')
const Lists = document.querySelector('ul')
Lists.addEventListener('click',(e)=>{
    e.target.nodeName === 'LI' && e.target.remove()
})

tweetForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const username = document.querySelectorAll('input')[0]
    const tweet = document.querySelectorAll('input')[1]
    if (username.value !== '' & tweet.value !== ''){
        addTweet(username,tweet)
    }
})

const addTweet = (user,tweet) => {
    const newTweet = document.createElement('li')
    const bTag = document.createElement('b')
    bTag.append(user.value)
    newTweet.append(bTag)
    newTweet.append(`- ${tweet.value}`)
    Lists.append(newTweet)
    tweet.value = ''
}