import Ticket from "../models/ticket_model.js";
import User from "../models/user_model.js";
import mongoose, { model } from "mongoose";
import { errorHandler } from "../utils/error.js";
import Purchase from "../models/purchase_model.js";
import Feedback from "../models/feedback_model.js";


export const test=(req,res)=>{
    res.json({
        message:"Hello World"
    })
};


export const createticket=async(req,res,next)=>{
   const {coverImage,ticketName,ticketDescription,ticketPrice,ticketSeatAvailable,adminId,status,feedback,category,expiryDate}=req.body;
   const user= await User.findById(adminId);
//    if (!user || user.role !== 'admin' || user.requestStatus !== 'approved') {
//     return next(errorHandler(401, 'Not allowed to create a ticket!'));
// }
   try {
         const newTicket=new Ticket({coverImage,ticketName,ticketDescription,ticketPrice,ticketSeatAvailable,adminId,status,feedback,category,expiryDate})
        await newTicket.save();
        res.status(201).json("Ticekt created successfully"); 
   } catch (error) {
    next(error)
   }
}

export const deleteTicket=async(req,res,next)=>{
   const {id}=req.body;
      try{
     if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).json({ message: 'Invalid ID format' });
     }
    const user = await Ticket.findById(id);
    if (!user) {
        return res.status(404).json({ message: 'Ticket not found' });
    }
    const result = await Ticket.findByIdAndDelete(id);
    res.status(200).json({ message: 'Ticket has been deleted' });
} catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
}

}

// export const updateTicket=async(res,req)=>{
//   try {
//     const updatedUser=await Ticket.findByIdAndUpdate(
//       req.params.id,
//       {
//           $set: {
//               username: req.body.username,
//               email: req.body.email,
//               password: req.body.password,
//               avatar: req.body.avatar,
//             }, 
//       },
//       { new: true }
//   )  
//   const { password, ...rest } = updatedUser._doc;  
//   res.status(200).json(rest);
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' }); 
//   }
// }











export const countTicket = async (req, res, next) => {
    try {
        const result = await Ticket.countDocuments({ adminId: req.params.id });

        // if (result === 0) {
        //     return res.status(200).json({ message: 'No tickets found' });
        // }
        res.status(200).json( result );
    } catch (error) {
        next(error);
    }
};



export const countsoldoutTicket=async(req,res,next)=>{
    try {
        const result=await Ticket.countDocuments({adminId:req.params.id,status:'sold out'});
        // if(result===0)
        // {
        //     res.status(201).json({message:'No Sold Ticket found'});   
        // }
        res.status(200).json( result );
    } catch (error) {
        next(error)
    }
}


export const countavailableTicket=async(req,res,next)=>{
    try {
        const result=await Ticket.countDocuments({adminId:req.params.id,status:'available'});
        // if(result===0)
        // {
        //     res.status(201).json({message:'No Sold Ticket found'});   
        // }
        res.status(200).json( result );
    } catch (error) {
        next(error)
    }
}


export const countexpiryTicket=async(req,res,next)=>{
    try {
        const result=await Ticket.countDocuments({adminId:req.params.id,status:'expired'});
        // if(result===0)
        // {
        //     res.status(201).json({message:'No Expiry Ticket found'});   
        // }
        res.status(200).json(  result );
    } catch (error) {
        next(error)
    }
}


export const detailticket=async(req,res,next)=>{
    try {
        const tickets = await Ticket.find({ adminId: req.params.id  });
      res.status(200).json(tickets);
    } catch (error) {
       next(error)
    }
}

export const detailticketbyticketid=async(req,res,next)=>{
    const {id}=req.body;
    console.log(id)
    try {
        const tickets = await Ticket.findById( id  );
      res.status(200).json(tickets);
    } catch (error) {
       next(error)
    }
}


export const purchaseTicket=async(req,res)=>{
    const { ticketId, userId,paymentId } = req.body;
  console.log(ticketId);
  // console.log("Payment id wahs",paymentId)
    try {
      // Find the ticket
      const ticket = await Ticket.findById(ticketId)
  
      if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
      if(ticket.status==='expired'||ticket.status==='sold out'){
        return;
      }
  
      // Check if the user has already purchased the ticket
      if (ticket.purchasedBy.includes(userId)) {
        return res.status(400).json({ error: 'You have already purchased this ticket' });
      }
  
      // Check if seats are available
      if (ticket.ticketSeatAvailable <= 0) {
        return res.status(400).json({ error: 'No seats available' });
      }
  
      const purchase = new Purchase({ ticketId, userId,paymentId });
      await purchase.save();
  
      // Update ticket to decrease seat count
      ticket.ticketSeatAvailable -= 1;
      if(ticket.ticketSeatAvailable==0){
        ticket.status="sold out"
      }
      ticket.purchasedBy.push(purchase._id);
      await ticket.save();
  
      res.status(200).send('Ticket purchased successfully.');
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Server error' });
    }
}


