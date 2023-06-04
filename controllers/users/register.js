const bcrypt = require("bcrypt");

const gravatar = require("gravatar");

const { HttpError } = require("../../helpers");

const { User } = require("../../models/user");

const register = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw HttpError(409, "Email already exist");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email, { protocol: "http", s: "250" });

    const result = await User.create({...req.body, password: hashPassword, avatarURL});

    res.status(201).json({
        user: {
            email: result.email,
            subscription: result.subscription,
        }
    })
}

module.exports = register;