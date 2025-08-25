import express from "express"
import dotenv from "dotenv"
import database from "./utils/database.js"
import userRoute from "./route/user.route.js"

dotenv.config()

const app = express()

const port = process.env.PORT || 4000
app.use(express.json())



database()

app.use("/api/v1",userRoute)

app.listen(port,() =>{
    console.log(`Server is running on port ${port}`);
})

