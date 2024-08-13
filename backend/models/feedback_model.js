import { defaultSerializeQueryArgs } from "@reduxjs/toolkit/query";
import mongoose from "mongoose";

const feedbackSchema=new mongoose.Schema({
    ticketId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Ticket',
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Ticket',
        required:true 
    },
    purchaseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Purchase',
    },
    comment:{
        type:String,
        trim:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Feedback=mongoose.model('Feedback',feedbackSchema)
export default Feedback;