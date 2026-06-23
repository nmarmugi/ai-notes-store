"use client";

import Typography from "@/components/atoms/Typography";
import BottomSheet from "@/components/organisms/BottomSheet";
import { moveNote } from "@/lib/actions/notes";
import { FiCheck } from "react-icons/fi";

export interface WorkspaceOption {
    id: string;
    title: string;
    color: string;
}

interface IMoveNoteSheet {
    open: boolean;
    onClose: () => void;
    noteId: string;
    currentWorkspaceId: string;
    workspaces: WorkspaceOption[];
    onMoved?: (targetWorkspaceId: string) => void;
}

export default function MoveNoteSheet({ open, onClose, noteId, currentWorkspaceId, workspaces, onMoved }: IMoveNoteSheet) {
    async function handleMove(targetId: string) {
        onClose();
        if (targetId !== currentWorkspaceId) {
            await moveNote(noteId, targetId);
            onMoved?.(targetId);
        }
    }

    return (
        <BottomSheet open={open} onClose={onClose} ariaLabel="Sposta appunto">
            <Typography variant="h1" className="mb-5">
                Sposta in
            </Typography>

            <div className="flex flex-col gap-3 max-h-[55vh] overflow-y-auto">
                {workspaces.map((workspace) => (
                    <button
                        key={workspace.id}
                        onClick={() => handleMove(workspace.id)}
                        className="w-full border border-gray bg-surface-bright p-4 rounded-md flex items-center justify-between cursor-pointer hover:bg-surface transition duration-300"
                    >
                        <div className="flex items-center gap-3">
                            <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: `var(--color-area-${workspace.color})` }}
                            />
                            <Typography variant="h2">{workspace.title}</Typography>
                        </div>
                        {workspace.id === currentWorkspaceId && <FiCheck className="text-accent" size={20} />}
                    </button>
                ))}
            </div>
        </BottomSheet>
    );
}
