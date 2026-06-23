import AreaTag from "@/components/atoms/AreaTag";
import Typography from "@/components/atoms/Typography";
import NoteCard from "@/components/molecules/NoteCard";
import BackButton from "@/components/molecules/BackButton";
import EmptyState from "@/components/molecules/EmptyState";
import PageContainer from "@/components/templates/PageContainer";
import PageHeader from "@/components/organisms/PageHeader";
import WorkspaceMenu from "@/components/organisms/WorkspaceMenu";
import NoteScanner from "@/components/organisms/NoteScanner";
import NoteMenu from "@/components/organisms/NoteMenu";
import { getWorkspace, getWorkspacesBasic } from "@/lib/db/queries";
import { areaColors } from "@/lib/colors";
import { formatNoteDate } from "@/lib/notes";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function WorkspacePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const workspace = await getWorkspace(id);

    if (!workspace) {
        notFound();
    }

    const { firstColor, secondColor } = areaColors(workspace.color);
    const allWorkspaces = await getWorkspacesBasic();

    return (
        <PageContainer>
            <PageHeader
                left={<BackButton href="/" />}
                right={<WorkspaceMenu id={workspace.id} title={workspace.title} />}
            />
            <AreaTag label="AREA" firstColor={firstColor} secondColor={secondColor} />
            <Typography variant="h1">
                {workspace.title}
            </Typography>
            {
                workspace.notes.length === 0
                    ? <EmptyState message="Vuoto" />
                    : workspace.notes.map((note) =>
                        <Link key={note.id} href={`/workspace/${workspace.id}/${note.id}`}>
                            <NoteCard
                                note={{
                                    id: note.id,
                                    title: note.title,
                                    content: note.content,
                                    date: formatNoteDate(note.createdAt),
                                }}
                                firstColor={firstColor}
                                menu={<NoteMenu noteId={note.id} workspaceId={workspace.id} workspaces={allWorkspaces} />}
                            />
                        </Link>
                    )
            }
            <NoteScanner workspaceId={workspace.id} />
        </PageContainer>
    );
}
