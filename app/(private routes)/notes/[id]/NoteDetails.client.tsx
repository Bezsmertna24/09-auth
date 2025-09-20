'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import type { Note } from '@/types/note';

interface Props {
  noteId: string;
}

export default function NoteDetailsClient({ noteId }: Props) {
  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading note.</p>;
  if (!note) return <p>Note not found.</p>; 

  return (
    <Modal onClose={() => window.history.back()}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>Tag: {note.tag}</p>
    </Modal>
  );
}

