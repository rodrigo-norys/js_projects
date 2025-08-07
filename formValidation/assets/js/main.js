/**
 * Nenhum campo pode estar vazio.
 * Usuário só poderá conter letras e/ou números.
 * Usuário deverá ter entre 3 e 12 caracteres.
 * Senha precisa ter entre 6 e 12 caracteres.
 */


class CpfValidator {
    constructor() {
        this.cpfInput = document.getElementById('cpfInput');
        this.formInstance = null;
    }

    start() {
        this.cpfMask();
    }

    cpfMask() {
        document.addEventListener("DOMContentLoaded", () => {
            Inputmask("999.999.999-99").mask(this.cpfInput);
        });
    };

    cpfReceiver() {
        return this.cpfInput.value;
    };

    cpfDigitsToString() {
        const numeralsOnly = this.cpfReceiver().replace(/\D+/g, '');
        const cpfStringDigits = numeralsOnly.split("");
        return cpfStringDigits;
    }

    cpfDigitsToNumber() {
        let numberDigit;
        const cpfNumberDigits = [];

        for (const stringDigit of this.cpfDigitsToString()) {
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

    validation() {
        const lastTwoDigits = this.cpfDigitsToNumber().toSpliced(0, 9);

        /* VALIDATION FIRST STEP */
        const firstNineDigits = this.cpfDigitsToNumber().toSpliced(9, 2);
        const firstSumValidation = this.decreasingMultiplierSum(firstNineDigits, 10);
        const firstdigitVerificator = this.digitVerificator(firstSumValidation, lastTwoDigits, lastTwoDigits[0]);

        /* VALIDATION SECOND STEP */
        const firstTenDigits = [...firstNineDigits, lastTwoDigits[0]];
        const secondSumValidation = this.decreasingMultiplierSum(firstTenDigits, 11);
        const secondDigitVerificator = this.digitVerificator(secondSumValidation, lastTwoDigits, lastTwoDigits[1]);

        if (document.getElementById("cpfInputValidation")) document.getElementById("cpfInputValidation").remove();

        if (firstdigitVerificator && secondDigitVerificator) {
            // result.style.backgroundColor = '#00ffcc';
            // return result.innerHTML = 'Valid CPF.';
            $(`validationForm, input[data-index=2]`).after(this.formInstance.paragraph('cpfInputValidation', '', 'Valid CPF'));

            // PAREI AQUIIIIIIIIIIIIIIIIII
        } else {
            // result.style.backgroundColor = 'red';
            // return result.innerHTML = 'Invalid CPF.';
            $(`validationForm, input[data-index=2]`).after(this.formInstance.paragraph('cpfInputValidation', '', 'Invalid CPF'));
        }

    }
}


class FormValidation {
    constructor() {
        this.textInputs = document.querySelectorAll('validationForm, input[type="text"]');
        this.cpfInstance = new CpfValidator();
        this.cpfInstance.formInstance = this;
    }

    static stopReload() {
        document.getElementById('validationForm').addEventListener('submit', event => {
            event.preventDefault();
        });
    }

    start() {
        this.validateButtonEvent();
    }

    paragraph(reference, index, string) {
        return `<p id=${reference}${index}>${string}</p>`
    }

    blankInputsValidation() {
        const textInput = [...this.textInputs];
        textInput.map((textInput, index) => {
            if (document.getElementById(`inputParagraph${index}`)) document.getElementById(`inputParagraph${index}`).remove();
            if ((textInput.value === "") && (document.getElementById(`inputParagraph${index}`) === null)) {
                $(`validationForm, input[data-index=${index}]`).after(this.paragraph("inputParagraph", index, "Vazio"));
            }
        })
    }

    validateButtonEvent() {
        FormValidation.stopReload();

        document.addEventListener('submit', event => {
            const element = event.target;
            if (element.classList.contains('validationForm')) {
                this.blankInputsValidation();
                this.cpfInstance.validation();
            }
        });
    };
}

const form = new FormValidation();
form.start()
console.log(form)
