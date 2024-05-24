import React, { useEffect, useState } from 'react';
import axios from '../api';
import { toast } from 'react-toastify';

const Catalog = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get('/products');
				console.log(response.data);  // Log to check the image URLs
				setProducts(response.data);
			} catch (error) {
				toast.error('Failed to load products');
			}
		};
		fetchProducts();
	}, []);

	const handleAddToCart = async (productId) => {
		try {
			await axios.post('/cart/add', { productId, quantity: 1 });
			toast.success('Product added to cart');
		} catch (error) {
			toast.error('Failed to add product to cart');
		}
	};

	return (
		<div className="p-8">
			<h1 className="text-2xl mb-4">Catalog</h1>
			<div className="grid grid-cols-3 gap-4">
				{products.map(product => (
					<div key={product.id} className="border p-4">
						<h2 className="text-xl">{product.name}</h2>
						<p>{product.price} USD</p>
						{product.image && (
							<img
								src={`data:image/jpeg;base64,${btoa(
									new Uint8Array(product.image.data).reduce(
										(data, byte) => data + String.fromCharCode(byte),
										''
									)
								)}`}
								alt={product.name}
							/>
						)}
						<button
							onClick={() => handleAddToCart(product.id)}
							className="bg-green-500 text-white px-4 py-2"
						>
							Add to Cart
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Catalog;
