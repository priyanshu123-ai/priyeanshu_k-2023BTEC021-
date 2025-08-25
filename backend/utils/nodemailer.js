import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config();

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
})

async function sendRegisterEmail(email) {
  try {
      await transporter.sendMail({
        from:process.env.EMAIL_USER,
        to:email,
        subject:"Welcome to register",
        text:"Welcome to the blog app"
    })
    console.log("Email sent Successfully")
    
  } catch (error) {
    console.log(error)
    
  }
    
}

export default sendRegisterEmail