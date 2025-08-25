import { User } from "../model/User.js";
import bcrypt from "bcryptjs";
import sendRegisterEmail from "../utils/nodemailer.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(401).json({
        success: false,
        message: "All field are required",
      });
    }

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(401).json({
        success: false,
        message: "User Already exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await sendRegisterEmail(email);

    const user = await User.create({
      name: name,
      email: email,
      password: hashPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "All field are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(401).json({
        success: true,
        message: "Password does not match",
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    return res
      .status(201)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,

        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })
      .json({
        success: true,
        message: "Login Successfull",
        user,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
