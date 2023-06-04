const { ctrlWrapper } = require("../../utils");

const addContact = require("./addContact");
const deleteContactById = require("./deleteContactById");
const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const updateContactById = require("./updateContactById");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContactById: ctrlWrapper(updateContactById),
    updateStatusContact: ctrlWrapper(updateStatusContact),
    deleteContactById: ctrlWrapper(deleteContactById),
}