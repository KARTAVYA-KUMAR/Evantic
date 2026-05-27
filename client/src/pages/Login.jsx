import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import VideoPageBackground from '../components/VideoPageBackground';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, verifyOTP } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (!showOTP) {
                const data = await login(email, password);
                if (data.role === 'admin') navigate('/admin');
                else navigate('/dashboard');
            } else {
                const data = await verifyOTP(email, otp);
                if (data.role === 'admin') navigate('/admin');
                else navigate('/dashboard');
            }
        } catch (err) {
            if (err.needsVerification) {
                setShowOTP(true);
                setError('Account not verified. A new OTP has been sent to your email.');
            } else {
                setError(err.message || err);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <VideoPageBackground>
            <div className="max-w-md mx-auto mt-20 shader-card p-8 rounded-xl">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-black mb-2">Welcome Back</h2>
                    <p className="text-gray-600">Sign in to your Evantic account</p>
                </div>

                {error && <div className="bg-gray-100 text-black p-3 rounded-lg mb-6 text-center shadow-inner border border-gray-300">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {!showOTP ? (
                        <>
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="input-ocean"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">Password</label>
                                <input
                                    type="password"
                                    required
                                    className="input-ocean"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">Verification Code (OTP)</label>
                            <input
                                type="text"
                                required
                                placeholder="6-digit code"
                                className="input-ocean font-bold tracking-widest text-center text-lg"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength="6"
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-ocean font-bold py-3 rounded-lg focus:ring-4 focus:ring-gray-300"
                    >
                        {loading ? 'Processing...' : (showOTP ? 'Verify OTP & Log In' : 'Sign In')}
                    </button>
                </form>

                <p className="text-center mt-8 text-gray-700">
                    Don't have an account? <Link to="/register" className="text-black font-bold hover:underline">Sign up</Link>
                </p>
            </div>
        </VideoPageBackground>
    );
};

export default Login;
