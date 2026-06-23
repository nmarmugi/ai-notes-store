import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonVariants = "primary" | "secondary" | "delete" | "icon";

interface IButton {
    variant?: ButtonVariants;
    content?: string;
    ariaLabel?: string;
    icon?: ReactNode;
    className?: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
}

const variants: Record<ButtonVariants, string> = {
    primary: "bg-accent",
    secondary: "",
    delete: "",
    icon: "bg-accent text-surface-bright rounded-sm shadow-soft p-2 cursor-pointer hover:bg-area-purple transition duration-300"
}

export default function Button({ variant = "primary", content, ariaLabel, icon, className, type = "button", onClick }: IButton) {
    return (
        <button type={type} aria-label={ariaLabel} onClick={onClick} className={twMerge(variants[variant], className)}>
            {variant === "icon" ? icon : content}
        </button>
    );
}
