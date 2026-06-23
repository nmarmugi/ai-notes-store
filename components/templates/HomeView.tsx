"use client";

import { ReactNode, useState } from "react";
import Button from "@/components/atoms/Button";
import Typography from "@/components/atoms/Typography";
import FloatingButtons from "@/components/molecules/FloatingButtons";
import PageContainer from "@/components/templates/PageContainer";
import PageHeader from "@/components/organisms/PageHeader";
import NewAreaModal from "@/components/organisms/NewAreaModal";
import { createWorkspace } from "@/lib/actions/workspaces";
import { FiPlus } from "react-icons/fi";

interface IHomeView {
  areasCount: number;
  notesCount: number;
  children: ReactNode;
}

export default function HomeView({ areasCount, notesCount, children }: IHomeView) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <PageContainer>
      <PageHeader
        left={
          <div>
            <Typography>
              {areasCount} aree - {notesCount} appunti
            </Typography>
            <Typography variant="h1">I tuoi spazi</Typography>
          </div>
        }
        right={<Button variant="icon" ariaLabel="Nuova area" icon={<FiPlus size={20} />} onClick={() => setIsModalOpen(true)} />}
      />

      {children}

      <button onClick={() => setIsModalOpen(true)} className="w-full hover:border-solid transition duration-300 text-gray p-4 border border-dashed border-gray rounded-md bg-transparent cursor-pointer flex justify-center items-center gap-2">
        <FiPlus />
        <Typography>Nuova area di lavoro</Typography>
      </button>

      <FloatingButtons />

      <NewAreaModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={async ({ name, color }) => {
          const result = await createWorkspace(name, color);
          if (result?.error) return { error: result.error };
          setIsModalOpen(false);
        }}
      />
    </PageContainer>
  );
}
