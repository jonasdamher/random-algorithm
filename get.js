'use strict';

const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
 
// const url = '';

// function country() {

// }

// function pageCountries(url) {
//     return new Promise((resolve, reject) => {
//         axios.get(url).then((res) => {
//             let html = cheerio.load(res.data)
//             let listCountries = html('.countries li');

//             let links = [];
//             for (let index = 0; index < array.length; index++) {
//                 const element = array[index];
//                 let firstLinks = html(listCountries.children('a')[0])

//             }
//             console.log(listCountries)
//         })
//     })
// }

// async function getData(url) {

//     let pages = await pageCountries(url + 'paises/a')
//     return pages;
// }

// getData(url).then((res) => {
//     console.log(res)
// })

