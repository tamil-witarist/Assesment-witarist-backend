const mongoose=require('mongoose');

async function connect(){
    try{
        mongoose.connect("mongodb+srv://Tamil-Witarist:mypassword@cluster0.xx2pocf.mongodb.net/User-Details")
        const connection=await mongoose.connection;//making mongoose connection
        connection.on('connected',()=>{
           console.log("Database connected") 
        })//confirmation after connected
    }catch(error){
        console.log("Error While Connection",error)
    }
}
module.exports=connect;