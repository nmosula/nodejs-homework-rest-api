const bcrypt = require("bcrypt");

const gravatar = require("gravatar");

const { HttpError, sendEmail } = require("../../helpers");

const { User } = require("../../models/user");
const { nanoid } = require("nanoid");

const register = async (req, res) => {
    const {
        email,
        password,
        subscription = "starter",
        verify = false,
    } = req.body;

    const user = await User.findOne({ email });
    
    if(user) {
        throw HttpError(409, "Email already exist");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationCode = nanoid();

    const avatarURL = gravatar.url(email, { protocol: "http", s: "250" });

    const result = await User.create({
        ...req.body,
        password: hashPassword,
        subscription,
        avatarURL,
        verificationCode
    });

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationCode}">Click to verify email</a>`
    };

    await sendEmail(verifyEmail).then((result) => {
        console.log(result.body)
    })
    .catch((err) => {
        console.log(err.statusCode)
    });

    res.status(201).json({
        user: {
            email: result.email,
            subscription: result.subscription,
        }
    })
}

module.exports = register;