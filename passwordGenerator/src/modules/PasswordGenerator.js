export default class PasswordGenerator {
    constructor() {
        this.yourPassword = document.getElementById("your-password");
        this.charLimit = document.getElementById("char-limit");
        this.generateButton = document.getElementById("generate-button");
        this.checkBoxes = document.querySelectorAll('.container input[type="checkbox"]');
    }

    init() {
        this.genButton();
    }

    genButton() {
        this.generateButton.addEventListener("click", event => {
            this.generatedPassword();
            this.passwordBuilder();
        });
    };

    rand(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    generatedPassword() {
        return this.yourPassword.innerText = this.passwordBuilder();
    }

    passwordBuilder() {
        let password = "";
        const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
        for (let i = 0; i < this.charLimit.value; i++) {
            if (this.checkBoxes[0].checked) password += String.fromCharCode(this.rand(48, 57));  // Numbers
            if (this.checkBoxes[1].checked) password += String.fromCharCode(this.rand(65, 90));  // Lowercase
            if (this.checkBoxes[2].checked) password += String.fromCharCode(this.rand(97, 122)); // Uppercase
            if (this.checkBoxes[3].checked) {
                password += symbols[this.rand(0, symbols.length - 1)];
            }
        }

        return password.slice(0, this.charLimit.value)
    }
}
