import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

// Definindo a "tabela".
const AuthSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

// Vai me permitir executar queries.
const AuthModel = mongoose.model('Auth', AuthSchema);

export default class Authenticator {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login() {
        this.cleanUp();

        this.user = await AuthModel.findOne({ email: this.body.email });
        if (!this.user) {
            this.errors.push('Email address or password invalid');
            return;
        }
        const password = bcrypt.compareSync(this.body.password, this.user.password);
        if (password === false) { 
            this.errors.push('Invalid password') ;
        }
    }

    async register() {
        this.validate();
        await this.sameEmail()

        if (this.errors.length > 0) return;

        const salt = bcrypt.genSaltSync();
        this.body.password = bcrypt.hashSync(this.body.password, salt);

        this.user = await AuthModel.create(this.body);
    }

    async sameEmail() {
        this.user = await AuthModel.findOne({ email: this.body.email })
        if (this.user) this.errors.push('This e-mail adress already exists');
    }

    validate() {
        this.cleanUp();

        if (!validator.isEmail(this.body.email)) this.errors.push('Enter a valid e-mail adress');
        if (this.body.password.length < 3 || this.body.password.length > 50) this.errors.push('Password must be between 3 and 50 characters');
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') this.body[key] = '';
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}