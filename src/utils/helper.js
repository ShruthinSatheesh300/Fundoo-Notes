import nodemailer  from  "nodemailer";
import logger, { logStream } from '../config/logger';


export const sendMail =(email, token) => {
    const transport = nodemailer.createTransport({
        
            service:"gmail",
            auth:  {
                user: process.env.SENDERS_ID,
                pass: process.env.PASSWORD
            }
        })
        
        
    
    const mailOption = {
        from: process.env.SENDERS_ID,
        to:email,
        subject: "Password Reset Link ",
        html: `<h1>Link:><a href="http://localhost:3000/${token}">click here</a></h1>`
    }
    transport.sendMail (mailOption,(err, info) => {
         if(err){
        
          logger.log('error', err) 
         }
         else{
          logger.log('info',info);
         }
       
    }
    )
}