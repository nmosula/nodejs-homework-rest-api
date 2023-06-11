const { sendEmail, HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const resendVerifyEmail = async(req, res) => {
    const { email } = req.body;

    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(404, "User not found");
    }
    if(user.verify){
        throw HttpError(400, "Verification has already been passed")
    }
    
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${PROJECT_URL}/users/verify/${user.verificationCode}">Click to verify email</a>`
    };

    await sendEmail(verifyEmail);

    res.json({
        message: "Verification email sent"
    })
}

module.exports = resendVerifyEmail;