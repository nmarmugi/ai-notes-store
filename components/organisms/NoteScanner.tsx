"use client";

import { ChangeEvent, useRef, useState } from "react";
import FloatingButton from "@/components/atoms/FloatingButton";
import FloatingButtons from "@/components/molecules/FloatingButtons";
import BottomSheet from "@/components/organisms/BottomSheet";
import Button from "@/components/atoms/Button";
import Typography from "@/components/atoms/Typography";
import Input from "@/components/atoms/Input";
import { analyzeNoteImage, createNote } from "@/lib/actions/notes";
import { MdOutlineAddAPhoto } from "react-icons/md";

interface INoteScanner {
    workspaceId: string;
}

type Status = "idle" | "scanning" | "preview" | "saving";

export default function NoteScanner({ workspaceId }: INoteScanner) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [status, setStatus] = useState<Status>("idle");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    function pickImage() {
        inputRef.current?.click();
    }

    async function handleFile(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        e.target.value = ""; // permette di riselezionare lo stesso file
        if (!file) return;

        setError("");
        setTitle("");
        setContent("");
        setStatus("scanning");

        const formData = new FormData();
        formData.append("image", file);
        const result = await analyzeNoteImage(formData);

        if ("error" in result) {
            setError(result.error);
            setStatus("preview");
            return;
        }

        setTitle(result.title);
        setContent(result.summary);
        setStatus("preview");
    }

    async function handleSave() {
        if (!title.trim() || !content.trim()) {
            setError("Titolo e contenuto non possono essere vuoti");
            return;
        }
        setError("");
        setStatus("saving");

        const result = await createNote(workspaceId, title, content);
        if ("error" in result) {
            setError(result.error);
            setStatus("preview");
            return;
        }
        close();
    }

    function close() {
        setStatus("idle");
        setTitle("");
        setContent("");
        setError("");
    }

    return (
        <>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleFile}
            />

            <FloatingButtons
                leading={
                    <FloatingButton
                        ariaLabel="Scansiona appunti"
                        className="bg-accent shadow-glow"
                        icon={<MdOutlineAddAPhoto size={24} />}
                        onClick={pickImage}
                    />
                }
            />

            <BottomSheet open={status === "scanning"} onClose={() => {}} ariaLabel="Analisi in corso">
                <Typography variant="h1" className="mb-2">
                    Sto leggendo gli appunti…
                </Typography>
                <Typography>L&apos;AI sta analizzando la foto, un attimo.</Typography>
            </BottomSheet>

            <BottomSheet
                open={status === "preview" || status === "saving"}
                onClose={close}
                ariaLabel="Anteprima appunto"
            >
                <Typography variant="h1" className="mb-5">
                    Anteprima
                </Typography>

                <div className="mb-4">
                    <Input
                        value={title}
                        onChange={(value) => {
                            setTitle(value);
                            if (error) setError("");
                        }}
                        placeholder="Titolo"
                        ariaLabel="Titolo appunto"
                    />
                </div>

                <textarea
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                        if (error) setError("");
                    }}
                    placeholder="Contenuto dell'appunto"
                    rows={8}
                    className="w-full border border-gray rounded-md p-4 bg-transparent typo-body placeholder:text-gray resize-none mb-2"
                />

                {error && (
                    <Typography color="var(--color-area-crimson)" className="mb-2 block">
                        {error}
                    </Typography>
                )}

                <div className="flex gap-3 mt-2">
                    <Button
                        variant="secondary"
                        content="Riscansiona"
                        onClick={pickImage}
                        className="flex-1 border border-gray text-ink rounded-md p-4 cursor-pointer hover:bg-surface transition duration-300"
                    />
                    <Button
                        variant="primary"
                        content="Salva"
                        onClick={handleSave}
                        className="flex-1 text-surface-bright rounded-md p-4 cursor-pointer hover:bg-area-purple transition duration-300"
                    />
                </div>
            </BottomSheet>
        </>
    );
}
