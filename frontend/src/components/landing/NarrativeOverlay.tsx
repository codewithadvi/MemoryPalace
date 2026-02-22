import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SCROLL_HEIGHT = '400vh';

export const NarrativeOverlay = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // 0-15%
    const opacity1 = useTransform(smoothProgress, [0, 0.05, 0.12, 0.18], [0, 1, 1, 0]);
    const y1 = useTransform(smoothProgress, [0, 0.18], [50, -50]);

    // 15-70%
    const opacity2 = useTransform(smoothProgress, [0.18, 0.25, 0.65, 0.75], [0, 1, 1, 0]);
    const y2 = useTransform(smoothProgress, [0.18, 0.75], [50, -50]);

    // 70-90%
    const opacity3 = useTransform(smoothProgress, [0.75, 0.8, 0.85, 0.92], [0, 1, 1, 0]);
    const y3 = useTransform(smoothProgress, [0.75, 0.92], [50, -50]);

    // 90-100%
    const opacity4 = useTransform(smoothProgress, [0.92, 0.96, 1], [0, 1, 1]);
    const scale4 = useTransform(smoothProgress, [0.92, 1], [0.9, 1]);

    return (
        <div ref={containerRef} style={{ height: SCROLL_HEIGHT }} className="absolute top-0 left-0 w-full pointer-events-none z-30 font-['Inter',sans-serif]">

            {/* 0-15% */}
            <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="fixed inset-0 flex flex-col items-center justify-center text-center px-4"
            >
                <h1 className="text-5xl md:text-8xl font-bold font-['Outfit',sans-serif] text-white tracking-tight mb-6 drop-shadow-2xl">
                    Think in Architecture.
                </h1>
                <p className="text-2xl md:text-3xl text-white/90 font-light max-w-2xl drop-shadow-lg tracking-wide">
                    Transform ideas into structured memory.
                </p>
            </motion.div>

            {/* 15-70% */}
            <motion.div
                style={{ opacity: opacity2, y: y2 }}
                className="fixed inset-0 flex flex-col items-start justify-center text-left px-12 md:px-32 xl:px-48"
            >
                <div className="text-xl md:text-3xl text-neutral-300 font-light max-w-2xl space-y-5 flex flex-col border-l-2 border-white/50 pl-8 py-2 tracking-wide font-['Outfit',sans-serif]">
                    <span className="text-white font-medium drop-shadow-xl text-3xl md:text-5xl mb-2">Upload any text, document, or topic.</span>
                    <span className="opacity-90">Watch it instantly expand into a highly detailed <strong className="text-white font-semibold">Mind Map</strong> or a structured <strong className="text-white font-semibold">Flowchart</strong>.</span>
                    <span className="opacity-90">Navigate even the most complex ideas, spatially.</span>
                </div>
            </motion.div>

            {/* 70-90% */}
            <motion.div
                style={{ opacity: opacity3, y: y3 }}
                className="fixed inset-0 flex flex-col items-center justify-center text-center px-4"
            >
                <h2 className="text-5xl md:text-7xl font-bold font-['Outfit',sans-serif] text-white tracking-tight mb-8 drop-shadow-2xl">
                    From chaos to clarity.
                </h2>
                <p className="text-2xl md:text-3xl text-neutral-300/90 font-light max-w-2xl drop-shadow-lg tracking-wide">
                    Structure your thinking in space.
                </p>
            </motion.div>

            {/* 90-100% */}
            <motion.div
                style={{ opacity: opacity4, scale: scale4 }}
                className="fixed inset-0 flex flex-col items-center justify-center text-center px-4 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent pointer-events-auto"
            >
                <h1 className="text-5xl md:text-7xl font-bold font-['Outfit',sans-serif] text-white tracking-tight mb-12 drop-shadow-xl max-w-4xl leading-tight">
                    Build Your Own Memory Palace
                </h1>

                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <button
                        onClick={() => navigate('/mindmap')}
                        className="group relative px-10 py-5 bg-white text-black rounded-full overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-all duration-500 ease-out transform hover:scale-105"
                    >
                        <span className="relative flex items-center gap-3 text-xl font-semibold tracking-tight">
                            Create My Memory Palace
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>

                    <button
                        onClick={() => navigate('/mindmap')}
                        className="px-8 py-4 text-white hover:text-white border border-white/20 hover:border-white/50 rounded-full text-lg tracking-wide transition-colors font-medium backdrop-blur-sm shadow-xl"
                    >
                        See How It Works
                    </button>
                </div>
            </motion.div>

        </div>
    );
};
