import { twMerge } from "tailwind-merge";
import Typography from "@/components/atoms/Typography";

interface IInput {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
    ariaLabel?: string;
    className?: string;
}

export default function Input({ value, onChange, placeholder, error, ariaLabel, className }: IInput) {
    return (
        <div className="w-full">
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                aria-label={ariaLabel}
                aria-invalid={Boolean(error)}
                className={twMerge(
                    "w-full border rounded-md p-4 bg-transparent typo-body placeholder:text-gray",
                    error ? "border-area-crimson" : "border-gray",
                    className
                )}
            />
            {error && (
                <Typography color="var(--color-area-crimson)" className="mt-2 block">
                    {error}
                </Typography>
            )}
        </div>
    );
}
