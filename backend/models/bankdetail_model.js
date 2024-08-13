import mongoose from "mongoose";

const bankDetailSchema=new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Admin'
      },
      bankName: {
        type: String,
        required: true
      },
      accountNumber: {
        type: String,
        required: true,
        unique: true
      },
      accountHolderName: {
        type: String,
        required: true
      },
      branchName: {
        type: String,
        required: true
      },
      ifscCode: {
        type: String,
        required: true
      },
      swiftCode: {
        type: String
      },
      phoneNumber:{
        type: Number,
        required:true
      },
      preferredOption:{
        type:String,
        enum:['upi','bank'],
         required:true
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
})


const BankDetails = mongoose.model('BankDetails', bankDetailSchema);
export default BankDetails;