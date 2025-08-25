import { User } from "../model/User.js";
import bcrypt  from "bcryptjs"
import sendRegisterEmail from "../utils/nodemailer.js";


export const register = async(req,res) => {
    try {

        const {name,email,password} = req.body;

        if(!name || !email || !password){
            return res.status(401).json({
                success:false,
                message:"All field are required"
            })
        }

        const existUser = await User.findOne({email})

        if(!existUser){
            return res.status(401).json({
                success:false,
                message:"User Already exist"
            })
        }

        const hashPassword = await bcrypt.hash(password,10)

        await sendRegisterEmail(email)

        const user = await User.create({
            name:name,
            email:email,
            password:hashPassword,

        })

        return res.status(201).json({
            success:true,
            message:"User created successfully",
            user
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}