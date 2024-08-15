import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import  User  from "../models/user_model.js";
import mongoose from "mongoose";
import { errorHandler } from "../utils/error.js";
import BankDetails from "../models/bankdetail_model.js";
 const genratetoken=(user)=>{
    return jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET);
 }
export const test=(req,res)=>{
    res.json({
        message:"Hello World"
    })
};


export const signup=async(req,res,next)=>{
 
  let   newUser="";
    const {username,email,password,role}=req.body;
    const hashpassword=bcryptjs.hashSync(password,10);
    if(role==="user"||role==="superadmin"){
      newUser= new User({username,email,password:hashpassword,role});
    }
    else {
        newUser= new User({username,email,password:hashpassword,role,requestStatus:"pending"}); 
    }
    try {
     await newUser.save()
     res.status(201).json("User created successfully");   

    } catch (error) {
    next(error);
        
    }
}

export const signin=async(req,res,next)=>{
    const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
   const { password: pass, ...rest } = validUser._doc;
    res
    .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
}

//.cookie('access_token', token, { httpOnly: true })

 export const viewAdminRequests=async (req,res)=>{
    try {
         const requests=await User.find({  requestStatus: 'pending' })
         res.status(200).json(requests);
     } catch (error) {
        res.status(error);  ;
     }
 }

 export const AllRequests=async (req,res)=>{
    try {
        const user= await User.find({ role: { $ne: 'superadmin' } });
       // const users=await User.countDocuments({ role: { $ne: 'superadmin' }})
         res.status(200).json(user);
     } catch (error) {
        res.status(error);    ;
    }
 }

 export const userlisting=async(req,res)=>{
    try {
        const user=await User.find({role:'user'});
        res.status(200).json(user);
    } catch (error) {
        res.status(error);   
    }
 }


 export const superadmindelete=async(req,res)=>{
    try{
        const { id } = req.body;
    
            // Check if the ID is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }
    
            // Check if the user exists
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const result = await User.findByIdAndDelete(id);
            if (result.modifiedCount === 0) {
                return res.status(304).json({ message: 'Document was found but not modified' });
            }
            
            res.status(200).json({ message: 'Account has been deleted' });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
 }

 export const acceptrequest=async(req,res)=>{
    try {
        const { id } = req.body;

        // Check if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Check if the user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const result = await User.updateOne({ _id: id }, { $set: { requestStatus: 'approved' } });
        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'Document was found but not modified' });
        }

        res.status(200).json({ message: 'Account has been updated' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
 }

 export const declinerequest=async(req,res)=>{
    try{
    const { id } = req.body;

        // Check if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Check if the user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const result = await User.updateOne({ _id: id }, { $set: { requestStatus: 'denied',role:"user" } });
        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'Document was found but not modified' });
        }
        
        res.status(200).json({ message: 'Account has been updated' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
 }
// export const approveAdmin=async (req,res)=>{
//     const {email}=req.body;
//     try {
//        const user=await User.findOne({email}) ;
//        if (!user || user.requestStatus !== 'pending') {
//         return res.status(400).json({ message: 'No pending admin request for this user.' });
//     }
//     user.role = 'admin';
//     user.requestStatus = 'approved';
//     await user.save();

//     } catch (error) {
//         console.log(error);
//     }
// }


export const user=async(req,res,next)=>{
    const {id}=req.params;
    try {
        const user=await User.findById(id);
        if(!user) return;
       await res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const bankdetail=async(req,res)=>{
    try {
        const { adminId, bankName, accountNumber, accountHolderName, branchName, ifscCode, swiftCode,phoneNumber,preferredOption } = req.body;
    
        // Check if bank details already exist for the admin
        let bankDetails = await BankDetails.findOne({ adminId });
    
        if (bankDetails) {
            bankDetails.bankName = bankName || bankDetails.bankName;
            bankDetails.accountNumber = accountNumber || bankDetails.accountNumber;
            bankDetails.accountHolderName = accountHolderName || bankDetails.accountHolderName;
            bankDetails.branchName = branchName || bankDetails.branchName;
            bankDetails.ifscCode = ifscCode || bankDetails.ifscCode;
            bankDetails.swiftCode = swiftCode || bankDetails.swiftCode;
            bankDetails.phonenumber = phonenumber || bankDetails.phonenumber;
            bankDetails.preferedOption = preferedOption || bankDetails.preferedOption;
            bankDetails.updatedAt = Date.now();
          
            await bankDetails.save();
        } else {
          // Create new bank details
          bankDetails = new BankDetails({
            adminId,
            bankName,
            accountNumber,
            accountHolderName,
            branchName,
            ifscCode,
            swiftCode,
            phoneNumber,
            preferredOption
          });
    
          await bankDetails.save();
        }
    
        res.status(200).json(bankDetails);
      } catch (error) {
        res.status(500).json({ message: 'Error saving bank details', error });
      }
}


export const updateUser=async(req,res,next)=>{
//     if(req.user.id!==req.params.id)
//   return next(errorHandler(401, 'You can only update your own account!'))
 try {
    if(req.body.password)
    {
        req.body.password = bcryptjs.hashSync(req.body.password, 10); 
    }
    const updatedUser=await User.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
              }, 
        },
        { new: true }
    )  
    const { password, ...rest } = updatedUser._doc;  
    res.status(200).json(rest);
 } catch (error) {
    next(error); 
 }
}


export const deleteUser = async (req, res, next) => {
    // if (req.user.id !== req.params.id)
    //     return next(errorHandler(401, 'You can only delete your own account!'));
    try {
        await User.findByIdAndDelete(req.params);
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted!');
 } catch (error) {
    next(error); 
 } 
 
}




export const signout= async (req,res,next)=>{
    try {
      res.clearCookie('access_token')
      res.status(200).json('User has been logged out!');
    } catch (error) {
      next(error)
    }
  }
