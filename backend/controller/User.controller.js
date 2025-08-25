

export const register = async(req,res) => {
    try {

        const {name,email,password} = req.body;

        if(!name || !email || !password){
            return res.status(401).json({
                success:false,
                message:"All field are required"
            })
        }
        
    } catch (error) {
        
    }
}