//new Date(purchase.createdAt).toLocaleDateString()
export const purchasedetailone=async(req,res)=>{
    const { id } = req.params;
    const {sortBy,orderBy}=req.body;
    console.log(sortBy)
    console.log(orderBy)
  try {
    // Find the ticket by ID and populate the purchasedBy field
    const ticket = await Ticket.findById(id)
    .populate({
        path: 'purchasedBy',
        populate: {
          path: 'userId', 
          select: 'username email avatar createdAt ticketPrice',// Reference to the User model
          model: 'User'
        }
      })
      .exec();

     
      let purchasers = ticket.purchasedBy
      .filter(purchase => purchase.userId) // Ensure userId is not null
      .map(purchase => purchase.userId);
      if (!ticket) return res.status(404).send('Ticket not found.');
      if (sortBy === 'date' && orderBy === 'asc') {
        purchasers = purchasers.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'date' && orderBy === 'desc') {
        purchasers = purchasers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'name' && orderBy === 'asc') {
        purchasers = purchasers.sort((a, b) => a.username.localeCompare(b.username));
    } else if (sortBy === 'name' && orderBy === 'desc') {
        purchasers = purchasers.sort((a, b) => b.username.localeCompare(a.username));
    }
    
    res.status(200).json(
         purchasers); // Send the ticket data with user details
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

export const purchasedetail=async(req,res)=>{
  const { id } = req.params;

try {
  // Find the ticket by ID and populate the purchasedBy field
  const ticket = await Ticket.findById(id)
  .populate({
      path: 'purchasedBy',
      select:' createdAt',
      populate: {
        path: 'userId', 
        select: 'username email avatar createdAt ticketPrice',// Reference to the User model
        model: 'User'
      }
    })
    .exec();
    
    const purchasers = ticket.purchasedBy
    .filter(purchase => purchase.userId) // Ensure userId is not null
    .map(purchase => purchase.userId);
    res.status(200).json(
      purchasers);

} catch (error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
}
}


export const createfeedback=async(req,res,next)=>{
  const {ticketId,userId,comment}=req.body;
  try {
    if (!ticketId || !userId || comment == null) {
      return res.status(400).json({ message: 'Missing required fields' });
  }
  const feedback=new Feedback({
 ticketId,
 userId,
 comment
  })
  await feedback.save();
  await Ticket.findByIdAndUpdate(ticketId, { $push: { feedback: feedback._id } })

  res.status(201).json(feedback);
  } catch (error) {
    next(error);
  }
}

export const getfeedback=async(req,res,next)=>{
  const {ticketId,userId}=req.params;
  try {
    const feedback= await Feedback.findOne({ ticketId, userId });
    if (!feedback) {
      return res.status(404).json({ message: 'No feedback found for this user and ticket.' });
  }
  //console.log(feedback);

  res.status(200).json(feedback);
  } catch (error) {
    next(error)
  }
}


export const totalticketname=async(req,res)=>{
  const { id } = req.params;
  const adminId = id;

  console.log(adminId);

  try {
    // Convert adminId to ObjectId using `new mongoose.Types.ObjectId()`
    const tickets = await Ticket.find({ adminId: new mongoose.Types.ObjectId(adminId) }).exec();

    if (tickets.length === 0) {
      return res.status(404).json({ message: 'No tickets found for the given admin ID.' });
    }

    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export const availableticketname=async(req,res)=>{
  const { id } = req.params;
  const adminId = id;

  console.log(adminId);

  try {
    // Convert adminId to ObjectId using `new mongoose.Types.ObjectId()`
    const tickets = await Ticket.find({ adminId: new mongoose.Types.ObjectId(adminId),status:'available' }).exec();

    if (tickets.length === 0) {
      return res.status(404).json({ message: 'No Available tickets found for the given admin ID.' });
    }

    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export const soldticketname=async(req,res)=>{
  const { id } = req.params;
  const adminId = id;

  console.log(adminId);

  try {
    // Convert adminId to ObjectId using `new mongoose.Types.ObjectId()`
    const tickets = await Ticket.find({ adminId: new mongoose.Types.ObjectId(adminId),status:'sold out' }).exec();

    if (tickets.length === 0) {
      return res.status(404).json({ message: 'No Sold Out tickets found for the given admin ID.' });
    }

    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export const Expiryticketname=async(req,res)=>{
  const { id } = req.params;
  const adminId = id;

  console.log(adminId);

  try {
    // Convert adminId to ObjectId using `new mongoose.Types.ObjectId()`
    const tickets = await Ticket.find({ adminId: new mongoose.Types.ObjectId(adminId),status:'expired' }).exec();

    if (tickets.length === 0) {
      return res.status(404).json({ message: 'No Expiry tickets found for the given admin ID.' });
    }

    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ message: 'Server error' });
  }
}



// ####################  Super Admin ############

export  const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find() // Fetch all tickets from the Ticket collection
                                .populate({
                                  path:'adminId',
                                  select:'username',
                                  model:'User'
                                })
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getavailableticket=async(req,res)=>{
  try {
    // Convert adminId to ObjectId using `new mongoose.Types.ObjectId()`
    const tickets = await Ticket.find({status:'available'})
                                .populate({
                                  path:'adminId',
                                  select:'username',
                                  model:'User'
                                })

    if (tickets.length === 0) {
      return res.status(404).json({ message: 'No Available tickets found ' });
    }

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}


export const getexpiryticket=async(req,res)=>{
  try {
    // Convert adminId to ObjectId using `new mongoose.Types.ObjectId()`
    const tickets = await Ticket.find({status:'expired'})
                                .populate({
                                  path:'adminId',
                                  select:'username',
                                  model:'User'
                                })
    if (tickets.length === 0) {
      return res.status(404).json({ message: 'No Expired tickets found ' });
    }

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}


export const getsoldoutticket=async(req,res)=>{
  try {
    // Convert adminId to ObjectId using `new mongoose.Types.ObjectId()`
    const tickets = await Ticket.find({status:'sold out'})
                                .populate({
                                  path:'adminId',
                                  select:'username',
                                  model:'User'
                                })

    if (tickets.length === 0) {
      return res.status(404).json({ message: 'No Sold out tickets found ' });
    }

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

export const countsoldoutallTicket=async(req,res,next)=>{
  try {
      const result=await Ticket.countDocuments({status:'sold out'});
      res.status(200).json( result );
  } catch (error) {
      next(error)
  }
}

export const countexpiryallTicket=async(req,res,next)=>{
  try {
      const result=await Ticket.countDocuments({status:'expired'});
      res.status(200).json( result );
  } catch (error) {
      next(error)
  }
}

export const countavailableallTicket=async(req,res,next)=>{
  try {
      const result=await Ticket.countDocuments({status:'available'});
      res.status(200).json( result );
  } catch (error) {
      next(error)
  }
}


export const countallTicket=async(req,res,next)=>{
  try {
      const result=await Ticket.countDocuments();
      res.status(200).json( result );
  } catch (error) {
      next(error)
  }
}








////############################ user ##########################


export const latestticket=async(req,res)=>{
  try {
    const tickets = await Ticket.find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order to get the latest tickets first
      .limit(10); // Limit the number of tickets returned (adjust as needed)
    
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

export const latestticketcount=async(req,res)=>{
  try {
    const tickets = await Ticket.find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order to get the latest tickets first
      .limit(8); // Limit the number of tickets returned (adjust as needed)
    
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}



export const sportwise=async(req,res)=>{
  const {category}=req.params
  try {
    const ticket=await Ticket.find({category:category})
              
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error }); 
  }
}



export const checkticket=async(req,res)=>{
  const { ticketId, userId } = req.params;
  try {
    // Check if a purchase record exists for the given ticketId and userId
    const purchase = await Purchase.findOne({ ticketId, userId });

    if (purchase) {
      res.status(200).json({ purchased: true });
    } else {
      res.status(200).json({ purchased: false });
    }
  } catch (error) {
    console.error('Error checking purchase:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



export const usermyticket=async(req,res)=>{
  try {
    const { userId } = req.params;
    const purchases = await Purchase.find({ userId }).populate('ticketId');
    const tickets = purchases.map(purchase => purchase.ticketId);
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}







/////////############# searching##########

export const getTickets = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // Default to 10 if no limit is provided
    const startIndex = parseInt(req.query.startIndex) || 0;
    const searchTerm = req.query.searchTerm || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1;
    const category = req.query.category;

    // Build the query for ticketName with more specific regex
    const query = {
      $or: [
        { ticketName: { $regex: `^${searchTerm}`, $options: 'i' } }, // Starts with the search term
        { ticketName: { $regex: searchTerm, $options: 'i' } }        // Contains the search term
      ]
    };

    if (category && ['sports', 'adventure', 'comedy', 'thriller'].includes(category)) {
      query.category = category;
    }

    // Get total count of matching tickets
    const totalTickets = await Ticket.countDocuments(query);

    // Get tickets with pagination
    const tickets = await Ticket.find(query)
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    // Return results with total count
    return res.status(200).json({
      totalTickets,
      tickets
    });
  } catch (error) {
    next(error);
  }
};




export const editticket=async(req,res)=>{
  try {
    const updatedTicket=await Ticket.findByIdAndUpdate(
      req.params.id,
      {
          $set: {
              ticketName: req.body.ticketName,
              ticketPrice: req.body.ticketPrice,
              ticketDescription: req.body.ticketDescription,
              ticketSeatAvailable:req.body.ticketSeatAvailable,
              coverImage: req.body.coverImage,
              status:req.body.status,
              category:req.body.category,
              expiryDate:req.body.expiryDate,
              adminId:req.body.adminId,
              
            }, 
      },
      { new: true, runValidators: true  }
  )  

  if (!updatedTicket) {
    return res.status(404).json({ message: 'Ticket not found' });
  }

  //const { password, ...rest } = updatedUser._doc;  
  res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: 'Error updating ticket', error });
  }
}