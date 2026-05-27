import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/axios';
import { FaCalendarAlt, FaMapMarkerAlt, FaSearch, FaRegClock, FaTicketAlt, FaShieldAlt } from 'react-icons/fa';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const eventsSectionRef = useRef(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchEvents();
        }, 400);
        return () => clearTimeout(timeoutId);
    }, [search]);

    const fetchEvents = async () => {
        try {
            const { data } = await api.get(`/events?search=${search}`);
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchKeyDown = (e) => {
        if (e.key !== 'Enter') return;
        eventsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="event-page relative flex min-h-screen flex-col -mx-4 sm:-mx-6 lg:-mx-8 -mt-8 overflow-hidden text-white">
            <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
                <video
                    className="h-screen w-screen object-cover opacity-95"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                >
                    <source src="/boat2.mp4" type="video/mp4" />
                    <source src="/boat2.mov" type="video/quicktime" />
                </video>
            </div>

            <div className="relative z-10">
            {/* Hero content over the single page video */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 py-16 md:py-24 text-center text-white">
                    <span className="inline-block text-white px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase mb-6">
                        Welcome to Evantic
                    </span>
                    <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight drop-shadow-lg">
                        Find Your Next <br />
                        <span className="text-gradient-ocean">Unforgettable</span> Experience
                    </h1>
                    <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        Discover conferences, festivals, and workshops on the water and beyond. Secure your spot today.
                    </p>

                    <div className="w-full max-w-2xl mx-auto relative flex items-center group">
                        <FaSearch className="absolute left-6 text-gray-300 text-xl group-focus-within:text-white transition-colors z-10" />
                        <input
                            type="text"
                            placeholder="Search events by title or type..."
                            className="w-full pl-16 pr-6 py-5 rounded-full text-lg text-white bg-transparent border-2 border-white/35 focus:border-white focus:outline-none transition-all placeholder-white/60 font-medium"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleSearchKeyDown}
                        />
                    </div>
                </div>
            </section>

            <div ref={eventsSectionRef} className="px-4 sm:px-6 lg:px-8 pt-12 pb-8 scroll-mt-24">
                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="event-glass-card p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-1 transition duration-300">
                        <div className="w-16 h-16 bg-white/90 text-black rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-white/10">
                            <FaRegClock />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Fast Booking</h3>
                        <p className="text-white/68 text-sm leading-relaxed">Secure your tickets instantly with streamlined booking built for speed.</p>
                    </div>
                    <div className="event-glass-card p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-1 transition duration-300">
                        <div className="w-16 h-16 bg-white/90 text-black rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-white/10">
                            <FaTicketAlt />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Seamless Access</h3>
                        <p className="text-white/68 text-sm leading-relaxed">Download tickets instantly or manage them from your personal dashboard.</p>
                    </div>
                    <div className="event-glass-card p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-1 transition duration-300">
                        <div className="w-16 h-16 bg-white/90 text-black rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-white/10">
                            <FaShieldAlt />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Secure Platform</h3>
                        <p className="text-white/68 text-sm leading-relaxed">All transactions are protected with cutting-edge security and OTP verification.</p>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-8 px-2 border-b border-white/15 pb-4">
                    <h2 className="text-3xl font-extrabold text-white">Upcoming Events</h2>
                    <div className="text-white/70 font-medium">{events.length} results found</div>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-xl font-semibold text-white/80">Loading events...</div>
                ) : events.length === 0 ? (
                    <div className="text-center py-20 text-xl text-white/70">No events found matching your search.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map(event => (
                            <div key={event._id} className="event-glass-card rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-black/30 transition flex flex-col">
                                <div className="h-48 bg-black overflow-hidden relative">
                                    {event.image ? (
                                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-black via-gray-800 to-gray-500 text-white font-bold text-2xl">
                                            {event.category || 'Event'}
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold shadow-sm border border-white/15">
                                        {event.ticketPrice === 0 ? (
                                            <span className="text-white">FREE</span>
                                        ) : (
                                            <span className="text-white">₹{event.ticketPrice}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">{event.category}</div>
                                    <h2 className="text-xl font-bold text-white mb-3">{event.title}</h2>
                                    <div className="flex flex-col gap-2 mb-4 text-white/68 text-sm">
                                        <div className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-gray-300" />
                                            <span>{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaMapMarkerAlt className="text-gray-300" />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>
                                    <div className="mt-auto">
                                        <div className="w-full bg-white/15 rounded-full h-2 mb-2">
                                            <div
                                                className="bg-white h-2 rounded-full transition-all"
                                                style={{ width: `${(event.availableSeats / event.totalSeats) * 100}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-white/55 mb-4">{event.availableSeats} of {event.totalSeats} seats remaining</p>
                                        <Link
                                            to={`/events/${event._id}`}
                                            className="block w-full text-center bg-white hover:bg-gray-200 text-black font-bold py-2 rounded-lg transition"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <footer className="mt-16 pt-12 pb-8 border-t border-white/15 text-center">
                    <div className="flex justify-center items-center gap-2 mb-4">
                        <FaTicketAlt className="text-white text-2xl" />
                        <span className="text-xl font-bold text-white">Evantic</span>
                    </div>
                    <p className="text-white/65 text-sm mb-6 max-w-md mx-auto">
                        The simplest way to discover and host world-class events. Set sail for your next memory.
                    </p>
                    <div className="text-xs text-white/45 font-medium uppercase tracking-wider">
                        &copy; {new Date().getFullYear()} Evantic Platform. All rights reserved.
                    </div>
                </footer>
            </div>
            </div>
        </div>
    );
};

export default Home;
