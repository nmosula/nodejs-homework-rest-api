const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../utils");
const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    avatarURL: {
      type: String,
      required: true,
    },
    token: {
        type: String,
        default: ""
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
    }
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleMongooseError);

const userRegisterSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string().required().valid("starter", "pro", "business"),
});

const userLoginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const userEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
    userRegisterSchema,
    userLoginSchema,
    userEmailSchema,
};

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}