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
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
        activeIcon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M12 2.1L1 12h3v9a1 1 0 001 1h5v-6h4v6h5a1 1 0 001-1v-9h3L12 2.1z" />
            </svg>
        ),
    },
    {
        label: "Blog",
        href: "/blog",
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
        ),
        activeIcon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                <rect x="3" y="20" width="18" height="1.5" rx="0.75" />
            </svg>
        ),
    },
    {
        label: "About",
        href: "/about",
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
        activeIcon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <circle cx="12" cy="7" r="4" />
                <path d="M4 21v-2a4 4 0 014-4h8a4 4 0 014 4v2H4z" />
            </svg>
        ),
    },
    {
        label: "Contact",
        href: "/contact",
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
        activeIcon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M2 6c0-1.1.9-2 2-2h16a2 2 0 012 2l-10 7L2 6z" />
                <path d="M2 8l10 7 10-7v10a2 2 0 01-2 2H4a2 2 0 01-2-2V8z" />
            </svg>
        ),
    },
];

// Apple Music iOS 26 bounce animation
function TabItem({ item, isActive }: { item: typeof navItems[0]; isActive: boolean }) {
    const iconControls = useAnimation();

    const handleTap = useCallback(() => {
        iconControls.start({
            y: [0, -5, 1, 0],
            scale: [1, 1.15, 0.95, 1],
            transition: {
                duration: 0.5,
                times: [0, 0.25, 0.6, 1],
                ease: "easeOut",
            },
        });
    }, [iconControls]);

    return (
        <Link
            href={item.href}
            onClick={handleTap}
            className="relative flex flex-col items-center justify-center w-[60px] h-[50px] rounded-[20px] touch-manipulation"
        >
            {/* Active glass pill */}
            {isActive && (
                <motion.div
                    layoutId="apple-music-pill"
                    className="absolute inset-1 rounded-[16px]"
                    style={{
                        background: "linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.20) 100%)",
                        boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.7), " +
                            "inset 0 -0.5px 0 rgba(0,0,0,0.05), " +
                            "0 1px 4px rgba(0,0,0,0.04)",
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 32,
                    }}
                />
            )}

            {/* Icon with bounce */}
            <motion.div animate={iconControls} className="relative z-10">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={isActive ? "filled" : "outline"}
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 28,
                            mass: 0.6,
                        }}
                        className={`block ${isActive ? "text-blue-500" : "text-gray-400/70"}`}
                    >
                        {isActive ? item.activeIcon : item.icon}
                    </motion.span>
                </AnimatePresence>
            </motion.div>

            {/* Label */}
            <motion.span
                initial={false}
                animate={{
                    opacity: isActive ? 1 : 0.5,
                    y: isActive ? 0 : 2,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`relative z-10 text-[10px] font-semibold leading-none mt-[2px] ${isActive ? "text-blue-500" : "text-gray-400/50"
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
        // Apple Music iOS 26 - floating liquid glass tab bar
        return (
            <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden pointer-events-none">
                {/* Large bottom gap - lifts the bar well above browser chrome */}
                <div className="flex justify-center px-6 pb-24 safe-bottom pointer-events-auto">
                    <nav
                        className="flex items-center justify-around w-full max-w-[320px] px-1.5 py-[5px] rounded-full"
                        style={{
                            background:
                                "linear-gradient(160deg, " +
                                "rgba(255,255,255,0.55) 0%, " +
                                "rgba(255,255,255,0.30) 30%, " +
                                "rgba(230,240,255,0.35) 60%, " +
                                "rgba(255,255,255,0.45) 100%)",
                            backdropFilter: "blur(100px) saturate(250%) brightness(1.1)",
                            WebkitBackdropFilter: "blur(100px) saturate(250%) brightness(1.1)",
                            border: "0.5px solid rgba(255,255,255,0.65)",
                            boxShadow:
                                "0 0 0 0.5px rgba(255,255,255,0.35), " +
                                "0 10px 40px rgba(0,0,0,0.12), " +
                                "0 2px 10px rgba(0,0,0,0.06), " +
                                "inset 0 2px 0 rgba(255,255,255,0.60), " +
                                "inset 0 -1px 0 rgba(255,255,255,0.20)",
                        }}
                    >
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

    // Desktop top pill bar
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
