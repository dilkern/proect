import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import PrivateRoute from './pages/PrivateRoute';

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="max-w-4xl mx-auto p-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/admin" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
            <ToastContainer />
        </Router>
    );
};

export default App;
