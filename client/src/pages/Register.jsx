import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import VideoPageBackground from '../components/VideoPageBackground';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register, verifyOTP } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (!showOTP) {
                await register(name, email, password);
                setShowOTP(true);
                setError('');
            } else {
                await verifyOTP(email, otp);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <VideoPageBackground>
            <div className="max-w-md mx-auto mt-16 shader-card p-8 rounded-xl">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-black mb-2">Create an Account</h2>
                    <p className="text-gray-600">Join Evantic today</p>
                </div>

                {error && <div className="bg-gray-100 text-black p-3 rounded-lg mb-6 text-center shadow-inner border border-gray-300">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {!showOTP ? (
                        <>
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">Full Name</label>
                                <input type="text" required className="input-ocean" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">Email Address</label>
                                <input type="email" required className="input-ocean" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">Password</label>
                                <input type="password" required className="input-ocean" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </>
                    ) : (
                        <div>
                            <p className="text-sm text-gray-800 bg-gray-100 p-3 mb-4 rounded border border-gray-300">
                                An OTP has been sent to your email. Please verify your account.
                            </p>
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

                    <button type="submit" disabled={loading} className="w-full btn-ocean font-bold py-3 rounded-lg focus:ring-4 focus:ring-gray-300 mt-4">
                        {loading ? 'Processing...' : (showOTP ? 'Verify & Complete' : 'Sign Up')}
                    </button>
                </form>

                {!showOTP && (
                    <p className="text-center mt-6 text-gray-700">
                        Already have an account? <Link to="/login" className="text-black font-bold hover:underline">Sign in</Link>
                    </p>
                )}
            </div>
        </VideoPageBackground>
    );
};

export default Register;
