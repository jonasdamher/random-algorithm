'use strict';

function dni(numberDni) {
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKET';

    let positionLetter = numberDni % 23;

    let letter = letters.charAt(positionLetter);

    let completeDni = numberDni + letter;

    return completeDni;
}

let completeDni = dni('54107108');

console.log(completeDni);