const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contact");

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

module.exports = deleteContactById;