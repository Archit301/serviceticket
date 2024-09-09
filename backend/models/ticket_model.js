import mongoose from "mongoose";

const ticketSchema=new mongoose.Schema({
    coverImage:{
        type:Array,
        required:true,
    },
    ticketName:{
        type:String,
        required:true,
        unique:true
    },
    ticketDescription: {
        type: String,
        required: true,
    },
    ticketPrice: {
        type: Number,
        required: true,
    },
    ticketSeatAvailable: {
        type: Number,
        required: true,
    },
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum:['available','sold out','expired'],
        default:'available',
    },
    category:{
      type:String,
      enum:['sports','adventure','comedy','thriller','others'],
      //default:'sports'
    },
    feedback:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Feedback'
        }
    ],
    purchasedBy:[
        { 
            type: mongoose.Schema.Types.ObjectId,
             ref: 'Purchase' 
            }
        ],
    
        expiryDate: {  // Add expiryDate field
            type: Date,
            required: true,
        },  
    


},{timestamps:true})

 const Ticket=mongoose.model('Ticket',ticketSchema)
export default Ticket;