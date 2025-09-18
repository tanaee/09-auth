"use client";

import { fetchNoteById } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";

import css from "./NotePreview.module.css";
import { useParams, useRouter } from "next/navigation";

import Modal from "@/components/Modal/Modal";

export default function PreviewModal() {
  const router = useRouter();
  const close = () => router.back();
  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
  });
  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }
  if (error || !note) {
    return <p>Something went wrong.</p>;
  }
  const formattedDate = note.createdAt && `Created at: ${note.createdAt}`;

  return (
    <Modal onClose={close}>
      <button onClick={close} className={css.backBtn}>
        Close{" "}
      </button>
      <div>
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{formattedDate}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
