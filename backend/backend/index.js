import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors"
import Razorpay from "razorpay";
import  UserRouter from "./routes/user_routes.js"
import TicketRouter from "./routes/ticket_route.js"
import cookieParser from "cookie-parser";
import cron from 'node-cron'
import crypto from 'crypto';
import path from 'path';
import Ticket from "./models/ticket_model.js";

dotenv.config();

const app=express();
app.use(cors())
app.use(express.json())
app.use(cookieParser())

mongoose
    .connect(process.env.MONGO)
    .then(()=>{
        console.log("Database is connected")
    })
    const __dirname = path.resolve();
app.listen(3000,()=>{
    console.log("Server is running on port 3000")
});

cron.schedule('0 0 * * *', async () => {
 try {
    const result=Ticket.updateMany(
        { expiryDate: { $lt: new Date() }, status: 'available' },
        { $set: { status: 'expired' } }
    )
    console.log('Expired tickets updated:', result.modifiedCount);
 } catch (error) {
    console.error('Error updating expired tickets:', error);
 }
    
  
})

const razorpay = new Razorpay({
    key_id: 'rzp_test_uq83ufnV8txFFP', // Replace with your Razorpay key
    key_secret: 'B7J5p6Nw6Q1cPNTLgEdkMOV9', // Replace with your Razorpay secret
  });
  
  // Endpoint to create an order
  app.post('/backend/create-order', async (req, res) => {
    try {
      const { amount } = req.body;
      const order = await razorpay.orders.create({
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        receipt: `receipt_${Math.floor(Math.random() * 1000)}`,
      });
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Endpoint to verify payment
  app.post('/backend/verify-payment', async (req, res) => {
    console.log('Received payment verification request:', req.body);
    try {
      const { paymentId, orderId, signature } = req.body;
  
      // Verify payment signature
      const hmac = crypto.createHmac('sha256', 'B7J5p6Nw6Q1cPNTLgEdkMOV9'); // Replace with your Razorpay secret
      const expectedSignature = hmac.update(`${orderId}|${paymentId}`)
                                    .digest('hex');
  
      if (expectedSignature === signature) {
        res.json({ success: true });
      } else {
        res.status(400).json({ error: 'Signature verification failed' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

app.use("/backend/user",UserRouter);
app.use("/backend/ticket",TicketRouter)

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
})

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode ||500;
    const message=err.message || "Internal Server Error"
 return res.status(statusCode).json({
    success:false,
    statusCode,
    message
 })
})