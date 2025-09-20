"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Link from "next/link";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { fetchNotes } from "@/lib/api";

import css from "./App.module.css";

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [debouncedText] = useDebounce(searchText, 500);
  const [page, setPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    setPage(1);
  }, [debouncedText]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", debouncedText, page],
    queryFn: () => fetchNotes(page, debouncedText || ""),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages || 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox searchText={searchText} onUpdate={setSearchText} />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <Link href="/notes/action/create" className={css.createButton}>
          Create note +
        </Link>
      </header>

      <main>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error: {(error as Error).message}</p>}
        {!isLoading && !isError && data?.notes?.length === 0 && (
          <p>No notes found</p>
        )}
        {data?.notes && data.notes.length > 0 && (
          <NoteList notes={data.notes} />
        )}

        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm />
          </Modal>
        )}
      </main>
    </div>
  );
}

