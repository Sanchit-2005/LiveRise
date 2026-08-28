import mongoose, { Schema } from "mongoose";

const meetingSchema=new Schema({
    userId:{
      type:String
    },
    meetingId:{
        type:String
    },
    date:{
        type:Date,
        // default:Date.now,
        required:true,
        default:Date.now
    }
})


const Meeting=new mongoose.Model("Meeting",meetingSchema);
export {Meeting};