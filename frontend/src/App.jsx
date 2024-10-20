function App() {
	return (
		<section className="flex justify-center items-center h-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white">
			{/* Main  */}
			<main>
				{/* Top  */}
				<div className="flex justify-center items-center space-x-4 mb-3">
					<img
						className="w-16 lg:w-28"
						src="https://www.devknus.com/img/react.png"
						alt="react logo"
					/>
					<img
						className="w-8 lg:w-10"
						src="https://cdn-icons-png.flaticon.com/128/10238/10238173.png"
						alt=""
					/>
					<img
						className="w-40 lg:w-72"
						src="razorpay.png"
						alt="razorpay logo"
					/>
				</div>
				{/* Bottom  */}
				<h1 className=" text-xl text-center lg:text-3xl font-bold"></h1>
			</main>
		</section>
	);
}

export default App;
