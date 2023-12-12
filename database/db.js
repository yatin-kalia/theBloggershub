import mongoose from "mongoose"

 const Connection = async(username,password) => {
    const url = `mongodb+srv://${username}:${password}@blog-app.f3qb9rm.mongodb.net/?retryWrites=true&w=majority`
    try{
        await mongoose.connect(url,{useNewUrlParser:true});
        console.log("Database connected successfully");

    } catch(error){
        console.log("Error while connecting the database",error);
    }
};
export default Connection;