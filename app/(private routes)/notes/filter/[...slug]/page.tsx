import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";
import { fetchServerNotes } from "@/lib/api/serverApi";
type Props = {
  params: { slug: string[] };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const filter = slug[0] === "All" ? "All" : slug[0];
  return {
    title: `NoteHub - ${filter} notes`,
    description: `Page with notes filtred by the tag ${filter}`,
    openGraph: {
      title: `NoteHub - ${filter} notes`,
      description: `Page with notes filtred by the tag ${filter}`,
      url: `https://notehub.versel.app/notes/filter/${filter}`,
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

export default async function Notes({ params }: Props) {
  const slug = params.slug;
  const filter = slug[0] === "All" ? undefined : slug[0];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", { page: 1, search: "", tag: filter }],
    queryFn: () => fetchServerNotes(1, "", filter),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient filter={filter} />
    </HydrationBoundary>
  );
}
