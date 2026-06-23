"use client";

import { useEffect, useState } from "react";
import Typography from "@/components/atoms/Typography";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import BottomSheet from "@/components/organisms/BottomSheet";

const AREA_COLORS = ["indigo", "teal", "orange", "purple", "crimson", "blue"];

interface INewAreaModal {
    open: boolean;
    onClose: () => void;
    onCreate?: (data: { name: string; color: string }) => Promise<{ error?: string } | void>;
}

export default function NewAreaModal({ open, onClose, onCreate }: INewAreaModal) {
    const [name, setName] = useState("");
    const [color, setColor] = useState(AREA_COLORS[0]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (open) return;
        setName("");
        setColor(AREA_COLORS[0]);
        setError("");
    }, [open]);

    async function handleCreate() {
        if (!name.trim()) {
            setError("Il nome dell'area è obbligatorio");
            return;
        }
        setError("");
        const result = await onCreate?.({ name, color });
        if (result?.error) setError(result.error);
    }

    return (
        <BottomSheet open={open} onClose={onClose} ariaLabel="Nuova area di lavoro">
            <Typography variant="h1" className="mb-5">
                Nuova area di lavoro
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

            <div className="flex gap-3 mb-8">
                {AREA_COLORS.map((c) => (
                    <button
                        key={c}
                        type="button"
                        aria-label={c}
                        aria-pressed={color === c}
                        onClick={() => setColor(c)}
                        style={{
                            backgroundColor: `var(--color-area-${c})`,
                            boxShadow: color === c ? `0 0 0 2px var(--color-surface-bright), 0 0 0 4px var(--color-area-${c})` : undefined,
                        }}
                        className="w-12 h-12 rounded-sm cursor-pointer transition"
                    />
                ))}
            </div>

            <Button
                variant="primary"
                content="Crea area"
                onClick={handleCreate}
                className="w-full text-surface-bright rounded-md p-4 cursor-pointer hover:bg-area-purple transition duration-300"
            />
        </BottomSheet>
    );
}
