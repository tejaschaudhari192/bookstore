import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/api";

export const Register = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		type: ""
	});
	const userTypes = ["user", "admin"];

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log(formData);
			
			const { data } = await register(formData);
			const id = await data._id;
			// setToken(await data.token);

			alert("Registration Successful");
			navigate('/login')
		} catch (error) {
			if (error.status == 400) alert("Email already Used")
			alert(error);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
			<div className="w-full max-w-md p-8 space-y-4 bg-gray-800 rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold text-center">Create an Account</h2>
				<form onSubmit={handleSubmit}>
					<div className="space-y-4">
						<div>
							<label htmlFor="name" className="block text-sm">
								Name
							</label>
							<input
								type="text"
								id="name"
								className="w-full p-3 mt-1 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
								placeholder="Enter your name"
								onChange={(e) => setFormData({ ...formData, name: e.target.value })}
							/>
						</div>
						<div>
							<label htmlFor="email" className="block text-sm">
								Email
							</label>
							<input
								type="email"
								id="email"
								className="w-full p-3 mt-1 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
								placeholder="Enter your email"
								onChange={(e) => setFormData({ ...formData, email: e.target.value })}
							/>
						</div>
						<div>
							<label htmlFor="password" className="block text-sm">
								Password
							</label>
							<input
								type="password"
								id="password"
								className="w-full p-3 mt-1 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
								placeholder="Create a password"
								onChange={(e) => setFormData({ ...formData, password: e.target.value })}
							/>
						</div>
						<div>
							<label htmlFor="type" className="block text-lg font-medium text-gray-700">
								What type of transportation do you use?
							</label>
							<div className="flex space-x-4 mt-4">
								{userTypes.map((type) => (
									<label
										key={type}
										htmlFor={`type-${type}`}
										className={`w-48 p-4 flex flex-col items-center border rounded-lg cursor-pointer shadow-sm ${formData.type === type
											? "border-blue-500 bg-blue-50"
											: "border-gray-300 dark:bg-slate-800 hover:border-gray-400"
											}`}
									>
										{type === "car" ? (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-8 w-8 text-gray-700 mb-2"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path d="M3 10.75A1.75 1.75 0 014.75 9h10.5A1.75 1.75 0 0117 10.75v3.5A1.75 1.75 0 0115.25 16h-10.5A1.75 1.75 0 013 14.25v-3.5zM5.25 9a.75.75 0 000 1.5h9.5a.75.75 0 100-1.5h-9.5zM5 13a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z" />
											</svg>
										) : type === "bike" ? (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-8 w-8 text-gray-700 mb-2"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path d="M10 3a2 2 0 011.85 2.75l-.71 1.43a1.75 1.75 0 11-.74-.31l.71-1.43A1.99 1.99 0 0110 3zM5.25 6.5A1.75 1.75 0 007 8.25v3.1a4 4 0 11-2 0v-3.1A1.75 1.75 0 005.25 6.5zm8.5 0a1.75 1.75 0 011.75 1.75v3.1a4 4 0 11-2 0v-3.1A1.75 1.75 0 0113.75 6.5z" />
											</svg>
										) : null}

										<span className="font-medium text-gray-700">
											{type.charAt(0).toUpperCase() + type.slice(1)}
										</span>
										<span className="text-sm text-gray-500">
											{type === "user"
												? "Order Books."
												: "Upload Books."}
										</span>

										<input
											type="radio"
											id={`type-${type}`}
											name="type"
											value={type}
											checked={formData.type === type}
											onChange={(e) => setFormData({ ...formData, type: e.target.value })}
											className="hidden" 
										/>
									</label>
								))}
							</div>
						</div>

					</div>
					<button
						type="submit"
						className="w-full py-3 mt-6 bg-green-600 rounded-lg hover:bg-green-500"
					>
						Register
					</button>
				</form>
				<p className="text-center text-gray-400">
					Already have an account?{" "}
					<a href="/login" className="text-green-400 hover:underline">
						Login
					</a>
				</p>
			</div>
		</div>
	);
};
