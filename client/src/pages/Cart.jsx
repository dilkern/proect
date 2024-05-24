import React, { useEffect, useState } from 'react';
import axios from '../api';
import { toast } from 'react-toastify';

const Cart = () => {
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		const fetchCartItems = async () => {
			try {
				const response = await axios.get('/cart');
				setCartItems(response.data);
			} catch (error) {
				toast.error('Failed to load cart items');
			}
		};
		fetchCartItems();
	}, []);

	const handlePurchase = async () => {
		try {
			const items = cartItems.map(item => ({
				productId: item.product.id,
				quantity: item.quantity
			}));
			await axios.post('/orders', { items });
			toast.success('Purchase successful');
			setCartItems([]); // Clear the cart in the state
		} catch (error) {
			toast.error('Purchase failed');
		}
	};

	const handleRemove = async (productId) => {
		try {
			await axios.delete(`/cart/remove/${productId}`);
			setCartItems(cartItems.filter(item => item.product.id !== productId));
			toast.success('Item removed from cart');
		} catch (error) {
			toast.error('Failed to remove item from cart');
		}
	};

	const convertImageToBase64 = (imageData) => {
		return `data:image/jpeg;base64,${btoa(
			new Uint8Array(imageData.data).reduce(
				(data, byte) => data + String.fromCharCode(byte),
				''
			)
		)}`;
	};

	return (
		<div className="p-8">
			<h1 className="text-2xl mb-4">Cart</h1>
			<div>
				{cartItems.map(item => (
					<div key={item.product.id} className="border p-4 mb-4">
						<h2 className="text-xl">{item.product.name}</h2>
						<p>Quantity: {item.quantity}</p>
						<p>Price: {item.product.price} USD</p>
						{item.product.image && (
							<img
								src={convertImageToBase64(item.product.image)}
								alt={item.product.name}
							/>
						)}
						<button
							onClick={() => handleRemove(item.product.id)}
							className="bg-red-500 text-white px-4 py-2 mt-4"
						>
							Remove
						</button>
					</div>
				))}
			</div>
			<button
				onClick={handlePurchase}
				className="bg-blue-500 text-white px-4 py-2 mt-4"
			>
				Purchase
			</button>
		</div>
	);
};

export default Cart;
