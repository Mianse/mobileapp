import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required : [true , 'Please provide your name']
    },
    email:{
        type: String,
        required: [true,"Please enter your email address"], 
        unique: true
    },
    password:{
        type: String,
        required: [true,"Password is required"], 
        minLenghth:[8,"password lenght should be greater than 8"]
    },
    address:{
        type: String,
        required: [true,"address is required"], 
    },
    city:{
        type: String,
        required: [true,"Please enter your city"], 
    },
    country:{
        type: String,
        required: [true,"Please enter your Country"], 
    },
    phone:{
        type: String,
        required: [true,"Phone is required"], 
        unique: true
    },profilePic:{
        public_id : {
            type:String
        },
        url: {
            type:String
        },
        
        
    }, answer: {
        type: String,
        required: [true, "answer is required"],
      },role: {
        type: String,
        default: "user",
      },
},{timestamps:true});

//hash funtion
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password,10)

})

//compare function
userSchema.methods.comparePassword = async function(plainPassword){
    return await bcrypt.compare(plainPassword,this.password);
}
//JWT TOKEN
userSchema.methods.generateToken = function () {
    return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  };

export const userModel = mongoose.model("Users",userSchema);
export default userModel