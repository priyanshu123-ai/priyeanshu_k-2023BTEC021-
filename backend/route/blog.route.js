import express from "express"
import { createBlog, getAllBlogs } from "../controller/Blog.controller.js"
import isAuth from "../middleware/isAuth.js"
import { singleUpload } from "../utils/multer.js"

const blogRoute = express.Router()

blogRoute.post("/blog",singleUpload,createBlog)
blogRoute.get("/getAllblog",getAllBlogs)

export default blogRoute