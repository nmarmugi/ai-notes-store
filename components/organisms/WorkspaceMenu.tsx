"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/atoms/Button";
import Typography from "@/components/atoms/Typography";
import Input from "@/components/atoms/Input";
import BottomSheet from "@/components/organisms/BottomSheet";
import { renameWorkspace, deleteWorkspace } from "@/lib/actions/workspaces";
import { HiDotsHorizontal } from "react-icons/hi";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface IWorkspaceMenu {
    id: string;
    title: string;
}

type Sheet = "menu" | "rename" | null;

export default function WorkspaceMenu({ id, title }: IWorkspaceMenu) {
    const router = useRouter();
    const [sheet, setSheet] = useState<Sheet>(null);
    const [name, setName] = useState(title);
    const [error, setError] = useState("");

    function openRename() {
        setName(title);
        setError("");
        setSheet("rename");
    }

    async function handleRename() {
        if (!name.trim()) {
            setError("Il nome dell'area è obbligatorio");
            return;
        }
        setError("");
        const result = await renameWorkspace(id, name);
        if (result?.error) {
            setError(result.error);
            return;
        }
        setSheet(null);
    }

    async function handleDelete() {
        await deleteWorkspace(id);
        router.push("/");
    }

    return (
        <>
            <Button
                className="btn-ghost"
                variant="icon"
                ariaLabel="Opzioni"
                icon={<HiDotsHorizontal size={22} />}
                onClick={() => setSheet("menu")}
            />

            <BottomSheet open={sheet === "menu"} onClose={() => setSheet(null)} ariaLabel="Opzioni area">
                <Typography className="mb-4 block uppercase">{title}</Typography>

                <button onClick={openRename} className="w-full flex items-center gap-4 py-3 cursor-pointer">
                    <span className="w-12 h-12 rounded-md bg-surface flex items-center justify-center text-ink">
                        <FiEdit2 size={20} />
                    </span>
                    <Typography variant="h2">Rinomina area</Typography>
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
                    <Typography variant="h2" color="var(--color-area-crimson)">Elimina area</Typography>
                </button>
            </BottomSheet>

            <BottomSheet open={sheet === "rename"} onClose={() => setSheet(null)} ariaLabel="Rinomina area">
                <Typography variant="h1" className="mb-5">
                    Rinomina area
                </Typography>

                <div className="mb-6">
                    <Input
                        value={name}
                        onChange={(value) => {
                            setName(value);
                            if (error) setError("");
                        }}
                        placeholder="Nome dell'area"
                        ariaLabel="Nome dell'area"
                        error={error}
                    />
                </div>

                <Button
                    variant="primary"
                    content="Salva"
                    onClick={handleRename}
                    className="w-full text-surface-bright rounded-md p-4 cursor-pointer hover:bg-area-purple transition duration-300"
                />
            </BottomSheet>
        </>
    );
}
