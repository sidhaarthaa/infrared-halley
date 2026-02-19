"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import Sidebar from "@/components/Sidebar";
import NavPills from "@/components/NavPills";
import Logo from "@/components/Logo";
import Link from "next/link";

interface PageShellProps {
    children: React.ReactNode;
}

export default function PageShell({ children }: PageShellProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // Haptic vibration on mobile tap
    useEffect(() => {
        if (typeof window === "undefined" || !("vibrate" in navigator)) return;

        const handleTouch = (e: TouchEvent) => {
            const target = e.target as HTMLElement;
            const interactive = target.closest(
                'a, button, [data-cursor="pointer"], [role="button"]'
            );
            if (interactive) {
                navigator.vibrate(8);
            }
        };

        document.addEventListener("touchstart", handleTouch, { passive: true });
        return () => document.removeEventListener("touchstart", handleTouch);
    }, []);

    useEffect(() => {
        if (isMobile && sidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isMobile, sidebarOpen]);

    return (
        <>
            {/* Custom cursor — CSS hides it on mobile, JS just avoids mounting */}
            <div className="hidden md:block">
                {hydrated && !isMobile && <CustomCursor />}
            </div>

            <div className="flex items-center justify-center min-h-screen p-3 sm:p-6 md:p-12 pb-20 md:pb-12">
                <div className="relative w-full max-w-[960px]">
                    <motion.div
                        className="relative w-full min-h-[85vh] glass-card md:bg-white rounded-xl sm:rounded-2xl overflow-hidden"
                        animate={{
                            x: sidebarOpen && !isMobile ? 140 : 0,
                            scale: sidebarOpen && !isMobile ? 0.97 : 1,
                        }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        style={{
                            boxShadow:
                                "0 1px 3px rgba(0,0,0,0.04), 0 8px 30px rgba(0,0,0,0.06)",
                        }}
                    >
                        {/* Sidebar — only rendered on desktop via CSS + JS */}
                        <div className="hidden md:block">
                            <Sidebar
                                isOpen={sidebarOpen}
                                onToggle={() => setSidebarOpen((prev) => !prev)}
                                isMobile={false}
                            />
                        </div>

                        <div className="relative z-10 px-5 py-8 sm:pl-12 sm:pr-10 md:pl-16 md:pr-16 sm:py-12 md:py-16">
                            {/* Header */}
                            <header className="flex items-center justify-between mb-8 sm:mb-12">
                                <Link href="/" data-cursor="pointer">
                                    <Logo />
                                </Link>

                                {/* Desktop pill nav — CSS hidden on mobile */}
                                <NavPills variant="top" />
                            </header>

                            {/* Page content */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                {children}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Mobile bottom nav — CSS hidden on desktop */}
            <NavPills variant="bottom" />
        </>
    );
}
