import { Blog } from "../model/blog.js";
import cloudniary from "../utils/Cloudniary.js";
import getDataUri from "../utils/datauri.js";

export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(401).json({
        success: false,
        message: "All content required",
      });
    }
    let imageUrl = "";  // when we upload key of file name must be file
    if (req.file) {
      const fileUrl = getDataUri(req.file);
      const cloudResponse = await cloudniary.uploader.upload(fileUrl.content, {
        resource_type: "auto",
      });
      imageUrl = cloudResponse.secure_url;
    }

    const blog = await Blog.create({
      title,
      content,
      imageUrl,
      user: req.userId,
    });
    const populatedBlog = await Blog.findById(blog._id).populate(
      "user",
      "name email"
    );
    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: populatedBlog,
    });
  } catch (error) {
    console.log(error);
 
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBlogs = async (req,res) => {
    try {
        const blogs = await Blog.find()
          return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blogs
    });


        
    } catch (error) {
        console.log(error);
 
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  
        
    }
}
