import Contact from "../models/ContactModel.js";

function contactIndex(req, res) {
    res.render('contact-add');
}

async function addContact(req, res, err) {
    try {
        const contact = new Contact(req.body);
        await contact.addContact();

        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect('/contact-add'));
            return;
        }

        req.flash('success', 'Contact added successfully.');
        req.session.save(() => res.redirect('/contact-add'));
        return;
    } catch (error) {
        console.log(error);
    }
}
async function listContacts(req, res) {
    try {
        const contact = new Contact(req.body);
        const allContacts = await contact.listContacts();
        res.render('contact-list', { allContacts });
    } catch (error) {
        console.log(error);
    }
}

async function toEditContact(req, res) {
    try {
        const contact = new Contact(req.body);
        const value = await contact.findContact(req.params.id);


        res.render('contact-edit', { value });
    } catch (error) {
        console.log(error);
    }

}

async function editContact(req, res) {
    try {
        const contact = new Contact(req.body);
        await contact.editContact(req.params.id);

        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect(`/contact/${contact.contact.id}`));
            return;
        }

        req.flash('success', 'Contact edited successfully.');
        req.session.save(() => res.redirect('/contact-list'));
        return;

    } catch (error) {
        console.log(error);
    }

}


export default { contactIndex, listContacts, addContact, toEditContact, editContact };