import validator from 'validator';

export default class Contact {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.event();
    }
    
    showError(element, errorMessage) {
        const nameInput = document.querySelector(element);
        const paragraph = document.createElement('p');

        paragraph.innerText = errorMessage

        if (paragraph) paragraph.setAttribute('class', 'error-message');

        nameInput.appendChild(paragraph);
    }
    
    event() {
        if(!this.form) return;
        this.form.addEventListener("submit", e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const element = e.target;
        const nameInput = element.querySelector('input[name="name"]');
        const emailInput = element.querySelector('input[name="email"]');

        let error = false;

        if(nameInput.value === "") {
            this.showError('div[name="div-addName"]', 'You must enter a name'); 
            error = true;
        }

        if(!validator.isEmail(emailInput.value)) {
            this.showError('div[name="div-emailName"]', 'You must enter a valid mail name'); 
            error = true;
        }

        if(!error) element.submit();
    }
}