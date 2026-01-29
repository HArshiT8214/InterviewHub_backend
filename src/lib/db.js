import mongoose from "mongoose";
import {ENV} from "./env.js";

export const connectDB = async()=>{
    try {
        if(!ENV.DB_URL){
            throw new Error("DB_URL IS NOT DEFINED IN THE ENV VARIABLE")
        }
        // console.log(ENV.DB_URL);
        const conn = await mongoose.connect(ENV.DB_URL);
        console.log("✅ connected to the Database",conn.connection.host);
    } catch (error) {
        console.log("❌Error connecting the DataBase",error);
        process.exit(1);
    }
};

