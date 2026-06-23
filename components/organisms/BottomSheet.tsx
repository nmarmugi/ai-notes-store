"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

interface IBottomSheet {
    open: boolean;
    onClose: () => void;
    ariaLabel?: string;
    panelClassName?: string;
    children: ReactNode;
}

export default function BottomSheet({ open, onClose, ariaLabel, panelClassName, children }: IBottomSheet) {
    const [visible, setVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (open) {
            const id = requestAnimationFrame(() => setVisible(true));
            return () => cancelAnimationFrame(id);
        }
        setVisible(false);
    }, [open]);

    useEffect(() => {
        if (!open) return;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    if (!open || !mounted) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50"
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            onClick={(e) => e.stopPropagation()}
        >
            <div
                onClick={onClose}
                className={twMerge(
                    "absolute inset-0 bg-ink/40 transition-opacity duration-300",
                    visible ? "opacity-100" : "opacity-0"
                )}
            />
            <div
                className={twMerge(
                    "absolute bottom-0 left-0 right-0 bg-surface-bright rounded-t-xl p-6 shadow-soft transition-transform duration-300 ease-out",
                    visible ? "translate-y-0" : "translate-y-full",
                    panelClassName
                )}
            >
                <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray/40 shrink-0" />
                {children}
            </div>
        </div>,
        document.body
    );
}
