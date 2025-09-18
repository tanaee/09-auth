import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";
import { fetchServerNoteById } from "@/lib/api/serverApi";

type Props = {
  params: Promise<{ id: string }>;
};
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchServerNoteById(id);
  return {
    title: ` Note:${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 100),
      url: "https://notehub-app-auth.vercel.app/notes/${id}",
      siteName: "NoteHub",
      images: [
        {
          url: "https://blues.com/wp-content/uploads/2023/02/notehub-js.webp",
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
      type: "article",
    },
  };
}

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notesQuery", id],
    queryFn: () => fetchServerNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
