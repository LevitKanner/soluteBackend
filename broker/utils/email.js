const { google } = require('googleapis')
const nodemailer = require('nodemailer')

const authClient = new google.auth.OAuth2(process.env.EMAIL_CLIENT_ID,
    process.env.EMAIL_CLIENT_SECRET,
    process.env.EMAIL_REDIRECT_URI)

authClient.setCredentials({refresh_token: process.env.EMAIL_REFRESH_TOKEN})

module.exports = async ({ to, subject, body }) => {
    const accessToken = await authClient.getAccessToken();

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'lkanner21',
            clientId: process.env.EMAIL_CLIENT_ID,
            clientSecret: process.env.EMAIL_CLIENT_SECRET,
            refreshToken: process.env.EMAIL_REFRESH_TOKEN,
            accessToken
        }
    })

    const mailOptions = {
        from: 'SOLUTE',
        to,
        subject,
        text: body
    }
    try {
        const result = await transport.sendMail(mailOptions)
        return result
    } catch (error) {
        throw error;
    }
}