'use strict';

const cities = require('cities');
//const cities = require('all-the-cities');

/**/
var myCity = cities.zipLookup('10032');
/**
var myCity = cities.filter(city => {
    return city.name.match('Gouda')
});
/**/

console.log(myCity);
