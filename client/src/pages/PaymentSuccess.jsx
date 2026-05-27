import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentSuccess = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
            <div className="glass-card p-10 rounded-3xl max-w-md w-full text-center border-t-8 border-black transform transition-all hover:-translate-y-1">
                <FaCheckCircle className="text-black text-7xl mx-auto mb-6 drop-shadow-sm" />
                <h1 className="text-4xl font-black text-black mb-4">Booking Confirmed!</h1>
                <p className="text-gray-600 mb-8 text-lg">Your ticket has been booked successfully. A confirmation email has been sent to your registered email address.</p>
                <div className="space-y-4">
                    <Link to="/dashboard" className="block w-full bg-black hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-xl transition shadow-lg hover:shadow-xl">
                        View My Tickets
                    </Link>
                    <Link to="/" className="block w-full bg-gray-100 hover:bg-gray-200 text-black font-bold py-4 px-6 rounded-xl transition">
                        Discover More Events
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
