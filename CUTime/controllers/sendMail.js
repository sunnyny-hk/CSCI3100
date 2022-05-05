/*
    Description : backend function for sending email with Gmail services using Google API (oauth2)
    Contributer : Kwok Chun Yin
    Written on : 2022/3/29
    Last modified : 2022/4/8
*/

const nodemailer = require('nodemailer')
const {google} = require('googleapis')

const {OAuth2} = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const {
    MAILING_SERVICE_CLIENT_ID,

    MAILING_SERVICE_CLIENT_SECRET,

    MAILING_SERVICE_REFRESH_TOKEN,

    SENDER_EMAIL_ADDRESS
    
} = process.env

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,

    MAILING_SERVICE_CLIENT_SECRET,

    MAILING_SERVICE_REFRESH_TOKEN,

    OAUTH_PLAYGROUND
)

// send email
const sendEmail = (to, url, msg) => {
    oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN
    })

    const accessToken = oauth2Client.getAccessToken()
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken

        }
    })

    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject: `CUTime - ${msg}`,
        html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the CUTime.</h2>
            <p>Congratulations! You're almost set to start using CUTime.
                Just click the button below to validate your email address.
            </p>
            
            <tr><td align="center"><a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${msg}</a></td></tr>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        
            <div>${url}</div>
            </div>
        `
    }


    smtpTransport.sendMail(mailOptions, (err, infor) =>{
        if (err) return err;
        return infor
    })
}


module.exports = sendEmail