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
        <nav className="bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    <Link to="/" className="text-white text-3xl md:text-4xl font-league-gothic tracking-widest hover:opacity-90 transition">
                        EVANTIC
                    </Link>
                    <div className="flex items-center gap-6 md:gap-8 font-league-gothic text-xl md:text-3xl tracking-wider">
                        <Link to="/" className="text-white/80 hover:text-white transition">Events</Link>
                        {user ? (
                            <>
                                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="text-white/80 hover:text-white transition">Dashboard</Link>
                                <button onClick={handleLogout} className="text-white/80 hover:text-white transition font-league-gothic text-2xl md:text-3.5xl tracking-wider">logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-white/80 hover:text-white transition">login</Link>
                                <Link to="/register" className="text-white/80 hover:text-white transition">signup</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
