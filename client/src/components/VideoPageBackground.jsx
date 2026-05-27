import React from 'react';

const VideoPageBackground = ({ children }) => {
    return (
        <div className="shader-video-page relative -mx-4 sm:-mx-6 lg:-mx-8 -my-8 min-h-screen overflow-hidden px-4 sm:px-6 lg:px-8 py-8">
            <video
                className="fixed inset-0 z-0 h-screen w-screen object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
            >
                <source src="/shader-lab-2026-05-26T19-32-42.mp4" type="video/mp4" />
            </video>
            <div className="relative z-10">{children}</div>
        </div>
    );
};

export default VideoPageBackground;
