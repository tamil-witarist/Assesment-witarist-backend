const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    email:{
       type:String,
       isAdmin:false,
       require
    },
    password:{
        type:String,
        require
    }
})
const Employees=mongoose.models.employees||mongoose.model("employees",userSchema)

module.exports=Employees;