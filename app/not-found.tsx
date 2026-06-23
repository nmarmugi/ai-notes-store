import Typography from "@/components/atoms/Typography";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="w-full min-h-dvh flex flex-col items-center justify-center gap-4 p-4 text-center">
            <Typography variant="h1">
                404
            </Typography>
            <Typography variant="p">
                Questa pagina non esiste.
            </Typography>
            <Link className="text-accent underline" href="/">
                <Typography color="var(--color-accent)">
                    Torna agli spazi
                </Typography>
            </Link>
        </div>
    );
}
