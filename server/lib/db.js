import mongoose from "mongoose";

export const connectDB =async () =>{
    try{
        const connectionString = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected`);
    }
    catch (error){
        console.log("Error in connectiong with MongoDB",error);
        process.exit(1);
    }
}
