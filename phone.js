'use strict';

const fs = require('fs');


let json = fs.readFileSync('countries-prefixs-complete.json');
const prefixs = JSON.parse(json)

function phone(prefix, number) {

    number = number.replace(/ /g, '')
    if (!number.length) {
        return false;
    }
    let prefixes = [];
    let searchPrefix = prefixs.filter((country_prefix) => country_prefix.prefix == prefix)

    searchPrefix.forEach(element => {
        prefixes = prefixes.concat(element.prefix_mobile)
    });

    let search = prefixes.some((currentPrefix) => {
        let lengthPrefix = currentPrefix.prefix.length;
        let prefixNumber = number.substr(0, lengthPrefix)

        return currentPrefix.prefix == prefixNumber && number.length == currentPrefix.size;
    })

    return search;
}

let verifyPhone = phone('34', '600600600');

console.log(verifyPhone);