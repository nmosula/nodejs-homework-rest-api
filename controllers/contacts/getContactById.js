const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const getContactById = async (req, res) => {
    const { id } = req.params;
    // const result = await Contact.findOne({ _id: contactId });
    const result = await Contact.findById(id);

    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json(result)
}

module.exports = getContactById;