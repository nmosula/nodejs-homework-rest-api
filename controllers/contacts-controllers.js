const { Contact } = require("../models/contact");

const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../utils");


const getAllContacts = async (req, res) => {
    const result = await Contact.find();
    res.json(result)
}

// const getContactById = async (req, res) => {
//     const { contactId } = req.params;
//     const result = await contactsService.getContactById(contactId);
//     if (!result) {
//       throw HttpError(404, 'Not found');
//     }
//     res.json(result)
// }

// const addContact = async (req, res) => {
//     const result = await contactsService.addContact(req.body);

//     res.status(201).json(result);
// }

// const updateContactById = async (req, res) => {
//     const { contactId } = req.params;

//     const result = await contactsService.updateContact(contactId, req.body);

//     if (!result) {
//       throw HttpError(404, 'Not found');
//     }

//     res.json(result);
// }

// const deleteContactById = async (req, res) => {
//     const { contactId } = req.params;
//     const result = await contactsService.removeContact(contactId);
//     if (!result) {
//       throw HttpError(404, 'Not found');
//     }

//     res.status(200).json({message: "contact deleted"});
// }

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    // getContactById: ctrlWrapper(getContactById),
    // addContact: ctrlWrapper(addContact),
    // updateContactById: ctrlWrapper(updateContactById),
    // deleteContactById: ctrlWrapper(deleteContactById),
}