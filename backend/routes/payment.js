import express from "express";

const router = express.Router();

router.get("/get-payment", (req, res) => {
	res.json({ message: "Payment Details" });
});

export default router;
