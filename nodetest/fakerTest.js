const faker = require('faker');

const names = [];

function randomNames(number) {
    for(let i = 0; i < number; i++) {
        names.push(faker.name.findName())
    } 
}

randomNames(5)

console.log(names);