import WorkspaceCard from "@/components/molecules/WorkspaceCard";
import HomeView from "@/components/templates/HomeView";
import { getWorkspaces } from "@/lib/db/queries";
import { areaColors } from "@/lib/colors";
import { notesLabel } from "@/lib/notes";
import Link from "next/link";

export default async function Home() {
  const spaces = await getWorkspaces();
  const areasCount = spaces.length;
  const notesCount = spaces.reduce((sum, space) => sum + space.notes.length, 0);

  return (
    <HomeView areasCount={areasCount} notesCount={notesCount}>
      {spaces.map((space) => {
        const { firstColor, secondColor } = areaColors(space.color);
        return (
          <Link key={space.id} href={`/workspace/${space.id}`}>
            <WorkspaceCard
              firstColor={firstColor}
              secondColor={secondColor}
              title={space.title}
              subtitle={notesLabel(space.notes.length)}
            />
          </Link>
        );
      })}
    </HomeView>
  );
}
