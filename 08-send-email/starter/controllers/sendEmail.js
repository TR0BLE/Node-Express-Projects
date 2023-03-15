const nodemailer = require('nodemailer')

const sendEmail = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount()
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'modesto.veum@ethereal.email',
            pass: 'Ax8MNYqCmZACM8T9EW'
        }
    });
    let info = await transporter.sendMail({
        from: "Trouble <sendmailtest@yopmail.com>",
        to: '<prabal.jain@daffodilsw.com>',
        subject: 'EMAIL SETUP',
        html: '<h2>Sending eMail From NodeJs</h2>'
    })
    res.send(info)
}

module.exports = sendEmail