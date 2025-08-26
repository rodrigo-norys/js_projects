export default class PasswordGenerator {
    constructor() {
        this.yourPassword = document.getElementById("your-password");
        this.charLimit = document.getElementById("char-limit");
        this.generateButton = document.getElementById("generate-button");
        this.checkBoxes = document.querySelectorAll('.container input[type="checkbox"]');
        this.element0 = false;
        this.element1 = false;
        this.element2 = false;
        this.element3 = false;
    }

    init() {
        this.genButton();
        this.change();
    }
    
    genButton() {
        this.generateButton.addEventListener("click", event => {  
            this.paragrafo();
            this.teste();
        });
    };

    rand(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    paragrafo() {
        return this.yourPassword.innerText = this.teste();
    }

    change() {
        this.checkBoxes[0].addEventListener("change", event => { this.element0 = event.target.checked; });
        this.checkBoxes[1].addEventListener("change", event => { this.element1 = event.target.checked; });
        this.checkBoxes[2].addEventListener("change", event => { this.element2 = event.target.checked; });
        this.checkBoxes[3].addEventListener("change", event => { this.element3 = event.target.checked; });
    }

    teste() {
        let alo = "";
        const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
        for (let i = 0; i < this.charLimit.value; i++) {
            if (this.element0 === true) alo += String.fromCharCode(this.rand(48, 57));
            if (this.element1 === true) alo += String.fromCharCode(this.rand(65, 90));
            if (this.element2 === true) alo += String.fromCharCode(this.rand(97, 122));
            if (this.element3 === true) {
                alo += symbols[this.rand(0, symbols.length - 1)];
            }
        }
 
        return alo.slice(0, this.charLimit.value)
    }
}
