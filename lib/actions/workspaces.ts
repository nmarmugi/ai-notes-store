"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { workspaces } from "@/lib/db/schema";

export async function createWorkspace(name: string, color: string) {
  const trimmed = name.trim();
  if (!trimmed) return { error: "Il nome dell'area è obbligatorio" };

  const existing = await db.query.workspaces.findFirst({
    where: (workspace, { ilike }) => ilike(workspace.title, trimmed),
  });
  if (existing) return { error: "Esiste già un'area con questo nome" };

  const [created] = await db
    .insert(workspaces)
    .values({ title: trimmed, color })
    .returning();

  revalidatePath("/");

  return { id: created.id };
}

export async function renameWorkspace(id: string, name: string) {
  const trimmed = name.trim();
  if (!trimmed) return { error: "Il nome dell'area è obbligatorio" };

  const existing = await db.query.workspaces.findFirst({
    where: (workspace, { and, ilike, ne }) => and(ilike(workspace.title, trimmed), ne(workspace.id, id)),
  });
  if (existing) return { error: "Esiste già un'area con questo nome" };

  await db.update(workspaces).set({ title: trimmed }).where(eq(workspaces.id, id));

  revalidatePath("/");
  revalidatePath(`/workspace/${id}`);

  return {};
}

export async function deleteWorkspace(id: string) {
  await db.delete(workspaces).where(eq(workspaces.id, id));

  revalidatePath("/");

  return {};
}
