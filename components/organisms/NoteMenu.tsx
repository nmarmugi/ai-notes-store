"use client";

import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Typography from "@/components/atoms/Typography";
import BottomSheet from "@/components/organisms/BottomSheet";
import MoveNoteSheet, { WorkspaceOption } from "@/components/organisms/MoveNoteSheet";
import { deleteNote } from "@/lib/actions/notes";
import { HiDotsHorizontal } from "react-icons/hi";
import { LuFileText, LuFolderUp } from "react-icons/lu";
import { FiTrash2 } from "react-icons/fi";

interface INoteMenu {
    noteId: string;
    workspaceId: string;
    workspaces: WorkspaceOption[];
}

type Sheet = "menu" | "move" | null;

export default function NoteMenu({ noteId, workspaceId, workspaces }: INoteMenu) {
    const router = useRouter();
    const [sheet, setSheet] = useState<Sheet>(null);

    function openMenu(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        setSheet("menu");
    }

    function openEdit() {
        setSheet(null);
        router.push(`/workspace/${workspaceId}/${noteId}`);
    }

    async function handleDelete() {
        setSheet(null);
        await deleteNote(noteId);
    }

    return (
        <>
            <button onClick={openMenu} aria-label="Opzioni appunto" className="text-gray cursor-pointer">
                <HiDotsHorizontal size={22} />
            </button>

            <BottomSheet open={sheet === "menu"} onClose={() => setSheet(null)} ariaLabel="Opzioni appunto">
                <Typography className="mb-4 block uppercase">Appunto</Typography>

                <button onClick={openEdit} className="w-full flex items-center gap-4 py-3 cursor-pointer">
                    <span className="w-12 h-12 rounded-md bg-surface flex items-center justify-center text-ink">
                        <LuFileText size={20} />
                    </span>
                    <Typography variant="h2">Apri e modifica</Typography>
                </button>

                <button onClick={() => setSheet("move")} className="w-full flex items-center gap-4 py-3 cursor-pointer">
                    <span className="w-12 h-12 rounded-md bg-surface flex items-center justify-center text-ink">
                        <LuFolderUp size={20} />
                    </span>
                    <Typography variant="h2">Sposta in un&apos;altra area</Typography>
                </button>

                <button onClick={handleDelete} className="w-full flex items-center gap-4 py-3 cursor-pointer">
                    <span
                        className="w-12 h-12 rounded-md flex items-center justify-center"
                        style={{
                            backgroundColor: "color-mix(in srgb, var(--color-area-crimson) 12%, transparent)",
                            color: "var(--color-area-crimson)",
                        }}
                    >
                        <FiTrash2 size={20} />
                    </span>
                    <Typography variant="h2" color="var(--color-area-crimson)">Elimina appunto</Typography>
                </button>
            </BottomSheet>

            <MoveNoteSheet
                open={sheet === "move"}
                onClose={() => setSheet(null)}
                noteId={noteId}
                currentWorkspaceId={workspaceId}
                workspaces={workspaces}
            />
        </>
    );
}
