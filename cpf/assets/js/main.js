// 705.484.450.52 | 070.987.720-03

/**
7x  0x  5x  4x  8x  4x  4x  5x  0x
10  9   8   7   6   5   4   3   2
70  0   40  28  48  20  16  15  0

11 - (237 % 11) = 5 (1º dígito)
Se o número for maior que 9, consideramos 0.

7x  0x  5x  4x  8x  4x  4x  5x  0x  5x
11  10  9   8   7   6   5   4   3   2
70  0   40  28  48  20  16  15  0   10 = 284

11 - (284 % 11) = 2 (2º dígito);
Se o número for maior que 9, consideramos 0.
*/


class CpfValidator {
    constructor() {
        this.cpfInput = document.getElementById('cpfInput');
        this.result = document.getElementById('result');
    }
    start = () => {
        this.validateButtonEvent();
        this.cpfMask();
    }

    validateButtonEvent = () => {
        document.addEventListener('click', event => {
            const element = event.target;
            if (element.classList.contains('cpfSubmit')) this.validation();
            if (element.classList.contains('clearButton')) this.cpfClear();
        });
    };

    cpfMask = () => {
        document.addEventListener("DOMContentLoaded", () => {
            Inputmask("999.999.999-99").mask(this.cpfInput);
        });
    };


    cpfReceiver() {
        return this.cpfInput.value;
    };

    cpfDigitsToString() {
        let numeralsOnly = this.cpfReceiver().replace(/\D+/g, '');
        let cpfStringDigits = numeralsOnly.split("");
        return cpfStringDigits;
    }

    cpfDigitsToNumber() {
        let numberDigit;
        let cpfNumberDigits = [];

        for (let stringDigit of this.cpfDigitsToString()) {
            numberDigit = Number(stringDigit);
            cpfNumberDigits.push(numberDigit)
        }
        return cpfNumberDigits;
    }

    /* 
    This method needs first, an array and a multiplacator.
    After this, it'll do the decreasing product of each value from array, based on multiplicator.
    At the last, will do the sum of each value from this array, returning that sum.
    */
    decreasingMultiplierSum(array, inicialMultiplicator) {
        return array
            .map((value, index) => value * (inicialMultiplicator - index))
            .reduce((total, parcial) => total + parcial);
    }

    /*
    This method iS for the last 2 digits verification. 
    So, need first the result of decreasingMultiplierSum method, the array with 2 digits and the one of that digits for verification.
    The return will be a boolean answer, if that digit is VALIDATED or INVALIDATED.
    */
    digitVerificator(decreasingMultiplierSum, array, arrayValue) {
        array.map(value => value > 9 ? 0 : value);
        return 11 - (decreasingMultiplierSum % 11) === arrayValue;

    }

    cpfClear() {
        this.cpfInput.value = '';
        this.result.innerHTML = '';
    }

    validation() {
        let lastTwoDigits = this.cpfDigitsToNumber().toSpliced(0, 9);

        /* VALIDATION FIRST STEP */
        let firstNineDigits = this.cpfDigitsToNumber().toSpliced(9, 2);
        let firstSumValidation = this.decreasingMultiplierSum(firstNineDigits, 10);
        let firstdigitVerificator = this.digitVerificator(firstSumValidation, lastTwoDigits, lastTwoDigits[0]);

        /* VALIDATION SECOND STEP */
        let firstTenDigits = [...firstNineDigits, lastTwoDigits[0]];
        let secondSumValidation = this.decreasingMultiplierSum(firstTenDigits, 11);
        let secondDigitVerificator = this.digitVerificator(secondSumValidation, lastTwoDigits, lastTwoDigits[1]);


        // The finally Answer.
        if (firstdigitVerificator && secondDigitVerificator) {
            result.style.backgroundColor = '#00ffcc';
            return this.result.innerHTML = 'Valid CPF.';
        } else {
            result.style.backgroundColor = 'red';
            return this.result.innerHTML = 'Invalid CPF.';
        }
    }
}
const cpf = new CpfValidator();
cpf.start();