import React, { useEffect, useState } from "react";

function Sales() {
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		fetchTransactions();
	}, []);

	const fetchTransactions = async () => {
		const response = await (
			await fetch("http://127.0.0.1:8000/apis/get-all-transactions/", {
				method: "POST",
				body: JSON.stringify({
					userid: localStorage.getItem("MM-USER-ID"),
				}),
			})
		).json();
		if (response.error == "no") {
			setTransactions(response.data);
		}
	};

	return (
		<div className="flex flex-col items-center space-y-3 p-2 sm:grid sm:grid-cols-2 sm:pl-6 sm:gap-2 lg:grid lg:grid-cols-3 2xl:grid-cols-4 ">
			{transactions.map(itm => (
				<div
					key={itm.id}
					className="h-[160px] inline-block bg-orange-700 w-[280px] shadow-2xl p-4 space-y-3 rounded-md sm:0"
				>
					<p className="text-sm">product_name : {itm.product_id.pname}</p>
					<p className="text-sm">
						product_category : {itm.product_id.pcategory}
					</p>
					<p>tdate: {itm.t_date}</p>
					<p>Amount : {itm.t_amount}</p>
				</div>
			))}
		</div>
	);
}

export default Sales;
