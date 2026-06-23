import { twMerge } from "tailwind-merge";
import Typography, { TypographyVariants } from "./Typography";

interface IAreaTag {
    label: string;
    firstColor: string;
    secondColor?: string;
    typographyVariant?: TypographyVariants;
    colorTag?: string;
    className?: string;
}

export default function AreaTag({ label, firstColor, secondColor = "", typographyVariant = "span", colorTag, className = "" }: IAreaTag) {
    return (
        <div className={twMerge("flex rounded-sm w-fit px-2 items-center gap-2", className)} style={{ color: firstColor, backgroundColor: secondColor }} >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: firstColor }} />
            <Typography variant={typographyVariant} color={colorTag || firstColor}>
                {label}
            </Typography>
        </div>
    );
}
