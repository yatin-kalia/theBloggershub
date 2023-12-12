import mongoose from "mongoose"



export const Connection = async(url) => {
    
    try{
        await mongoose.connect(url,{useNewUrlParser:true});
        console.log("Database connected successfully");

    } catch(error){
        console.log("Error while connecting the database");
    }
}
export default Connection;