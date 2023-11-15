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
async function mailer2(email, userid,username,vname,model,sdate,edate,start,end, date,token) {
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
            subject: "Cancellation: Your Vehicle Booking with Shery Ride.",
            text: "hi",
            html:`
                Dear ${username}, 
                <p style="font-size: .9vmax;">
                We hope this email finds you well. We regret to inform you that your vehicle booking with Shery Ride has been canceled.
                </p>
                <h6 style="font-size: 1vmax;">Booking Details:</h6>
               
                <p style="font-size: .8vmax;">
                    1.Vehicle Model: ${model} 
                </p>
                <p style="font-size: .8vmax;">
                    2.Vehicle Name: ${vname}
                </p>
                <p style="font-size: .8vmax;">
                   3.Pick-up Date and Time:${sdate} 
                </p>
                <p style="font-size: .8vmax;">
                     4.Drop-off Date and Time:${edate} 
                </p>
                <p style="font-size: .8vmax;">
                    5.Pick-up Location: ${start}
                </p>
                <p style="font-size: .8vmax;">
                    5.Drop-off Location: ${end}
                </p>
                 
                 <h6 style="font-size: 1vmax;">
                    Cancellation Details:
                 </h6>
                 <p style="font-size: .8vmax;">
                     Cancellation Date: ${date}
                 </p>
                 <p style="font-size: .8vmax;">
                     Please note that the cancellation has been processed, and any payment made for the <br> booking will be refunded to the original payment method used during the booking process.<br> The refund may take [Refund Processing Time] to reflect in your account.
                  </p>
                  <p style="font-size: .8vmax;">
                     We understand that plans can change, and we sincerely apologize for any inconvenience <br> caused. If you have any further questions or need assistance, please don't hesitate to <br> contact our support team at [ak1933929@gmail.com/8962834895].
                  </p>
                  <p style="font-size: .8vmax;">
                      We hope to have the opportunity to serve you in the future for your vehicle rental needs.
                  </p>
                  <p style="font-size: .8vmax;">
                    Thank you for considering Shery Ride, and we wish you the best.
                  </p>

                  Best regards,
                  <br>
                  Shery Ride Team
                  <br>
                  [Your Website URL]
             `   
        
        }
        const result = await transport.sendMail(details);

        return result;
    } catch (err) {
        return err;
    }
}
 
module.exports = mailer2;