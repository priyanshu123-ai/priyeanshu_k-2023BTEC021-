import express from "express"
import mongoose from "mongoose"


const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },

    imageUrl:{
        type:String,
        default:""
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})


export const Blog = mongoose.Schema("Blog",blogSchema)