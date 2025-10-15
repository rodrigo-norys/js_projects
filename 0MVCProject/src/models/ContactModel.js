import mongoose from 'mongoose';
import validator from 'validator';

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true, default: '' },
    lastName: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    phone: { type: String, required: false, default: '' },
    createdAt: { type: Date, required: false, default: Date.now },
});

const ContactModel = mongoose.model('Contact', ContactSchema);

export default class Contact {
    constructor(body) {
        this.body = body
        this.errors = []
        this.contact = null
    }

    async addContact() {
        this.validate();
        if (this.errors.length > 0) return;
    
        this.contact = await ContactModel.create(this.body);
    }
    
    async editContact(id) {
        this.validate();
        if (this.errors.length > 0) return;
        this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
    }

    static async deleteContact(id) {
        return await ContactModel.findOneAndDelete({ _id: id });
    }

    static async findContact(id) {
        return await ContactModel.findById({ _id: id })
    }

    static async listContacts() {
        return await ContactModel.find().sort({ name: -1 });
    }

    validate() {
        this.cleanUp();
        if (this.body.name === '' || this.body.name.length < 2) this.errors.push('You must enter a valid name');
        if (!validator.isEmail(this.body.email)) this.errors.push('You must enter a valid email');
    }

    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') this.body[key] = '';
        }

        this.body = {
            name: this.body.name,
            lastName: this.body.lastName,
            email: this.body.email,
            phone: this.body.phone,
            createdAt: this.body.createdAt
        }
    }
}