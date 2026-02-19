"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useCallback } from "react";

const navItems = [
    {
        label: "Home",
        href: "/",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
        activeIcon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M12 2.1L1 12h3v9a1 1 0 001 1h5v-6h4v6h5a1 1 0 001-1v-9h3L12 2.1z" />
            </svg>
        ),
    },
    {
        label: "Blog",
        href: "/blog",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
        ),
        activeIcon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                <rect x="3" y="20" width="18" height="1.5" rx="0.75" />
            </svg>
        ),
    },
    {
        label: "About",
        href: "/about",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
        activeIcon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <circle cx="12" cy="7" r="4" />
                <path d="M4 21v-2a4 4 0 014-4h8a4 4 0 014 4v2H4z" />
            </svg>
        ),
    },
    {
        label: "Contact",
        href: "/contact",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
        activeIcon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M2 6c0-1.1.9-2 2-2h16a2 2 0 012 2l-10 7L2 6z" />
                <path d="M2 8l10 7 10-7v10a2 2 0 01-2 2H4a2 2 0 01-2-2V8z" />
            </svg>
        ),
    },
];

// Telegram-style bounce animation on tap
function TabItem({ item, isActive }: { item: typeof navItems[0]; isActive: boolean }) {
    const controls = useAnimation();

    const handleTap = useCallback(() => {
        // Telegram bounce: quick jump up + scale, then settle
        controls.start({
            y: [0, -6, 0],
            scale: [1, 1.2, 1],
            transition: {
                duration: 0.4,
                times: [0, 0.3, 1],
                ease: [0.34, 1.56, 0.64, 1], // overshoot easing
            },
        });
    }, [controls]);

    return (
        <Link
            key={item.href}
            href={item.href}
            onClick={handleTap}
            className="relative flex flex-col items-center justify-center w-[64px] h-[48px] rounded-[22px] touch-manipulation"
        >
            {/* Active glass pill background */}
            {isActive && (
                <motion.div
                    layoutId="telegram-pill"
                    className="absolute inset-0 rounded-[22px] liquid-glass-pill"
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                    }}
                />
            )}

            {/* Icon with bounce animation */}
            <motion.div
                animate={controls}
                className="relative z-10"
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={isActive ? "filled" : "outline"}
                        initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: 8 }}
                        transition={{
                            type: "spring",
                            stiffness: 600,
                            damping: 25,
                            mass: 0.5,
                        }}
                        className={`block transition-colors duration-150 ${isActive ? "text-blue-500" : "text-gray-500/50"
                            }`}
                    >
                        {isActive ? item.activeIcon : item.icon}
                    </motion.span>
                </AnimatePresence>
            </motion.div>

            {/* Label — visible only when active, slides in from below */}
            <motion.span
                initial={false}
                animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 4,
                    scale: isActive ? 1 : 0.8,
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    delay: isActive ? 0.05 : 0,
                }}
                className={`relative z-10 text-[9px] font-semibold tracking-wide leading-none ${isActive ? "text-blue-500" : "text-gray-500/40"
                    }`}
            >
                {item.label}
            </motion.span>
        </Link>
    );
}

interface NavPillsProps {
    variant?: "top" | "bottom";
}

export default function NavPills({ variant = "top" }: NavPillsProps) {
    const pathname = usePathname();

    if (variant === "bottom") {
        return (
            <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden pointer-events-none">
                {/* Extra bottom gap — pb-4 + safe area */}
                <div className="flex justify-center px-5 pb-8 safe-bottom pointer-events-auto">
                    <nav className="liquid-glass-bar flex items-center justify-around w-full max-w-[300px] px-1.5 py-1 rounded-[26px]">
                        {navItems.map((item) => {
                            const isActive =
                                item.href === "/"
                                    ? pathname === "/"
                                    : pathname.startsWith(item.href);
                            return <TabItem key={item.href} item={item} isActive={isActive} />;
                        })}
                    </nav>
                </div>
            </div>
        );
    }

    // Top pill bar — desktop
    return (
        <nav className="hidden md:flex items-center gap-1 bg-gray-100/80 rounded-full p-1 backdrop-blur-sm">
            {navItems.map((item) => {
                const isActive =
                    item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        data-cursor="pointer"
                        className="relative flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors"
                    >
                        {isActive && (
                            <motion.div
                                layoutId="top-pill"
                                className="absolute inset-0 bg-white rounded-full shadow-sm"
                                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                            />
                        )}
                        <span className={`relative z-10 transition-colors ${isActive ? "text-blue-500" : "text-gray-400"}`}>
                            {item.icon}
                        </span>
                        <span className={`relative z-10 transition-colors ${isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-700"}`}>
                            {item.label}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
}
