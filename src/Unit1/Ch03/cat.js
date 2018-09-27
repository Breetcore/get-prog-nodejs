'use strict';

class Cat {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    eat(food) {
        console.log(`${this.name} loves eating ${food}!`);
    }
}

module.exports = Cat
