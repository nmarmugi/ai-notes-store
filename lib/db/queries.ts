import { db } from "@/lib/db";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function getWorkspaces() {
  return db.query.workspaces.findMany({
    with: { notes: true },
    orderBy: (workspace, { desc }) => [desc(workspace.createdAt)],
  });
}

export async function getWorkspace(id: string) {
  if (!UUID_RE.test(id)) return undefined;

  return db.query.workspaces.findFirst({
    where: (workspace, { eq }) => eq(workspace.id, id),
    with: {
      notes: {
        orderBy: (note, { desc }) => [desc(note.createdAt)],
      },
    },
  });
}

export async function getWorkspacesBasic() {
  return db.query.workspaces.findMany({
    columns: { id: true, title: true, color: true },
    orderBy: (workspace, { desc }) => [desc(workspace.createdAt)],
  });
}

export async function getNote(workspaceId: string, noteId: string) {
  if (!UUID_RE.test(workspaceId) || !UUID_RE.test(noteId)) return undefined;

  return db.query.notes.findFirst({
    where: (note, { and, eq }) => and(eq(note.id, noteId), eq(note.workspaceId, workspaceId)),
    with: { workspace: true },
  });
}
