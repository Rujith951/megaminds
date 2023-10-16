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
		<div className="h-full">
			<div className="h-[15%] shadow-xl border-b-2 flex items-center justify-between ">
				<div className="w-[30%] h-full  flex items-center space-x-2 p-5 ">
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
				</div>
				<div className="w-[30%] h-full flex items-center justify-end p-5 ">
					<button
						onClick={removeToken}
						className="h-8 w-20 bg-blue-800 rounded-lg text-white"
					>
						LOGOUT
					</button>
				</div>
			</div>
			<div className="h-[85%] p-5">
				<Outlet />
			</div>
		</div>
	);
}

export default Dashboard;
