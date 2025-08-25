export const createBlog = async (req,res) => {
    try {
        const {title,content} = req.body;

        if(!title || !content){
            return res.status(401).json({
                success:false,
                message:"All content required"
            })
        }
        
    } catch (error) {
        console.log(error)
        
    }
}