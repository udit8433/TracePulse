import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({
    path: "../.env"
});


export const transporter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
})

// 2. Create email function
const sendEmail = async (to, subject, message) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text: message
        });

        console.log("Email sent successfully!");
        console.log(info.messageId);

    } catch (error) {
        console.log("Email failed:", error.message);
    }
};

export default sendEmail;