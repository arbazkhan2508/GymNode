const nodemailer = require("nodemailer");
const googleApis = require("googleapis");

const REDIRECT_URI = `https://developers.google.com/oauthplayground`;
const CLIENT_ID = `812480260222-jmv8n1d9ifdjnie9eejl95i9inpe8c17.apps.googleusercontent.com`;
const CLIENT_SECRET = `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`;
const REFRESH_TOKEN = `1//04PzZ-P3Yz72pCgYIARAAGAQSNwF-L9Ir0EeefOvQrhhlBuIAc-87UU8QWnjipWOxAQYnCSe6vNBub--KlXIwbgU9IBrY5kd5doM`;
const authClient = new googleApis.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
authClient.setCredentials({
    refresh_token: REFRESH_TOKEN
});
async function mailer1(email, userid,username, token) {
    try {
        const ACCESS_TOKEN = await authClient.getAccessToken();
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "ak1933929@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: ACCESS_TOKEN
            }
        })

        const details = {
            from: "Asad <ak1933929@gmail.com>",
            to: email,
            subject: "Your Vehicle Booking with Shery Ride",
            text: "hi",
            html:`
                Dear ${username}, 
                <p style="font-size: .9vmax;">
                    We are excited to confirm your vehicle booking with Shery Ride. Thank you for choosing our services!
                </p>
                <h6 style="font-size: 1vmax;">Vehicle Pick-up Instructions::</h6>
                <small style="font-size: .8vmax;">
                     <br>
                    On the day of your pick-up, please bring the following documents:
                 </small>
                 <p style="font-size: .8vmax;">
                     1. A valid driver's license. <br>
                     2.  The credit card used for the payment (if applicable).<br>
                     3.  Any other identification documents mentioned in your booking confirmation. 
                 </p>
                 <h6 style="font-size: 1vmax;">
                    Cancellation Policy:
                 </h6>
                 <p style="font-size: .8vmax;">
                 If you need to cancel or modify your booking, please do so at least [Cancellation Policy <br> Period] before the pick-up date to avoid any cancellation fees. You can manage your booking <br> through your account on our website.
                  </p>
                  <p style="font-size: .8vmax;">
                  We hope you have a fantastic experience with our rental service. If you have any questions or <br> require further assistance, don't hesitate to reach out to our support team.
                  </p>
                  <h6 style="font-size: 1vmax;">Safe travels and thank you for choosing Shery Ride! <br> Best regards,</h6>
                  <h6 style="font-size: 1vmax;">If you have any questions or need further assistance, please do not hesitate to contact our support team at <br> [ak1933929@gmail.com/8962834895].</h6>
                  Thank you,
                  <br>
                  Shery Ride Team
                  <br>
                  [Your Website URL]
                <a href="http://127.0.0.1:3000/reset/${userid}/${token}">reset link</a>`
        
        }
        const result = await transport.sendMail(details);
        return result;
    } catch (err) {
        return err;
    }
}
 
module.exports = mailer1;