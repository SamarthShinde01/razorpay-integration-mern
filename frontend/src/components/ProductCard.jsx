import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Button,
} from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ProductCard() {
	const [amount, setamount] = useState(350);

	// handlePayment Function
	const handlePayment = async () => {
		try {
			const res = await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/api/payment/order`,
				{ amount }
			);

			const data = res.data;
			console.log(data);
			handlePaymentVerify(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	// handlePaymentVerify Function
	const handlePaymentVerify = async (data) => {
		const options = {
			key: import.meta.env.RAZORPAY_KEY_ID,
			amount: data.amount,
			currency: data.currency,
			name: "Arun Kumar",
			description: "Test Mode",
			order_id: data.id,
			handler: async (response) => {
				console.log("response", response);
				try {
					const res = await axios.post(
						`${import.meta.env.VITE_BACKEND_URL}/api/payment/verify`,
						{
							razorpay_order_id: response.razorpay_order_id,
							razorpay_payment_id: response.razorpay_payment_id,
							razorpay_signature: response.razorpay_signature,
						}
					);

					const verifyData = res.data;

					if (verifyData.message) {
						toast.success(verifyData.message);
					}
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#5f63b8",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

	return (
		<Card className="mt-6 w-96 bg-[#222f3e] text-white">
			<CardHeader color="" className="relative h-96 bg-[#2C3A47]">
				<img
					src="https://codeswear.nyc3.cdn.digitaloceanspaces.com/tshirts/pack-of-five-plain-tshirt-white/1.webp"
					alt="card-image"
				/>
			</CardHeader>

			<CardBody>
				<Typography variant="h5" className="mb-2">
					My First Product
				</Typography>

				<Typography>
					₹350 <span className=" line-through">₹699</span>
				</Typography>
			</CardBody>

			<CardFooter className="pt-0">
				<Button onClick={handlePayment} className="w-full bg-[#1B9CFC]">
					Buy Now
				</Button>
				<Toaster />
			</CardFooter>
		</Card>
	);
}
