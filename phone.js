'use strict';

const fs = require('fs');


let json = fs.readFileSync('countries-prefixs-e164.json');
const prefixs = JSON.parse(json)

function phone(prefix, number) {

    number = number.replace(/ /g, '')
    if (!number.length) {
        return false;
    }

    let searchPrefix = prefixs.find((country_prefix) => country_prefix.prefix == prefix)
    let prefixsMobile = searchPrefix.prefix_mobile;

    let search = prefixsMobile.some((currentPrefix) => {
        let lengthPrefix = currentPrefix.length;
        let prefixNumber = number.substr(0, lengthPrefix)

        return currentPrefix == prefixNumber;
    })

    return search;
}

let verifyPhone = phone('34', '697');

console.log(verifyPhone);