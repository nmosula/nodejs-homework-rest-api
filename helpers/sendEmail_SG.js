const sgMail = require('@sendgrid/mail');

require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail_SG = async (data) => {
    const email = {
        to: data.to,
        from: "nmosula@yahoo.com",
        subject: data.subject,
        html: data.html
    }

    await sgMail.send(email)
        .then((result) => {
            console.log("email was successfully sended")    
        })
        .catch((err) => {
            console.log(err.message)            
        });
    
    return true;
}

module.exports = sendEmail_SG;