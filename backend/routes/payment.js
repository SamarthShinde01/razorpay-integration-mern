import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/payment.js";

const router = express.Router();

const razorpayInstance = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_SECRET,
});

// ROUTE 1 : Create Order Api Using POST Method http://localhost:5000/api/payment/order
router.post("/order", (req, res) => {
	const body = req.body;

	try {
		const options = {
			amount: Number(body.amount * 100),
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		razorpayInstance.orders.create(options, (error, order) => {
			if (error) {
				console.log(error);
				return res.status(500).json({ message: "Something Went Wrong!" });
			}
			res.status(200).json({
				data: order,
			});
			console.log(order);
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

// ROUTE 2 : Create Verify Api Using POST Method http://localhost:5000/api/payment/verify
router.post("/verify", async (req, res) => {
	const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
		req.body;

	try {
		// Create Sign
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		console.log(req.body);
		// Create ExpectedSign
		const expectedSign = crypto
			.createHmac("sha256", process.env.RAZORPAY_SECRET)
			.update(sign.toString())
			.digest("hex");

		// Create isAuthentic
		const isAuthentic = expectedSign === razorpay_signature;
		console.log(isAuthentic);
		// Condition
		if (isAuthentic) {
			const payment = new Payment({
				razorpay_order_id,
				razorpay_payment_id,
				razorpay_signature,
			});

			await payment.save();

			res.json({
				message: "Payment Successfully",
			});
		} else {
			res.status(400).json({ message: "Payment verification failed!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

export default router;
