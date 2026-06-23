"use server";

import { GoogleGenAI } from "@google/genai";
import { db } from "@/lib/db";

export type ChatTurn = { role: "user" | "model"; text: string };

export async function askAssistant(
  question: string,
  history: ChatTurn[] = [],
): Promise<{ error: string } | { answer: string }> {
  const trimmed = question.trim();
  if (!trimmed) return { error: "Scrivi una domanda" };

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return { error: "GEMINI_API_KEY non configurata" };

  const notes = await db.query.notes.findMany({
    columns: { title: true, content: true },
    with: { workspace: { columns: { title: true } } },
  });

  const context = notes.length
    ? notes
        .map((n, i) => `[${i + 1}] Area: ${n.workspace.title}\nTitolo: ${n.title}\nContenuto: ${n.content}`)
        .join("\n\n")
    : "(L'utente non ha ancora salvato nessun appunto.)";

  const systemInstruction = `Sei l'assistente di un'app di appunti personali.
Rispondi in italiano, in modo chiaro e conciso, usando SOLO le informazioni contenute negli appunti dell'utente qui sotto.
Se la risposta non è presente negli appunti, dillo onestamente senza inventare.
Quando utile, indica da quale area/appunto proviene l'informazione.

=== APPUNTI DELL'UTENTE ===
${context}`;

  const contents = [
    ...history.map((turn) => ({ role: turn.role, parts: [{ text: turn.text }] })),
    { role: "user", parts: [{ text: trimmed }] },
  ];

  try {
    const response = await new GoogleGenAI({ apiKey }).models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: { systemInstruction },
    });

    const answer = response.text?.trim();
    if (!answer) return { error: "L'assistente non ha prodotto una risposta" };

    return { answer };
  } catch {
    return { error: "Errore nella risposta dell'assistente, riprova" };
  }
}
