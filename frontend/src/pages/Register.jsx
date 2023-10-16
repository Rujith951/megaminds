import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("MM-USER-TOKEN");
		if (token) {
			navigate("/");
		}
	}, []);

	const addVendor = async e => {
		e.preventDefault();
		let vObj = {
			name: name,
			email: email,
			password: password,
		};
		let response = await (
			await fetch("http://127.0.0.1:8000/apis/register/", {
				method: "POST",
				body: JSON.stringify({
					...vObj,
				}),
			})
		).json();
		if (response.error == "no") {
			localStorage.setItem("MM-USER-TOKEN", JSON.stringify(response.token));
			localStorage.setItem("MM-USER-ID", JSON.stringify(response.data.id));
			navigate("/");
		}

		setEmail("");
		setName("");
		setPassword("");
	};

	return (
		<div className="h-full w-full sm:flex sm:justify-center sm:items-center">
			<div className=" h-full p-2 sm:h-[300px] sm:w-[250px] md:h-[320px] md:w-[270px] lg:h-[340px] lg:w-[290px] sm:flex sm:flex-col sm:justify-center sm:items-center sm:shadow-2xl md:shadow-2xl">
				<h1 className="h-[20%] text-lg font-semibold flex items-end">
					Register Form
				</h1>
				<form onSubmit={addVendor} className="h-[80%]">
					<div className="h-[30%] flex flex-col justify-end ">
						<label htmlFor="name">Name : </label>
						<input
							type="text"
							id="name"
							value={name}
							name="name"
							onChange={e => setName(e.target.value)}
							required
							className="border-2 shadow-2xl outline-none "
						/>
					</div>
					<div className="h-[30%] flex flex-col justify-center ">
						<label htmlFor="email-1">Email : </label>
						<input
							type="email"
							id="email-1"
							value={email}
							name="email"
							onChange={e => setEmail(e.target.value)}
							required
							className="border-2 shadow-2xl outline-none "
						/>
					</div>
					<div className="h-[20%] flex flex-col justify-start ">
						<label htmlFor="password-1">Password : </label>
						<input
							type="password"
							id="password-1"
							value={password}
							name="password"
							onChange={e => setPassword(e.target.value)}
							required
							className="border-2 shadow-2xl outline-none "
						/>
					</div>
					<div className="h-[20%] flex items-center justify-center pt-5  ">
						<button
							type="submit"
							className="h-8 w-20 bg-blue-800 text-white rounded-lg"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Register;
