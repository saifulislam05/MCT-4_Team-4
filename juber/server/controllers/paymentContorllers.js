import { razorpay } from "../server.js";

export const checkout = async (req, res) => {
  const options = {
    amount : Number(req.body.amount * 100),
    currency : "INR",
  }

  const order = await razorpay.orders.create(options);
  res.status(200).json({success : 200 , order})
} 


export const paymentVerification = async (req, res) => {
  res.status(200).json({success : 200 })
} 



