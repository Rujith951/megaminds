import React, { useEffect } from "react";
import { useNavigate, Link, Outlet, useSearchParams } from "react-router-dom";

function Dashboard() {
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("MM-USER-TOKEN");
		if (!token) {
			navigate("/login");
		}
	}, []);

	const removeToken = () => {
		localStorage.removeItem("MM-USER-TOKEN");
		localStorage.removeItem("MM-USER-ID");
		navigate("/login");
	};

	return (
		<div className="h-full w-full bg-green-500">
			{/* navbar */}
			<div className="h-[15%] w-full flex justify-between items-center p-4 bg-orange-500 ">
				<Link to="sales">
					<button
						className={`${
							window.location.href.includes("sales")
								? "bg-blue-500"
								: "bg-blue-800"
						} h-8 p-2 flex justify-center items-center rounded-lg text-white`}
					>
						Transactions
					</button>
				</Link>
				<button
					onClick={removeToken}
					className="h-8 w-20 bg-blue-800 rounded-lg text-white"
				>
					LOGOUT
				</button>
			</div>
			{/* outlet for product and transactions */}
			<div className="h-[85%]	overflow-y-scroll scrollbar-hide ">
				<Outlet />
			</div>
		</div>
	);
}

export default Dashboard;
