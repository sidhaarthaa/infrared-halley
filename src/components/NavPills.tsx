"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
    {
        label: "Home",
        href: "/",
        // Outline icon
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
        // Filled icon for active state
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

interface NavPillsProps {
    variant?: "top" | "bottom";
}

export default function NavPills({ variant = "top" }: NavPillsProps) {
    const pathname = usePathname();

    if (variant === "bottom") {
        // Telegram-style iOS 26 Liquid Glass tab bar
        return (
            <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden pointer-events-none">
                <div className="flex justify-center px-5 pb-3 safe-bottom pointer-events-auto">
                    <nav
                        className="liquid-glass-bar flex items-center justify-around w-full max-w-[320px] px-1 py-1.5 rounded-[28px]"
                    >
                        {navItems.map((item) => {
                            const isActive =
                                item.href === "/"
                                    ? pathname === "/"
                                    : pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="relative flex flex-col items-center justify-center w-[60px] h-[44px] rounded-[20px] transition-all duration-200 active:scale-90"
                                >
                                    {/* Active glass pill */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="telegram-pill"
                                            className="absolute inset-0 rounded-[20px] liquid-glass-pill"
                                            transition={{
                                                type: "spring",
                                                stiffness: 500,
                                                damping: 35,
                                            }}
                                        />
                                    )}
                                    <span
                                        className={`relative z-10 transition-all duration-200 ${isActive
                                                ? "text-blue-500 scale-105"
                                                : "text-gray-500/60"
                                            }`}
                                    >
                                        {isActive ? item.activeIcon : item.icon}
                                    </span>
                                    <span
                                        className={`relative z-10 text-[9px] font-semibold tracking-wide mt-[-1px] transition-all duration-200 ${isActive
                                                ? "text-blue-500 opacity-100"
                                                : "text-gray-500/50 opacity-0 scale-90"
                                            }`}
                                    >
                                        {item.label}
                                    </span>
                                </Link>
                            );
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
