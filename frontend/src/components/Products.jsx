import React, { useEffect, useState } from "react";

function Products() {
	const [products, setProducts] = useState([]);
	console.log(products);

	useEffect(() => {
		fetchPoducts();
	}, []);

	const fetchPoducts = async () => {
		const response = await (
			await fetch("http://127.0.0.1:8000/apis/get-all-products/", {
				method: "POST",
				body: JSON.stringify({
					userid: localStorage.getItem("MM-USER-ID"),
				}),
			})
		).json();
		if (response.error == "no") {
			setProducts(response.data);
		}
	};

	return (
		<div className="h-full w-full grid grid-cols-5 gap-3">
			{products.map(itm => (
				<div
					key={itm.id}
					className="h-[160px] w-[250px] shadow-2xl p-4 space-y-3"
				>
					<p className="text-sm">product_name : {itm.p_name}</p>
					<p className="text-sm">product_category : {itm.p_category}</p>
				</div>
			))}
		</div>
	);
}

export default Products;
