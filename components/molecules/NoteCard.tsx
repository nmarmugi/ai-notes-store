import { ReactNode } from "react";
import AreaTag from "../atoms/AreaTag";
import Card from "../atoms/Card";
import Typography from "../atoms/Typography";
import { Note } from "@/types";

interface INoteCard {
    note: Note;
    firstColor: string;
    menu?: ReactNode;
}

export default function NoteCard({ note, firstColor, menu }: INoteCard) {
    return (
        <Card className="w-full flex flex-col gap-4">
            <div className="w-full flex items-center justify-between gap-2">
                <AreaTag className="p-0" typographyVariant="h2" colorTag="var(--color-ink)" firstColor={firstColor} label={note.title} />
                {menu}
            </div>
            <Typography variant="p" className="line-clamp-3">
                {note.content}
            </Typography>
            <Typography>
                {note.date}
            </Typography>
        </Card>
    );
}
