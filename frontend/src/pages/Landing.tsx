import React, { useEffect } from 'react';
import { ScrollytellingSequence } from '../components/landing/ScrollytellingSequence';
import { NarrativeOverlay } from '../components/landing/NarrativeOverlay';

export default function Landing() {
    // Preload a simple dark theme on the document body to prevent flashes of white
    useEffect(() => {
        document.body.style.backgroundColor = '#000000';
        document.body.style.color = 'white';

        return () => {
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
        }
    }, []);

    return (
        <div className="relative font-sans bg-[#000000] selection:bg-white/30 selection:text-white">
            {/* Scroll Sequence Layer - sticky canvas mapping 240 frames */}
            <ScrollytellingSequence />

            {/* Typography and Interactive Overlay - mapped to scroll progress */}
            <NarrativeOverlay />
        </div>
    );
}
