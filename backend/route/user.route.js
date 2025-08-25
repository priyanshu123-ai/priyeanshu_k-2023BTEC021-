import express from "express"
import { register } from "../controller/User.controller.js"

const userRoute = express.Router()

userRoute.post("/register",register)

export default userRoute