import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/serverApi";
import NoteDetailsClient from "./NoteDetails.client";

interface NoteModalPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: NoteModalPageProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);
  return {
    title: `Note ${note.title}`,
    description: `${note.content.slice(0, 30)}`,
    openGraph: {
      title: `Note ${note.title}`,
      description: `${note.content.slice(0, 30)}`,
      url: `https://08-zustand-qm6st2in3-valentynas-projects-4bb1e270.vercel.app/notes/notes/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
    },
  };
}

export default async function NoteModalPage({ params }: NoteModalPageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: async () => {
      const note = await fetchNoteById(id);
      return note;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}