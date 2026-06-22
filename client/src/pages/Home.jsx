import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/axios';
import { FaCalendarAlt, FaMapMarkerAlt, FaSearch, FaRegClock, FaTicketAlt, FaShieldAlt } from 'react-icons/fa';



const Home = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const eventsSectionRef = useRef(null);
    const upcomingEventsRef = useRef(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchEvents();
        }, 400);
        return () => clearTimeout(timeoutId);
    }, [search]);

    useEffect(() => {
        const pathEl = document.getElementById('reelPath');
        const textPath = document.getElementById('reelTextPath');
        if (!pathEl || !textPath) return;

        const fullLen = pathEl.getTotalLength();
        const loopLen = fullLen / 2;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const SPEED = 35;
        let offsetPx = 0;
        let lastTime = null;
        let animationFrameId;

        function tick(now) {
            if (lastTime === null) lastTime = now;
            const dt = (now - lastTime) / 1000;
            lastTime = now;

            offsetPx = offsetPx - SPEED * dt;
            if (offsetPx < 0) {
                offsetPx += loopLen;
            }
            textPath.setAttribute('startOffset', offsetPx);

            animationFrameId = requestAnimationFrame(tick);
        }

        if (!reduceMotion) {
            animationFrameId = requestAnimationFrame(tick);
        } else {
            textPath.setAttribute('startOffset', '0');
        }

        const handleVisibilityChange = () => {
            lastTime = null;
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            cancelAnimationFrame(animationFrameId);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

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
        upcomingEventsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="event-page relative flex min-h-screen flex-col overflow-hidden text-white">
            <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
                <video
                    className="h-screen w-screen object-cover opacity-95"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                >
                    <source src="/hboat.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="relative z-10">
                {/* Hero content over the single page video */}
                <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
                    <div className="relative z-10 w-full pl-4 sm:pl-8 md:pl-10 lg:pl-12 pr-6 -translate-y-28 md:-translate-y-40 text-left text-white max-w-4xl">
                        <p className="text-white/75 text-xl md:text-4xl font-league-gothic tracking-normal leading-relaxed drop-shadow-md mb-8">
                            Now discover our highly curated selection <br />
                            of elite gatherings designed to elevate <br />
                            your modern lifestyle with unparalleled and<br />
                            prestigious global experiences.
                        </p>
                        <button
                            onClick={() => upcomingEventsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                            className="inline-block bg-white hover:bg-gray-200 text-black font-semibold text-lg px-8 py-3 rounded-full transition-all duration-300 shadow-lg shadow-black/35 transform hover:scale-105 active:scale-95"
                        >
                            explore events
                        </button>
                    </div>
                    {/* Rhombus Card in bottom left corner */}
                    <div className="reel-badge select-none">
                        <svg viewBox="0 0 240 240">
                            <defs>
                                <clipPath id="rhombusClip" clipPathUnits="userSpaceOnUse">
                                    <rect x="67" y="67" width="106" height="106" rx="20" ry="20" transform="rotate(45 120 120)" />
                                </clipPath>
                                <path
                                    id="reelPath"
                                    transform="rotate(45 120 120)"
                                    d="M 87 51 H 153 A 36 36 0 0 1 189 87 V 153 A 36 36 0 0 1 153 189 H 87 A 36 36 0 0 1 51 153 V 87 A 36 36 0 0 1 87 51 Z M 87 51 H 153 A 36 36 0 0 1 189 87 V 153 A 36 36 0 0 1 153 189 H 87 A 36 36 0 0 1 51 153 V 87 A 36 36 0 0 1 87 51 Z"
                                />
                            </defs>

                            <image
                                className="thumb"
                                href="/rhombus.png"
                                x="40"
                                y="40"
                                width="160"
                                height="160"
                                preserveAspectRatio="xMidYMid slice"
                                clipPath="url(#rhombusClip)"
                            />

                            <rect
                                className="frame"
                                x="67"
                                y="67"
                                width="106"
                                height="106"
                                rx="20"
                                ry="20"
                                transform="rotate(45 120 120)"
                            />

                            <text>
                                <textPath id="reelTextPath" href="#reelPath" startOffset="0">
                                    CURATING UNFORGETTABLE MOMENTS • ELEVATE YOUR CALENDAR •
                                </textPath>
                            </text>
                        </svg>
                    </div>
                    {/* Large EVANTIC Text in bottom right corner */}
                    <div className="absolute bottom-12 md:bottom-16 right-4 z-0 pointer-events-none select-none translate-y-0 leading-none text-white font-league-gothic text-[18vw] tracking-[-0.03em] opacity-95">
                        EVANTIC
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div ref={eventsSectionRef} className="pt-12 pb-8 scroll-mt-24">
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

                        <div ref={upcomingEventsRef} className="mb-10 px-2 scroll-mt-24">
                            <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-6">
                                <h2 className="text-3xl font-extrabold text-white">Upcoming Events</h2>
                                <div className="text-white/70 font-medium">{events.length} results found</div>
                            </div>
                            {/* Relocated Search Bar */}
                            <div className="w-full max-w-2xl mx-auto relative flex items-center group">
                                <FaSearch className="absolute left-6 text-gray-400 text-xl group-focus-within:text-white transition-colors z-10" />
                                <input
                                    type="text"
                                    placeholder="Search events by title or type..."
                                    className="w-full pl-16 pr-6 py-4 rounded-full text-lg text-white bg-black/60 border border-white/20 backdrop-blur-md focus:border-white focus:outline-none transition-all placeholder-white/50 font-medium shadow-lg"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={handleSearchKeyDown}
                                />
                            </div>
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

                        <footer className="mt-32 pb-16 text-center overflow-hidden">
                            <div className="flex items-center justify-between w-full gap-4 md:gap-8 font-league-gothic text-[18vw] tracking-[-0.03em] leading-none text-white select-none opacity-95">
                                <div className="h-1 md:h-1.5 bg-white flex-grow rounded-full opacity-80"></div>
                                <span className="uppercase translate-y-[0.03em]">EVANTIC</span>
                                <div className="h-1 md:h-1.5 bg-white flex-grow rounded-full opacity-80"></div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
