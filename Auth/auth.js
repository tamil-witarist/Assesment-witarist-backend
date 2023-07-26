const jwt=require('jsonwebtoken');
const SECRET_KEY="TW2aI0mt2ia3lr2Is5T";

const Auth=(req,res,next)=>{
   try{
      const token=req.body.Token
       const user=jwt.verify(token,SECRET_KEY)
    // console.log("user ",user)//    console.log(token)
       req.token=user
       req.body=req.body.updated
       next()
    }catch(error){
       res.send({message:"error",error})
    }
}
module.exports=Auth;