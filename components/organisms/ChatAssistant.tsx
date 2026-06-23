"use client";

import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import FloatingButton from "@/components/atoms/FloatingButton";
import BottomSheet from "@/components/organisms/BottomSheet";
import Typography from "@/components/atoms/Typography";
import { askAssistant, ChatTurn } from "@/lib/actions/assistant";
import { RiChatAiLine } from "react-icons/ri";
import { FiX, FiSend } from "react-icons/fi";

const GREETING: ChatTurn = {
    role: "model",
    text: "Ciao! Sono il tuo assistente. Posso rispondere usando gli appunti che hai salvato in tutte le aree.",
};

export default function ChatAssistant() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<ChatTurn[]>([GREETING]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    async function send(text: string) {
        const question = text.trim();
        if (!question || loading) return;

        const history = messages.slice(1); // esclude il messaggio di benvenuto
        setMessages((prev) => [...prev, { role: "user", text: question }]);
        setInput("");
        setLoading(true);

        const result = await askAssistant(question, history);
        setLoading(false);

        const answer = "error" in result ? result.error : result.answer;
        setMessages((prev) => [...prev, { role: "model", text: answer }]);
    }

    return (
        <>
            <FloatingButton
                ariaLabel="Assistente appunti"
                icon={<RiChatAiLine size={24} />}
                onClick={() => setOpen(true)}
            />

            <BottomSheet
                open={open}
                onClose={() => setOpen(false)}
                ariaLabel="Assistente appunti"
                panelClassName="h-[88vh] flex flex-col"
            >
                <div className="flex items-center justify-between gap-3 pb-4 border-b border-gray/20 shrink-0">
                    <div className="flex items-center gap-3">
                        <span className="w-11 h-11 rounded-full bg-ink text-surface-bright flex items-center justify-center">
                            <RiChatAiLine size={22} />
                        </span>
                        <div>
                            <Typography variant="h2">Assistente appunti</Typography>
                            <Typography>Cerca tra tutti i tuoi spazi</Typography>
                        </div>
                    </div>
                    <button
                        onClick={() => setOpen(false)}
                        aria-label="Chiudi"
                        className="w-9 h-9 rounded-full bg-surface flex items-center justify-center text-gray cursor-pointer shrink-0"
                    >
                        <FiX size={18} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-3">
                    {messages.map((message, i) => (
                        <div
                            key={i}
                            className={message.role === "user" ? "self-end max-w-[85%]" : "self-start max-w-[90%]"}
                        >
                            <div
                                className={twMerge(
                                    "rounded-xl p-4",
                                    message.role === "user"
                                        ? "bg-accent"
                                        : "border border-gray bg-surface-bright"
                                )}
                            >
                                <Typography
                                    variant="p"
                                    color={message.role === "user" ? "var(--color-surface-bright)" : undefined}
                                >
                                    {message.text}
                                </Typography>
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="self-start border border-gray bg-surface-bright rounded-xl p-4">
                            <Typography>Sto pensando…</Typography>
                        </div>
                    )}

                    <div ref={endRef} />
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-gray/20 shrink-0">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") send(input);
                        }}
                        placeholder="Chiedi qualcosa ai tuoi appunti…"
                        className="flex-1 border border-gray rounded-full px-5 py-3 bg-transparent typo-body placeholder:text-gray"
                    />
                    <button
                        onClick={() => send(input)}
                        disabled={loading}
                        aria-label="Invia"
                        className="w-12 h-12 rounded-full bg-accent text-surface-bright flex items-center justify-center cursor-pointer disabled:opacity-50 shrink-0"
                    >
                        <FiSend size={20} />
                    </button>
                </div>
            </BottomSheet>
        </>
    );
}
