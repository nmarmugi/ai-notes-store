import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type TypographyVariants = "h1" | "h2" | "p" | "span";

interface ITypography {
    variant?: TypographyVariants;
    children?: ReactNode;
    color?: string;
    className?: string;
}

const variants: Record<TypographyVariants, string> = {
    h1: "typo-display",
    h2: "typo-heading",
    p: "typo-body",
    span: "typo-meta"
}

export default function Typography({ variant = "span", children, color, className }: ITypography) {
    const Tag = variant;
    return (
        <Tag style={color ? { color } : undefined} className={twMerge(variants[variant], className)}>
            {children}
        </Tag>
    );
}
