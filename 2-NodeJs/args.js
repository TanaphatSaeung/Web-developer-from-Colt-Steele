console.log(process.argv);
const args = process.argv.slice(2) // begin with index 2
for (let arg of args){
    console.log(`Hi! ${arg}`);
}