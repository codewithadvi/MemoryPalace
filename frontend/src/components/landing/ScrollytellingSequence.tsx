import { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 240;
const SCROLL_HEIGHT = '400vh';

function getFramePath(index: number) {
    // Extract number and pad to 3 digits (e.g., 001, 002, ..., 240)
    const idx = (index + 1).toString().padStart(3, '0');
    // Files are named ezgif-frame-*.jpg
    return `/ezgif-frame-${idx}.jpg`;
}

export const ScrollytellingSequence = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);

    // We load the 240 images into memory
    const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));

    useEffect(() => {
        let loadedCount = 0;

        // Preload all 240 frames
        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            img.src = getFramePath(i);
            img.onload = () => {
                imagesRef.current[i] = img;
                loadedCount++;
                setLoadingProgress(Math.floor((loadedCount / FRAME_COUNT) * 100));

                if (loadedCount === FRAME_COUNT) {
                    setImagesLoaded(true);
                }
                // Draw first frame immediately if available and canvas is ready
                if (i === 0 && canvasRef.current) {
                    const ctx = canvasRef.current.getContext('2d');
                    if (ctx) drawImageToCanvas(img, ctx, canvasRef.current);
                }
            };
            img.onerror = () => {
                loadedCount++;
                setLoadingProgress(Math.floor((loadedCount / FRAME_COUNT) * 100));
                if (loadedCount === FRAME_COUNT) setImagesLoaded(true);
            };
        }
    }, []);

    const drawImageToCanvas = (img: HTMLImageElement, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        // Fill background with solid black first to match frame background perfectly
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // DO NOT scale the image randomly.
        // We will scale it strictly by 1.1x from its center to explicitly crop out the edges (and the Veo Watermark).
        // Natively the images are 1920x1080.
        const scale = 1.06; // 6% zoom crops the watermark at bottom right
        const w = img.width * scale;
        const h = img.height * scale;
        const centerShift_x = (canvas.width - w) / 2;
        const centerShift_y = (canvas.height - h) / 2;

        // Draw the cleanly cropped image
        ctx.drawImage(img, centerShift_x, centerShift_y, w, h);
    };

    // Map scroll progress (0-1) to frame index (0 to 239)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        const currentFrame = Math.round(latest);
        const img = imagesRef.current[currentFrame];

        if (img) {
            drawImageToCanvas(img, ctx, canvasRef.current);
        } else {
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    });

    return (
        <div ref={containerRef} style={{ height: SCROLL_HEIGHT }} className="relative bg-[#000000] z-0">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pointer-events-none">

                {/* Loading overlay while frames are caching */}
                {!imagesLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#000000] z-50 text-white transition-opacity duration-1000">
                        <div className="text-white mb-4 opacity-70 tracking-widest text-sm uppercase">Loading sequence...</div>
                        <div className="w-64 h-[2px] bg-white/10 overflow-hidden">
                            <div className="h-full bg-white transition-all duration-300" style={{ width: `${loadingProgress}%` }}></div>
                        </div>
                    </div>
                )}

                {/* Cinematic sequence canvas - Scaled down to a crisp, smaller premium rectangle */}
                <canvas
                    ref={canvasRef}
                    width={1920}
                    height={1080}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 duration-1000 w-[95vw] md:w-[75vw] xl:w-[65vw] max-w-7xl h-auto rounded-xl shadow-[0_0_80px_rgba(255,255,255,0.05)] border border-white/10"
                />

                {/* Subtle vignette to seamlessly blend edges with #000000 page background */}
                <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_40%,_#000000_120%)]"></div>
            </div>
        </div>
    );
};
