import express from "express"
import dotenv from "dotenv"
import database from "./utils/database.js"
import userRoute from "./route/user.route.js"
import blogRoute from "./route/blog.route.js"
import cookieParser from "cookie-parser"

dotenv.config()

const app = express()

const port = process.env.PORT || 4000
app.use(express.json())

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))



database()

app.use("/api/v1",userRoute)
app.use("/api/v2",blogRoute)

app.listen(port,() =>{
    console.log(`Server is running on port ${port}`);
})

