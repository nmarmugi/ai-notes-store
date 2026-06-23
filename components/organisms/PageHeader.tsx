import { ReactNode } from "react";

interface IPageHeader {
    left?: ReactNode;
    right?: ReactNode;
}

export default function PageHeader({ left, right }: IPageHeader) {
    return (
        <div className="w-full flex items-center justify-between">
            {left}
            {right}
        </div>
    );
}
