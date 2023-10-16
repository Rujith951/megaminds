import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("MM-USER-TOKEN");
		if (token) {
			navigate("/");
		}
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();

		let response = await (
			await fetch("http://127.0.0.1:8000/apis/login/", {
				method: "POST",
				body: JSON.stringify({
					email,
					password,
				}),
			})
		).json();
		if (response.error == "no") {
			localStorage.setItem("MM-USER-TOKEN", JSON.stringify(response.token));
			localStorage.setItem("MM-USER-ID", JSON.stringify(response.data.id));
			navigate("/");
		}
	};

	return (
		<div className="h-full w-full flex justify-center items-center flex-col">
			<div className="h-full w-[320px] sm:h-[380px] sm:w-[250px] md:h-[380px] md:w-[350px] lg:h-[400px] lg:w-[380px] sm:shadow-2xl  ">
				<h1 className="text-2xl font-semibold h-[40%] flex justify-center items-center p-2">
					Login
				</h1>
				<form onSubmit={handleSubmit} className="h-[60%] p-2 space-y-5 ">
					<div className="h-[20%] flex flex-col justify-center space-y-2">
						<label htmlFor="email-2">Email : </label>
						<input
							type="email"
							id="email-2"
							name="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							placeholder="enter email"
							className="outline-none border-t-2 border-b-2"
						/>
					</div>
					<div className="h-[20%] flex flex-col justify-center space-y-2 ">
						<label htmlFor="password-2">Password : </label>
						<input
							type="password"
							id="password-2"
							name="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							placeholder="enter password"
							className="outline-none border-t-2 border-b-2"
						/>
					</div>
					<h1 className="h-[10%] text-sm ">
						Don't have an account?
						<Link to="/register">
							<span className="text-blue-800">Register here</span>
						</Link>
					</h1>
					<div className="h-[30%] flex justify-center items-center">
						<button
							type="submit"
							className="h-8 w-20 bg-blue-800 rounded-lg text-white"
						>
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
