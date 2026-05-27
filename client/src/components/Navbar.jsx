import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaTicketAlt } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-black/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/10 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-4">
                    <Link to="/" className="text-white text-2xl font-bold flex items-center gap-2 font-display tracking-tight">
                        <FaTicketAlt className="text-white" /> Evantic
                    </Link>
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                        <Link to="/" className="text-gray-300 hover:text-white transition cursor-pointer">Events</Link>
                        {user ? (
                            <>
                                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="text-gray-300 hover:text-white transition">Dashboard</Link>
                                <button onClick={handleLogout} className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md transition border border-white/15">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-300 hover:text-white transition">Login</Link>
                                <Link to="/register" className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-md font-semibold transition shadow-md shadow-black/20">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
