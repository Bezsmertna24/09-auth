'use client';

import { useState, useEffect, useRef } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import css from "./NoteClient.module.css";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import type { Note } from "@/types/note";

interface NotesListClientProps {
  tag?: string;
}

interface NotesApiResponse {
  notes: Note[];
  totalPages: number;
}

export default function NotesListClient({ tag }: NotesListClientProps) {
  const [searchText, setSearchText] = useState("");
  const [debouncedText] = useDebounce(searchText, 500);
  const [page, setPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);


  const prevDataRef = useRef<NotesApiResponse | undefined>(undefined);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);


  useEffect(() => {
    setPage(1);
  }, [tag, debouncedText]);


  const queryKey = ["notes", tag, debouncedText, page];


  const queryResult = useQuery<NotesApiResponse, Error>({
    queryKey,
    queryFn: () => fetchNotes(page, debouncedText || "", tag),
    placeholderData: () => prevDataRef.current,
  });

 
  useEffect(() => {
    if (queryResult.data) {
      prevDataRef.current = queryResult.data;
    }
  }, [queryResult.data]);

  const { data, isLoading, isError } = queryResult;

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search notes..."
          className={css.input}
        />
        {totalPages > 1 && (
          <Pagination pageCount={totalPages} currentPage={page} onPageChange={setPage} />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      <main>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading notes</p>}
        {data?.notes?.length === 0 && <p>No notes found</p>}
        {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}

        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onClose={closeModal} />
          </Modal>
        )}
      </main>
    </div>
  );
}

