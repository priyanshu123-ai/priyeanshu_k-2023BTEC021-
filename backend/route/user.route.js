import express from "express"
import { login, register } from "../controller/User.controller.js"

const userRoute = express.Router()

userRoute.post("/register",register)
userRoute.post("/login",login)

export default userRoute