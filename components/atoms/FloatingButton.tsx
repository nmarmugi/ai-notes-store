import Button from "./Button";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface IFloatingButton {
    icon: ReactNode;
    className?: string;
    ariaLabel?: string;
    onClick?: () => void;
}

export default function FloatingButton({ icon, className, ariaLabel, onClick }: IFloatingButton) {
    return (
        <Button
            variant="icon"
            ariaLabel={ariaLabel}
            onClick={onClick}
            className={twMerge("bg-ink rounded-full w-14 h-14 flex items-center justify-center", className)}
            icon={icon}
        />
    );
}
