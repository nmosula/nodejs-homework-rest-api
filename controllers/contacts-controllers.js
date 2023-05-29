const { Contact } = require("../models/contact");

const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../utils");


const getAllContacts = async (req, res) => {
    const result = await Contact.find({}, "-createdAt -updatedAt");
    res.json(result)
}

const getContactById = async (req, res) => {
    const { id } = req.params;
    // const result = await Contact.findOne({ _id: contactId });
    const result = await Contact.findById(id);

    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json(result)
}

const addContact = async (req, res) => {
    const result = await Contact.create(req.body);

    res.status(201).json(result);
}

const updateContactById = async (req, res) => {
    const { id } = req.params;

    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});

    if (!result) {
      throw HttpError(404, 'Not found');
    }

    res.json(result);
}

const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found`);
    }

    res.json(result);
}

const deleteContactById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }

    res.status(200).json({
        message: "Delete success",
        result,
    });
}

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContactById: ctrlWrapper(updateContactById),
    updateStatusContact: ctrlWrapper(updateStatusContact),
    deleteContactById: ctrlWrapper(deleteContactById),
}