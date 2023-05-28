const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../utils");
const Joi = require("joi");

const phoneRegexp = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const contactSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      match: phoneRegexp,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    }
}, { versionKey: false, timestamps: true });

contactSchema.post("save", handleMongooseError);

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.boolean(),
});

const updateFavoriteContactSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "missing field favorite" }),
})

const schemas = {
  contactAddSchema,
  updateFavoriteContactSchema,
}

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};

//https://github.com/BogdanLyamzin/64-65-Node.js/blob/master/lesson-8/main-project/models/user.js