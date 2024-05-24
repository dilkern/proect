import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {jwtDecode} from 'jwt-decode';

const Navbar = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('accessToken');
	const decodedToken = token ? jwtDecode(token) : null;
	const isAdmin = decodedToken?.roles?.includes('ADMIN');

	const handleLogout = () => {
		localStorage.removeItem('accessToken');
		toast.success('Logged out successfully');
		navigate('/login');
	};

	return (
		<nav className="bg-gray-800 p-4 text-white">
			<div className="flex justify-between">
				<div className="space-x-4">
					<Link to="/">Home</Link>
					{token && (
						<>
							<Link to="/catalog">Catalog</Link>
							<Link to="/cart">Cart</Link>
							<Link to="/profile">Profile</Link>
							{isAdmin && <Link to="/admin">Admin</Link>}
						</>
					)}
					{!token && (
						<>
							<Link to="/login">Login</Link>
							<Link to="/register">Register</Link>
						</>
					)}
				</div>
				{token && <button onClick={handleLogout}>Logout</button>}
			</div>
		</nav>
	);
};

export default Navbar;
