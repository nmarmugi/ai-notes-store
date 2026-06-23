import NoteEditor from "@/components/organisms/NoteEditor";
import { getNote, getWorkspacesBasic } from "@/lib/db/queries";
import { areaColors } from "@/lib/colors";
import { formatNoteDate } from "@/lib/notes";
import { notFound } from "next/navigation";

export default async function NotePage({ params }: { params: Promise<{ id: string; noteId: string }> }) {
    const { id, noteId } = await params;

    const note = await getNote(id, noteId);

    if (!note) {
        notFound();
    }

    const { firstColor, secondColor } = areaColors(note.workspace.color);
    const workspaces = await getWorkspacesBasic();

    return (
        <NoteEditor
            noteId={note.id}
            workspaceId={note.workspaceId}
            workspaceTitle={note.workspace.title}
            firstColor={firstColor}
            secondColor={secondColor}
            date={formatNoteDate(note.createdAt)}
            initialTitle={note.title}
            initialContent={note.content}
            workspaces={workspaces}
        />
    );
}
