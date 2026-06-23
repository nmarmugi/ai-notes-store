"use server";

import { GoogleGenAI, Type } from "@google/genai";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { notes } from "@/lib/db/schema";

const PROMPT = `Sei un assistente che legge foto di appunti (scritti a mano o digitali).
Leggi tutto il testo presente nell'immagine e restituisci:
- "title": un titolo breve e descrittivo dell'argomento (massimo 6 parole).
- "summary": il contenuto degli appunti in italiano, chiaro e ordinato.
  Se gli appunti sono discorsivi, riassumili mantenendo TUTTI i concetti chiave: non essere troppo sintetico.
  Se il testo è già un riassunto, un elenco o degli schemi, riportalo fedelmente riordinandolo, SENZA accorciarlo ulteriormente.
Se nell'immagine non c'è testo leggibile, restituisci title e summary come stringhe vuote.`;

type AnalyzeResult = { error: string } | { title: string; summary: string };

export async function analyzeNoteImage(formData: FormData): Promise<AnalyzeResult> {
  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Nessuna immagine ricevuta" };
  }
  if (!file.type.startsWith("image/")) {
    return { error: "Il file non è un'immagine" };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { error: "GEMINI_API_KEY non configurata" };
  }

  const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");
  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { mimeType: file.type, data: base64 } },
            { text: PROMPT },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
          },
          required: ["title", "summary"],
        },
      },
    });

    const text = response.text;
    if (!text) return { error: "L'AI non ha restituito alcun risultato" };

    const parsed = JSON.parse(text) as { title?: string; summary?: string };
    const summary = parsed.summary?.trim();
    if (!summary) {
      return { error: "Nessun testo leggibile trovato nell'immagine" };
    }

    return { title: parsed.title?.trim() ?? "", summary };
  } catch {
    return { error: "Errore durante l'analisi dell'immagine, riprova" };
  }
}

export async function createNote(
  workspaceId: string,
  title: string,
  content: string,
): Promise<{ error: string } | { ok: true }> {
  const trimmedTitle = title.trim();
  const trimmedContent = content.trim();
  if (!trimmedTitle || !trimmedContent) {
    return { error: "Titolo e contenuto sono obbligatori" };
  }

  const workspace = await db.query.workspaces.findFirst({
    where: (w, { eq }) => eq(w.id, workspaceId),
  });
  if (!workspace) return { error: "Area non trovata" };

  await db.insert(notes).values({ workspaceId, title: trimmedTitle, content: trimmedContent });

  revalidatePath(`/workspace/${workspaceId}`);
  revalidatePath("/");

  return { ok: true };
}

export async function updateNote(
  noteId: string,
  title: string,
  content: string,
): Promise<{ error: string } | { ok: true }> {
  const trimmedTitle = title.trim();
  const trimmedContent = content.trim();
  if (!trimmedTitle || !trimmedContent) {
    return { error: "Titolo e contenuto sono obbligatori" };
  }

  const [updated] = await db
    .update(notes)
    .set({ title: trimmedTitle, content: trimmedContent })
    .where(eq(notes.id, noteId))
    .returning();
  if (!updated) return { error: "Appunto non trovato" };

  revalidatePath(`/workspace/${updated.workspaceId}`);
  revalidatePath(`/workspace/${updated.workspaceId}/${noteId}`);
  revalidatePath("/");

  return { ok: true };
}

export async function deleteNote(noteId: string): Promise<{ error: string } | { ok: true }> {
  const [deleted] = await db.delete(notes).where(eq(notes.id, noteId)).returning();
  if (!deleted) return { error: "Appunto non trovato" };

  revalidatePath(`/workspace/${deleted.workspaceId}`);
  revalidatePath("/");

  return { ok: true };
}

export async function moveNote(
  noteId: string,
  targetWorkspaceId: string,
): Promise<{ error: string } | { ok: true }> {
  const note = await db.query.notes.findFirst({
    where: (n, { eq: equals }) => equals(n.id, noteId),
  });
  if (!note) return { error: "Appunto non trovato" };

  const target = await db.query.workspaces.findFirst({
    where: (w, { eq: equals }) => equals(w.id, targetWorkspaceId),
  });
  if (!target) return { error: "Area non trovata" };

  if (note.workspaceId !== targetWorkspaceId) {
    await db.update(notes).set({ workspaceId: targetWorkspaceId }).where(eq(notes.id, noteId));
    revalidatePath(`/workspace/${note.workspaceId}`);
    revalidatePath(`/workspace/${targetWorkspaceId}`);
    revalidatePath("/");
  }

  return { ok: true };
}
