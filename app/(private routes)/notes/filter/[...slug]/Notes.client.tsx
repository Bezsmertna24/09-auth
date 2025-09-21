'use client';

import { useState, useEffect, useRef } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import css from "./NoteClient.module.css";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Link from "next/link";
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

  const prevDataRef = useRef<NotesApiResponse | undefined>(undefined);


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

        <SearchBox searchText={searchText} onUpdate={setSearchText} />
        
        {totalPages > 1 && (
          <Pagination pageCount={totalPages} currentPage={page} onPageChange={setPage} />
        )}
        
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      <main>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading notes</p>}
        {data?.notes?.length === 0 && <p>No notes found</p>}
        {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}
      </main>
    </div>
  );
}




