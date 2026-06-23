"use client";

import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface IAutoTextarea {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    ariaLabel?: string;
    className?: string;
}

export default function AutoTextarea({ value, onChange, placeholder, ariaLabel, className }: IAutoTextarea) {
    const ref = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    }, [value]);

    return (
        <textarea
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            aria-label={ariaLabel}
            rows={1}
            className={twMerge("w-full bg-transparent resize-none overflow-hidden placeholder:text-gray", className)}
        />
    );
}
