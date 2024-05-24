import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api';
import { toast } from 'react-toastify';

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error('Passwords do not match');
			return;
		}
		try {
			const response = await axios.post('/auth/register', { email, password });
			toast.success('Registration successful');
			navigate('/login');
		} catch (error) {
			toast.error('Registration failed');
		}
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<form className="bg-white p-8 shadow-lg" onSubmit={handleSubmit}>
				<h2 className="text-2xl mb-4">Register</h2>
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
				<div className="mb-4">
					<label className="block text-gray-700">Confirm Password</label>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						className="w-full px-3 py-2 border"
						required
					/>
				</div>
				<button className="bg-blue-500 text-white px-4 py-2" type="submit">Register</button>
			</form>
		</div>
	);
};

export default Register;
