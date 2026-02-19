"use client";

import { useEffect, useRef, useCallback } from "react";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const mouse = useRef({ x: -100, y: -100 });
    const dotPos = useRef({ x: -100, y: -100 });
    const ringPos = useRef({ x: -100, y: -100 });
    const isPointer = useRef(false);
    const rafId = useRef<number>(0);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = useCallback(() => {
        dotPos.current.x = lerp(dotPos.current.x, mouse.current.x, 0.25);
        dotPos.current.y = lerp(dotPos.current.y, mouse.current.y, 0.25);
        ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.12);
        ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.12);

        if (dotRef.current) {
            dotRef.current.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px) translate(-50%, -50%)`;
        }
        if (ringRef.current) {
            ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%) scale(${isPointer.current ? 1.8 : 1})`;
            ringRef.current.style.borderColor = isPointer.current
                ? "rgba(59,130,246,0.5)"
                : "rgba(30,30,30,0.4)";
        }

        rafId.current = requestAnimationFrame(tick);
    }, []);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        const onOver = (e: MouseEvent) => {
            const t = e.target as HTMLElement;
            isPointer.current = !!(
                t.closest("a") ||
                t.closest("button") ||
                t.closest("[data-cursor='pointer']") ||
                t.closest("[role='button']")
            );
            if (dotRef.current) {
                dotRef.current.style.opacity = isPointer.current ? "0" : "1";
            }
        };

        const onLeave = () => {
            if (dotRef.current) dotRef.current.style.opacity = "0";
            if (ringRef.current) ringRef.current.style.opacity = "0";
        };
        const onEnter = () => {
            if (dotRef.current) dotRef.current.style.opacity = "1";
            if (ringRef.current) ringRef.current.style.opacity = "1";
        };

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseover", onOver);
        document.addEventListener("mouseleave", onLeave);
        document.addEventListener("mouseenter", onEnter);
        rafId.current = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseover", onOver);
            document.removeEventListener("mouseleave", onLeave);
            document.removeEventListener("mouseenter", onEnter);
            cancelAnimationFrame(rafId.current);
        };
    }, [tick]);

    return (
        <>
            {/* Inner dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 z-[9999] pointer-events-none"
                style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#1e1e1e",
                    transition: "opacity 0.2s",
                }}
            />
            {/* Outer ring */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 z-[9998] pointer-events-none"
                style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: "1.5px solid rgba(30,30,30,0.4)",
                    transition: "transform 0.15s ease-out, border-color 0.2s, opacity 0.2s",
                }}
            />
        </>
    );
}
