import mongoose from "mongoose"
const categorySchema = new  mongoose.Schema({
     category:{
        type:String,
        required: [true, 'Please provide a name for the category']
       } //this will add
} ,{timestamps: true})

export const  categoryModel = mongoose.model("Category", categorySchema)
export default categoryModel