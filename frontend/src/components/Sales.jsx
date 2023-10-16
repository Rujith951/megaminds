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
		<div>
			{transactions.map(itm => (
				<div
					key={itm.id}
					className="h-[160px] w-[250px] shadow-2xl p-4 space-y-3"
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
