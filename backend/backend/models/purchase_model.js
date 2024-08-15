import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  paymentId:{
    type:String,
    required:true,
},
},{timestamps:true});

const Purchase = mongoose.model('Purchase', purchaseSchema);
export default Purchase