"use client";

import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api/clientApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { useDebounce } from "use-debounce";
import css from "./Notes.client.module.css";
import Link from "next/link";

interface NoteDeClientProps {
  filter?: string;
}
export default function NotesClient({ filter }: NoteDeClientProps) {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchNote, setSearchNote] = useState("");
  const [updateSearchNote] = useDebounce(searchNote, 300);
  const { data } = useQuery({
    queryKey: [
      "notes",
      {
        page: currentPage,
        search: updateSearchNote,
        tag: filter,
      },
    ],
    queryFn: () => fetchNotes(currentPage, updateSearchNote, filter),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox
          value={searchNote}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearchNote(e.target.value);
            setCurrentPage(1);
          }}
        />
        {data && data?.totalPages > 1 && (
          <Pagination
            pageCount={data?.totalPages}
            forcePage={currentPage - 1}
            onPageChange={(event) => setCurrentPage(event.selected + 1)}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </div>

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
