"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AreaTag from "@/components/atoms/AreaTag";
import Button from "@/components/atoms/Button";
import Typography from "@/components/atoms/Typography";
import AutoTextarea from "@/components/atoms/AutoTextarea";
import PageContainer from "@/components/templates/PageContainer";
import PageHeader from "@/components/organisms/PageHeader";
import MoveNoteSheet, { WorkspaceOption } from "@/components/organisms/MoveNoteSheet";
import { updateNote, deleteNote } from "@/lib/actions/notes";
import { FiChevronLeft, FiTrash2 } from "react-icons/fi";
import { LuFolderUp } from "react-icons/lu";

interface INoteEditor {
    noteId: string;
    workspaceId: string;
    workspaceTitle: string;
    firstColor: string;
    secondColor: string;
    date: string;
    initialTitle: string;
    initialContent: string;
    workspaces: WorkspaceOption[];
}

export default function NoteEditor({
    noteId,
    workspaceId,
    workspaceTitle,
    firstColor,
    secondColor,
    date,
    initialTitle,
    initialContent,
    workspaces,
}: INoteEditor) {
    const router = useRouter();
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const [error, setError] = useState("");
    const [moveOpen, setMoveOpen] = useState(false);

    async function handleSave() {
        if (!title.trim() || !content.trim()) {
            setError("Titolo e contenuto non possono essere vuoti");
            return;
        }
        setError("");
        const result = await updateNote(noteId, title, content);
        if ("error" in result) {
            setError(result.error);
            return;
        }
        router.push(`/workspace/${workspaceId}`);
    }

    async function handleDelete() {
        await deleteNote(noteId);
        router.push(`/workspace/${workspaceId}`);
    }

    return (
        <PageContainer>
            <PageHeader
                left={
                    <button onClick={handleSave} className="flex items-center gap-1 text-accent cursor-pointer">
                        <FiChevronLeft size={22} />
                        <Typography variant="p" color="var(--color-accent)">
                            Salva
                        </Typography>
                    </button>
                }
                right={
                    <div className="flex items-center gap-2">
                        <Button
                            className="btn-ghost"
                            variant="icon"
                            ariaLabel="Sposta"
                            icon={<LuFolderUp size={20} />}
                            onClick={() => setMoveOpen(true)}
                        />
                        <Button
                            className="btn-ghost bg-area-crimson/10 border-transparent text-area-crimson hover:bg-area-crimson/20"
                            variant="icon"
                            ariaLabel="Elimina"
                            icon={<FiTrash2 size={20} />}
                            onClick={handleDelete}
                        />
                    </div>
                }
            />

            <AreaTag label={workspaceTitle} firstColor={firstColor} secondColor={secondColor} />

            <AutoTextarea
                value={title}
                onChange={(value) => {
                    setTitle(value);
                    if (error) setError("");
                }}
                placeholder="Titolo"
                ariaLabel="Titolo appunto"
                className="typo-display"
            />

            <Typography className="-mt-3">{date}</Typography>

            <AutoTextarea
                value={content}
                onChange={(value) => {
                    setContent(value);
                    if (error) setError("");
                }}
                placeholder="Scrivi qui il contenuto…"
                ariaLabel="Contenuto appunto"
                className="typo-body"
            />

            {error && (
                <Typography color="var(--color-area-crimson)" className="block">
                    {error}
                </Typography>
            )}

            <MoveNoteSheet
                open={moveOpen}
                onClose={() => setMoveOpen(false)}
                noteId={noteId}
                currentWorkspaceId={workspaceId}
                workspaces={workspaces}
                onMoved={(targetWorkspaceId) => router.push(`/workspace/${targetWorkspaceId}`)}
            />
        </PageContainer>
    );
}
