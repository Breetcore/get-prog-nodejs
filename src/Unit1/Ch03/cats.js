'use strict';

const Cat = require('./cat');
const eat = require('./eat');

var wodan = new Cat('Wodan', 1, 'male');

console.log(`Our cat's name is ${wodan.name}\nHe's ${wodan.age} years old`);
console.log(wodan.eat('juicy can food'));
eat(wodan);
