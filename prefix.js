'use strict';

const cheerio = require('cheerio');
const fs = require('fs');

let jsonprefixse164 = fs.readFileSync('countries-prefixs-e164.json');
const prefixse164 = JSON.parse(jsonprefixse164)

let jsone164 = fs.readFileSync('e164.json');
const e164 = JSON.parse(jsone164)



function countries(prefixs, total, count = 0, list = []) {

    if (total != count) {

        let country = prefixs[count]
        ++count;
        let search = e164.find(x => x.prefix === country.prefix);

        if (search) {
            let obj = country;
            obj.prefix_internacional = search.prefix_internacional
            obj.prefix_nacional = search.prefix_nacional
            obj.digits = search.digits

            list.push(obj);
        } else {
            let obj = country;
            obj.prefix_internacional = null
            obj.prefix_nacional = null
            obj.digits = null

            list.push(country);

        }

        return countries(prefixs, total, count, list)
    }
    return list;
}

let c = countries(prefixse164, prefixse164.length);

console.log(c)

let a = JSON.stringify(c)

fs.writeFileSync('e164-list-all.json', a);
