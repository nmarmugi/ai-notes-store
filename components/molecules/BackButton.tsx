import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import Button from "../atoms/Button";

interface IBackButton {
    href: string;
    ariaLabel?: string;
}

export default function BackButton({ href, ariaLabel = "Indietro" }: IBackButton) {
    return (
        <Link href={href}>
            <Button className="btn-ghost" variant="icon" ariaLabel={ariaLabel} icon={<FiChevronLeft size={22} />} />
        </Link>
    );
}
