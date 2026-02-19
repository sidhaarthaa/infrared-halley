"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

function DecorativeBars() {
    return (
        <div className="flex flex-col gap-[3px] mr-4">
            {[16, 12, 20, 8, 14].map((w, i) => (
                <div
                    key={i}
                    className="h-[2.5px] rounded-full bg-white/70"
                    style={{ width: `${w}px` }}
                />
            ))}
        </div>
    );
}

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
    isMobile?: boolean;
}

export default function Sidebar({ isOpen, onToggle, isMobile = false }: SidebarProps) {
    const pathname = usePathname();

    return (
        <>
            {/* Desktop MENU Tab — hidden on mobile */}
            {!isMobile && (
                <motion.button
                    onClick={onToggle}
                    data-cursor="pointer"
                    className="absolute top-1/2 -translate-y-1/2 z-50 flex items-center justify-center"
                    animate={{ left: isOpen ? 280 : 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                >
                    <div className="bg-white/90 backdrop-blur-sm border border-gray-200/80 rounded-r-lg px-[6px] py-5 text-[10px] font-bold tracking-[0.25em] text-gray-400 uppercase hover:text-gray-600 hover:bg-white transition-colors select-none">
                        {isOpen ? "CLOSE" : "MENU"}
                    </div>
                </motion.button>
            )}

            {/* Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-30 bg-black/20 md:bg-black/5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onToggle}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Panel — desktop only */}
            {!isMobile && (
                <motion.div
                    className="absolute left-0 top-0 bottom-0 z-40 bg-blue-500 rounded-l-2xl flex flex-col justify-center px-8 overflow-hidden"
                    style={{ width: 280 }}
                    initial={false}
                    animate={{
                        x: isOpen ? 0 : -280,
                        opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                >
                    <nav className="flex flex-col gap-1">
                        {menuItems.map((item, index) => {
                            const isActive = pathname === item.href;
                            return (
                                <motion.div
                                    key={item.label}
                                    initial={false}
                                    animate={{
                                        opacity: isOpen ? 1 : 0,
                                        x: isOpen ? 0 : -30,
                                    }}
                                    transition={{
                                        delay: isOpen ? 0.1 + index * 0.05 : 0,
                                        type: "spring",
                                        stiffness: 120,
                                        damping: 15,
                                    }}
                                >
                                    <Link
                                        href={item.href}
                                        data-cursor="pointer"
                                        onClick={onToggle}
                                        className={`flex items-center py-3 text-[15px] font-medium hover:translate-x-2 transition-transform duration-200 group ${isActive ? "text-white" : "text-white/75 hover:text-white"
                                            }`}
                                    >
                                        <DecorativeBars />
                                        <span>{item.label}</span>
                                        {isActive && (
                                            <div className="ml-3 w-1.5 h-1.5 rounded-full bg-white" />
                                        )}
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </nav>

                    {/* Bottom decoration */}
                    <div className="absolute bottom-8 left-8 right-8 flex flex-col gap-1 opacity-30">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-[1px] bg-white/40" />
                        ))}
                    </div>
                </motion.div>
            )}
        </>
    );
}
