import mongoose from "mongoose";
import colors from "colors"

const connectDb = async()=>{
    try {

        await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongoDb connected ${mongoose.connection.host}`.green.underline);
    } catch (error) {
        console.log(`Mongodb ${error}`.bgRed.white)
    }
}

export default connectDb