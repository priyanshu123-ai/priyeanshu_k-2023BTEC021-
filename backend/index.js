import express from "express"
import dotenv from "dotenv"
import database from "./utils/database.js"
dotenv.config()

const app = express()

const port = process.env.PORT || 4000

database()

app.listen(port,() =>{
    console.log(`Server is running on port ${port}`);
})

