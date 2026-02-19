"use client";

import { useRef } from "react";
import { motion, useSpring } from "framer-motion";

export default function Logo() {
    const containerRef = useRef<HTMLDivElement>(null);

    const rotateX = useSpring(0, { stiffness: 150, damping: 15 });
    const rotateY = useSpring(0, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);

        rotateY.set(deltaX * 15);
        rotateX.set(-deltaY * 15);
    };

    const handleMouseLeave = () => {
        rotateX.set(0);
        rotateY.set(0);
    };

    return (
        <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            data-cursor="pointer"
            className="flex items-center gap-2 sm:gap-2.5 select-none"
            style={{
                rotateX,
                rotateY,
                transformPerspective: 600,
            }}
        >
            {/* Pen/quill icon */}
            <div className="relative">
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 sm:w-8 sm:h-8"
                >
                    <circle
                        cx="16"
                        cy="16"
                        r="14.5"
                        stroke="#222"
                        strokeWidth="1.5"
                        fill="none"
                    />
                    <path
                        d="M10 22L13 13L19 19L10 22Z"
                        fill="#3b82f6"
                        opacity="0.2"
                    />
                    <path
                        d="M19.5 8.5L23.5 12.5L13 23L9 24L10 20L20.5 9.5L19.5 8.5Z"
                        stroke="#222"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M17 11L21 15"
                        stroke="#222"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            {/* Text */}
            <span className="text-[15px] sm:text-[18px] font-semibold tracking-tight text-gray-900">
                Sai Karthik
            </span>
        </motion.div>
    );
}
