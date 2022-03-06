import nodemailer from "nodemailer";
import logger, { logStream } from '../config/logger';


export const sendMail = (email, token) => {
    const transport = nodemailer.createTransport({

        service: "gmail",
        auth: {
            user: process.env.SENDERS_ID,
            pass: process.env.PASSWORD
        }
    })



    const mailOption = {
        from: process.env.SENDERS_ID,
        to: email,
        subject: "Password Reset Link ",
        html: `<h1>Link:><a href="http://localhost:3000/${token}">click here</a></h1>`
    }
    return new Promise((resolve, reject) => {
        transport.sendMail(mailOption, (err, info) => {
            if (info) {
                logger.log('info', info);
                return resolve('Reset link sent successfully');
            }else {
                logger.log('error', err);
                return reject('Error in sending Link');
            }
    
    });
})
}