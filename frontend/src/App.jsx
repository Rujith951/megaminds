import React, { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Sales from "./components/Sales";

function App() {
	return (
		<div className="h-screen w-screen">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Navigate to="/dashboard" replace />} />
					<Route path="/dashboard" element={<Dashboard />}>
						<Route index element={<Products />} />
						<Route path="sales" element={<Sales />} />
					</Route>
					<Route path="/login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
