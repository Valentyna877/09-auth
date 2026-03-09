import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/serverApi";
import NotesClient from "./Notes.client";
import type { NoteTag } from "@/types/note";

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];
  return {
    title: `${tag} note `,
    description: `Browse notes tagged with: ${tag}.`,
    openGraph: {
      title: `Note ${tag}`,
      description: `Browse notes tagged with: ${tag}.`,
      url: `https://08-zustand-qm6st2in3-valentynas-projects-4bb1e270.vercel.app/notes/filter/${tag}`,
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

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const tag = slug?.[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () =>
      fetchNotes(1, 12, tag === "all" ? undefined : (tag as NoteTag)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}