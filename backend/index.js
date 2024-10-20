import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./db/db.js";
import paymentRoute from "./routes/payment.js";

connectDB();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	return res.json({ message: "server is running.." });
});

app.use("/api/payment", paymentRoute);

app.listen(PORT, () => console.log("server is running on PORT", PORT));
