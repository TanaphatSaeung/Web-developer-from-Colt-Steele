let quest = prompt("What do you want to do?")
let database = ["Learning web development","English improving"]


while(quest!== 'quit'){
    if (quest){
        if(quest === 'new'){
            let rows
            let work = prompt("What're you planning to do?")
            while(work !== 'q'){
                let i
                if(work){
                    database.push(work)
                    console.log(`'${work}' has added to the list`);
                    work = prompt("What're you planning to do? type q to quit.")
                }else{
                    work = prompt("You can't left this to be blanked! type q to quit.")
                }
            }
            quest = prompt("What do you want to do?")
        }else if(quest === 'list'){
            console.log(`*************************`);
            for (let i = 0; i < database.length; i++){
                console.log(`${[i]}: ${database[i]}`);
            }
            console.log(`*************************`);
            quest = prompt("What do you want to do?")
        }else if(quest === 'delete'){
            let deleteIndex = prompt("What do you want to delete?")

            while(deleteIndex !== 'q'){
                    if (parseInt(deleteIndex)){
                        let checkDelete = database.splice(deleteIndex,1)
                        if(checkDelete.length === 0){
                            deleteIndex = prompt("Invalid index to delete? please try again")
                        }else {
                            console.log(`'${checkDelete}' has removed`);
                            deleteIndex = prompt("do you want to delete anything more?")
                        }
                    }else{
                        deleteIndex = prompt("Enter the index to be deleted! or q to quit")
                    }
                }
            
            quest = prompt("What do you want to do?")
        }else{
            quest = prompt("Can't left this to be blanked!")
        }
    }else{
        quest = prompt("Enter with the list!")
    }
}
console.log('You have quit!');