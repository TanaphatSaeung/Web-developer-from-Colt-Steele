class Pet{
    constructor(name,age){
        this.name = name
        this.age = age
    }
    eat(){
        return `${this.name} is eating`
    }
}

class Bunny extends Pet{
    hop(){
        return 'Hop!'
    }
}

class Dog extends Pet{
    constructor(name,age,breeds = 'shi su'){
        super(name,age)
        this.breeds = breeds
    }
    bark(){
        return 'WOOOF!!'
    }
}
