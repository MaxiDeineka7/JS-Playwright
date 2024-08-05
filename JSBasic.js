const marks = [2,65,7,8,45]
const summary = marks.reduce((sum,mark)=>sum+mark,0) // ДЛЯ СУМИ 127
console.log(summary)

const filter = marks.filter(marks=>marks%2==0) // ДЛЯ УМОВИ [ 2, 8 ]
console.log(filter)

const map = marks.map(marks=>marks*3) // для кожного елемента в масиві [ 6, 195, 21, 24, 135 ]

const persentage = ["100%","3%","5%","54%","20%"] // для кожного елемента в масиві навіть з кастомною умовою [ 100, 3, 5, 54, 20 ]
const map2 = persentage.map((element) => {
    const trimmedText = element.replace("%","")
    return parseInt(trimmedText, 10)
    })
console.log(map)
console.log(map2)

const sortArray = ["Maks", "Anastasia", "Yosyp", "Dunia"] // сортування [ 'Anastasia', 'Dunia', 'Maks', 'Yosyp' ]
const sorted = sortArray.sort()
console.log(sorted)

const sorted2 = marks.sort((a,b)=> a-b)  // кастомне сортування [ 2, 7, 8, 45, 65 ]
console.log(sorted2)

const sorted3 = marks.sort((a,b)=> b-a) // або reverse() // в зворотньому порядку сортування [ 65, 45, 8, 7, 2 ]
console.log(sorted3)


////////////////////////////////////// ФУНКЦІЇ стрілкові(2) та функціональні декларації(1)
function gg () {        
    console.log("gg") 
}

ff = () => { 
    console.log("ff") 
}
gg()
ff()

////////////////////////////////////// анонімні ФУНКЦІЇ

const anonymous = function(a,b) 
{
   return a+b
}
console.log(anonymous(2,5))

const anonymous2 = (a,b) => a+b // АБО так
console.log(anonymous2(2,6))

////////////////////////////////////// OBJECTS is collection of properties 
const propert = {  
    name:"Maks",
    sex: "Male",
    age: 5,
    fullName: function()
    {
        console.log(this.name + this.sex)
    }
}
propert.hand = "big"
console.log(propert)
console.log(propert.name) //Maks
console.log(propert['name']) //Maks
console.log('name' in propert) // true

for(let key in propert){
    console.log(propert[key]) //Maks Male 5 big
}

console.log(propert.fullName())

////////////////////////////////////// КЛАСИ

class Person {
    constructor(){
        this.age = 55
    }

    name = "Maksym" //property

    get location(){ //get property
        return "Ukraine"
    }

    fullName(){
        console.log(this.location + this.name)
    }
}

const pers = new Person()
console.log(pers.name)
console.log(pers.location)
console.log(pers.fullName())

class Worker extends Person {
    constructor(){
        super()
    }

    name = "Cat"


    get location(){
        return "Cher"
    }

}
const work = new Worker()
console.log(work.age)
console.log(work.fullName())