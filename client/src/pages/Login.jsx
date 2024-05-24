import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api';
import { toast } from 'react-toastify';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('/auth/login', { email, password });
			localStorage.setItem('accessToken', response.data.accessToken);
			toast.success('Login successful');
			navigate('/catalog');
		} catch (error) {
			toast.error('Login failed');
		}
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<form className="bg-white p-8 shadow-lg" onSubmit={handleSubmit}>
				<h2 className="text-2xl mb-4">Login</h2>
				<div className="mb-4">
					<label className="block text-gray-700">Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full px-3 py-2 border"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-3 py-2 border"
						required
					/>
				</div>
				<button className="bg-blue-500 text-white px-4 py-2" type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
