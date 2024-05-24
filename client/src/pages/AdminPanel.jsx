import React, { useState, useEffect } from 'react';
import axios from '../api';
import { toast } from 'react-toastify';

const AdminPanel = () => {
	const [users, setUsers] = useState([]);
	const [products, setProducts] = useState([]);
	const [productName, setProductName] = useState('');
	const [productPrice, setProductPrice] = useState('');
	const [productQuantity, setProductQuantity] = useState('');
	const [productImage, setProductImage] = useState(null);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const token = localStorage.getItem('accessToken');
				const response = await axios.get('/user', {
					headers: {
						'Authorization': `Bearer ${token}`,
					},
				});
				setUsers(response.data);
			} catch (error) {
				toast.error('Failed to fetch users');
			}
		};

		const fetchProducts = async () => {
			try {
				const response = await axios.get('/products');
				setProducts(response.data);
			} catch (error) {
				toast.error('Failed to load products');
			}
		};

		fetchUsers();
		fetchProducts();
	}, []);

	const deleteUser = async (userId) => {
		try {
			const token = localStorage.getItem('accessToken');
			await axios.delete(`/user/${userId}`, {
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			});
			setUsers(users.filter(user => user.id !== userId));
			toast.success('User deleted successfully');
		} catch (error) {
			toast.error('Failed to delete user');
		}
	};

	const deleteProduct = async (productId) => {
		try {
			const token = localStorage.getItem('accessToken');
			await axios.delete(`/products/${productId}`, {
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			});
			setProducts(products.filter(product => product.id !== productId));
			toast.success('Product deleted successfully');
		} catch (error) {
			toast.error('Failed to delete product');
		}
	};

	const handleFileChange = (e) => {
		setProductImage(e.target.files[0]);
	};

	const addProduct = async () => {
		try {
			const token = localStorage.getItem('accessToken');
			const formData = new FormData();
			formData.append('name', productName);
			formData.append('price', productPrice);
			formData.append('quantity', productQuantity);
			formData.append('image', productImage);
			await axios.post('/products', formData, {
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			});
			setProductName('');
			setProductPrice('');
			setProductQuantity('');
			setProductImage(null);
			toast.success('Product added successfully');
		} catch (error) {
			toast.error('Failed to add product');
		}
	};

	return (
		<div className="admin-panel p-8 bg-white shadow-md rounded-lg">
			<h1 className="text-2xl mb-4">Admin Panel</h1>
			<div className="mb-8">
				<h2 className="text-xl mb-2">Add Product</h2>
				<div className="mb-4">
					<label className="block text-gray-700">Name</label>
					<input
						type="text"
						value={productName}
						onChange={(e) => setProductName(e.target.value)}
						className="w-full px-3 py-2 border"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Price</label>
					<input
						type="text"
						value={productPrice}
						onChange={(e) => setProductPrice(e.target.value)}
						className="w-full px-3 py-2 border"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Quantity</label>
					<input
						type="text"
						value={productQuantity}
						onChange={(e) => setProductQuantity(e.target.value)}
						className="w-full px-3 py-2 border"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Image</label>
					<input
						type="file"
						onChange={handleFileChange}
						className="w-full px-3 py-2 border"
						required
					/>
				</div>
				<button
					onClick={addProduct}
					className="bg-blue-500 text-white px-4 py-2"
				>
					Add Product
				</button>
			</div>
			<div>
				<h2 className="text-xl mb-4">Products</h2>
				<table className="min-w-full bg-white border">
					<thead>
					<tr>
						<th className="border px-4 py-2">Name</th>
						<th className="border px-4 py-2">Price</th>
						<th className="border px-4 py-2">Actions</th>
					</tr>
					</thead>
					<tbody>
					{products.map((product) => (
						<tr key={product.id}>
							<td className="border px-4 py-2">{product.name}</td>
							<td className="border px-4 py-2">{product.price}</td>
							<td className="border px-4 py-2">
								<button
									onClick={() => deleteProduct(product.id)}
									className="bg-red-500 text-white px-4 py-2 rounded"
								>
									Delete
								</button>
							</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>
			<div>
				<h2 className="text-xl mb-4">Users</h2>
				<table className="min-w-full bg-white border">
					<thead>
					<tr>
						<th className="border px-4 py-2">Email</th>
						<th className="border px-4 py-2">Actions</th>
					</tr>
					</thead>
					<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td className="border px-4 py-2">{user.email}</td>
							<td className="border px-4 py-2">
								<button
									onClick={() => deleteUser(user.id)}
									className="bg-red-500 text-white px-4 py-2 rounded"
								>
									Delete
								</button>
							</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AdminPanel;
