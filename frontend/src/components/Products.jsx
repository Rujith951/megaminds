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
		<div className="flex flex-col items-center space-y-3 p-2 sm:grid sm:grid-cols-2 sm:pl-6 sm:gap-2 lg:grid lg:grid-cols-3 2xl:grid-cols-4 ">
			{products.map(itm => (
				<div
					key={itm.id}
					className="h-[160px] inline-block bg-orange-700 w-[280px] shadow-2xl p-4 space-y-3 rounded-md md:w-[320px] md:h-[180px]"
				>
					<p className="text-sm">product_name : {itm.p_name}</p>
					<p className="text-sm">product_category : {itm.p_category}</p>
				</div>
			))}
		</div>
	);
}

export default Products;
