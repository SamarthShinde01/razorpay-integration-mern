import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";

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

export default router;
