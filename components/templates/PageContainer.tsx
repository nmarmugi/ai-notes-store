import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface IPageContainer {
    children: ReactNode;
    className?: string;
}

export default function PageContainer({ children, className }: IPageContainer) {
    return (
        <div className={twMerge("w-full min-h-dvh flex flex-col gap-4 p-4", className)}>
            {children}
        </div>
    );
}
