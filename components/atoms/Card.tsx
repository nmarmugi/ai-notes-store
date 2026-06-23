import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ICard {
    children?: ReactNode;
    className?: string;
}

export default function Card({ children, className }: ICard) {
    return (
        <div className={twMerge("border border-gray bg-surface-bright p-4 rounded-md", className)}>
            {children}
        </div>
    );
}
