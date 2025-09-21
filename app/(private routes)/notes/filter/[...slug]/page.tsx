import css from "./NoteClient.module.css";
import type { Metadata } from 'next';
import NoteListClient from "./Notes.client";
import { fetchNotes } from "@/lib/api/serverApi";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

type Props = {
  params: { slug?: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = params.slug?.[0] || 'All';
  return {
    title: `Notes - ${tag}`,
    description: `List of notes filtered by tag: ${tag}`,
    openGraph: {
      title: `Notes - ${tag}`,
      description: `List of notes filtered by tag: ${tag}`,
      url: `https://your-vercel-url.vercel.app/notes/filter/${tag}`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

export default async function App({ params }: Props) {
  const tag = params.slug?.[0] || "";
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ["notes", { query: "", page: 1, tag }],
    queryFn: () => fetchNotes(1, "", tag),
  });

  return (
    <div className={css.app}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteListClient tag={tag} />
      </HydrationBoundary>
    </div>
  );
}
