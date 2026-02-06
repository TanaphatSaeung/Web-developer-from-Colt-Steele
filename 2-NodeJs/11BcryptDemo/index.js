const bcrypt = require('bcrypt')

// --- hash + salt password ---
// const hashPassword = async (pw) => {
//     const salt = await bcrypt.genSalt(12)
//     const hash = await bcrypt.hash(pw, salt)
//     console.log(hash); 
// }
const hashPassword = async (pw) => {
    const hash = await bcrypt.hash(pw, 12) // 12 = salt round, This will do salt and hash at once
    console.log(hash); 
}

// --- check hash password ---
const login = async (pw, hash) => {
    const result = await bcrypt.compare(pw, hash)
    if (result) {
        console.log('Logged in');
    }else{
        console.log('incorrect!');
    }
}
const pw = 'monkey'
hashPassword(pw)
login(pw,'$2b$12$SMxeNqDdGZxWS9L4O2K1leKtXJxsWNueoK8eB9vGCQLhxEyVy4VRe')
