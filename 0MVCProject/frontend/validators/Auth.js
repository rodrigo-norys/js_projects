import validator from 'validator';

export default class Auth {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.event();
    }

    event() {
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const element = e.target;
        const emailInput = element.querySelector('input[name="email"]');
        const passwordInput = element.querySelector('input[name="password"]');
        let error = false;

        if(!validator.isEmail(emailInput.value)) {
            alert('Enter a valid e-mail address');
            error = true;
        }

        if(passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            alert('Password must be between 3 and 50 characters');
            error = true;
        }

        if(!error) element.submit();
    }
}