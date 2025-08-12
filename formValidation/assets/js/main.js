/**
 * Nenhum campo pode estar vazio.
 * Usuário só poderá conter letras e/ou números.
 * Usuário deverá ter entre 3 e 12 caracteres.
 * Senha precisa ter entre 6 e 12 caracteres.
 */
class AllNameValidator {
    constructor() {
        this.firstNameInput = document.getElementById("nameInput");
        this.surnameInput = document.getElementById("surnameInput");
        this.formInstance = null;
    }

    allNameMask() {
        document.addEventListener("DOMContentLoaded", () => {
            Inputmask({ regex: "([A-Za-zÀ-ÖØ-öø-ÿ\\s])*" }).mask([this.firstNameInput, this.surnameInput]);
        });

    }

    whitespaceRemover() {
        const firstName = this.firstNameInput.value;
        const surname = this.surnameInput.value;

        console.log(firstName.trim() + " " + surname.trim());
    }
}

class CpfValidator {
    constructor() {
        this.cpfInput = document.getElementById("cpfInput");
        this.formInstance = null;
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

    cpfValidation() {
        const lastTwoDigits = this.cpfDigitsToNumber().toSpliced(0, 9);

        /* VALIDATION FIRST STEP */
        const firstNineDigits = this.cpfDigitsToNumber().toSpliced(9, 2);
        const firstSumValidation = (this.cpfReceiver() != "") ? this.decreasingMultiplierSum(firstNineDigits, 10) : null;
        const firstdigitVerificator = this.digitVerificator(firstSumValidation, lastTwoDigits, lastTwoDigits[0]);

        /* VALIDATION SECOND STEP */
        const firstTenDigits = [...firstNineDigits, lastTwoDigits[0]];
        const secondSumValidation = this.decreasingMultiplierSum(firstTenDigits, 11);
        const secondDigitVerificator = this.digitVerificator(secondSumValidation, lastTwoDigits, lastTwoDigits[1]);

        this.formInstance.paragraphRemover("cpfInputValidation");
        if (!(firstdigitVerificator && secondDigitVerificator))
            $("validationForm, input[data-index=2]").after(this.formInstance.paragraph("cpfInputValidation", "", "Invalid CPF"));
    }
}

class UserValidator {
    constructor() {
        this.userInput = document.getElementById("userInput");
        this.formInstance = null;
    }

    userMask() {
        document.addEventListener("DOMContentLoaded", () => {
            Inputmask({ regex: "[a-zA-Z0-9]*" }).mask(this.userInput);
        });
    };

    userValidation() {
        this.formInstance.paragraphRemover("userLength");
        if (this.userInput.value.length < 3 || this.userInput.value.length > 12)
            $("validationForm, input[data-index=3]").after(this.formInstance.paragraph("userLength", "", "Username must contains 3-12 characters."));
    }
}

class PasswordValidator {
    constructor() {
        this.passInput = document.getElementById("passInput");
        this.passConfirmInput = document.getElementById("passConfirmInput");
        this.formInstance = null;
    }

    passwordValidation() {
        this.formInstance.paragraphRemover("passLength");
        if (this.passInput.value.length < 6 || this.passInput.value.length > 12)
            $("validationForm, input[data-index=4]").after(this.formInstance.paragraph("passLength", "", "Password must contains 6-12 characters."));
        
        this.formInstance.paragraphRemover("samePass");
        if (this.passInput.value != this.passConfirmInput.value)
            $("validationForm, input[data-index=5]").after(this.formInstance.paragraph("samePass", "", "Password must be the same."));
    }
}

class FormValidation {
    constructor() {
        this.textInputs = document.querySelectorAll('.validationForm input[type="text"], .validationForm input[type="password"]');
        this.allNameInstance = new AllNameValidator();
        this.allNameInstance.formInstance = this;
        this.cpfInstance = new CpfValidator();
        this.cpfInstance.formInstance = this;
        this.userInstance = new UserValidator();
        this.userInstance.formInstance = this;
        this.passwordInstance = new PasswordValidator();
        this.passwordInstance.formInstance = this;
    }

    static stopReload() {
        document.getElementById("validationForm").addEventListener("submit", event => {
            event.preventDefault();
        });
    }

    paragraph(reference, index, string) {
        return `<p id=${reference}${index}>${string}</p>`
    }

    paragraphRemover(paragraphID) {
        if (document.getElementById(paragraphID)) document.getElementById(paragraphID).remove();
    }

    blankInputsValidation() {
        const textInput = [...this.textInputs];
        textInput.map((textInput, index) => {

            this.paragraphRemover(`blankInput${index}`);

            if ((textInput.value === "") && (document.getElementById(`blankInput${index}`) === null)) {
                $(`validationForm, input[data-index=${index}]`).after(this.paragraph("blankInput", index, "Empty"));
            }
        })
    }

    validateButton() {
        FormValidation.stopReload();
        this.allNameInstance.allNameMask();
        this.cpfInstance.cpfMask();
        this.userInstance.userMask();

        document.addEventListener("submit", event => {
            const element = event.target;
            if (element.classList.contains("validationForm")) {
                this.blankInputsValidation(),
                    this.cpfInstance.cpfValidation(),
                    this.userInstance.userValidation(),
                    this.allNameInstance.whitespaceRemover(),
                    this.passwordInstance.passwordValidation();

            }
        });
    };
}

const form = new FormValidation();
form.validateButton()
console.log(form)
