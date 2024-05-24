import React, { useEffect, useState } from 'react';
import axios from '../api';
import { toast } from 'react-toastify';

const Profile = () => {
	const [orders, setOrders] = useState([]);
	const [user, setUser] = useState({});

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const orderResponse = await axios.get('/orders');
				setOrders(orderResponse.data);
			} catch (error) {
				toast.error('Failed to load orders');
			}
		};

		const fetchUser = async () => {
			try {
				const userResponse = await axios.get('/profile');
				setUser(userResponse.data);
			} catch (error) {
				toast.error('Failed to load user data');
			}
		};

		fetchOrders();
		fetchUser();
	}, []);

	return (
		<div className="flex flex-col items-center h-screen">
			<h1 className="text-2xl mb-4">Profile Page</h1>
			<div className="bg-white p-8 shadow-lg w-full max-w-md">
				<h2 className="text-xl mb-4">User Information</h2>
				<p>Email: {user.email}</p>
				<p>Registered on: {new Date(user.createdAt).toLocaleDateString()}</p>
			</div>
			<div className="bg-white p-8 shadow-lg w-full max-w-md mt-4">
				<h2 className="text-xl mb-4">Your Orders</h2>
				{orders.map(order => (
					<div key={order.id} className="border p-4 mb-4">
						<h3 className="text-lg mb-2">Order {order.id}</h3>
						<p>Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Profile;
