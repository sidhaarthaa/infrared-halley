"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
    {
        label: "Home",
        href: "/",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
    },
    {
        label: "Blog",
        href: "/blog",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
        ),
    },
    {
        label: "About",
        href: "/about",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
    },
    {
        label: "Contact",
        href: "/contact",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
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
        // iOS 26 Liquid Glass tab bar
        return (
            <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden pointer-events-none">
                <div className="flex justify-center px-4 pb-2 safe-bottom pointer-events-auto">
                    <nav
                        className="flex items-center justify-around w-full max-w-[360px] px-2 py-2 rounded-[22px]"
                        style={{
                            background:
                                "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.35) 50%, rgba(240,245,255,0.45) 100%)",
                            backdropFilter: "blur(40px) saturate(180%)",
                            WebkitBackdropFilter: "blur(40px) saturate(180%)",
                            boxShadow:
                                "0 0 0 0.5px rgba(255,255,255,0.6), " +
                                "0 2px 8px rgba(0,0,0,0.06), " +
                                "0 8px 32px rgba(0,0,0,0.08), " +
                                "inset 0 1px 0 rgba(255,255,255,0.5), " +
                                "inset 0 -0.5px 0 rgba(0,0,0,0.05)",
                        }}
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
                                    className="relative flex flex-col items-center gap-[2px] py-1 px-4 rounded-2xl transition-all duration-200 active:scale-95"
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="glass-pill"
                                            className="absolute inset-0 rounded-2xl"
                                            style={{
                                                background:
                                                    "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 100%)",
                                                boxShadow:
                                                    "0 0 0 0.5px rgba(255,255,255,0.5), " +
                                                    "0 1px 4px rgba(0,0,0,0.06), " +
                                                    "inset 0 1px 0 rgba(255,255,255,0.6)",
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                    <span
                                        className={`relative z-10 transition-colors duration-200 ${isActive
                                                ? "text-blue-500"
                                                : "text-gray-400/80"
                                            }`}
                                    >
                                        {item.icon}
                                    </span>
                                    <span
                                        className={`relative z-10 text-[10px] font-semibold tracking-tight transition-colors duration-200 ${isActive
                                                ? "text-blue-600"
                                                : "text-gray-400/70"
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
