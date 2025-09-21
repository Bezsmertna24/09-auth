'use client';

import css from './NoteForm.module.css';
import { DraftNote, NoteTag, useNoteStore } from "@/lib/store/noteStore";
import { createNote } from '@/lib/api/clientApi';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface NoteFormProps {
  onClose?: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const { draft, setDraft, clearDraft } = useNoteStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (newNote: DraftNote) => createNote(newNote),
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.push("/notes");
      if (onClose) onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({
      title: draft.title,
      content: draft.content,
      tag: draft.tag,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        name="title"
        placeholder="Title"
        value={draft.title}
        onChange={(e) => setDraft({ title: e.target.value })}
        className={css.input}
        required
      />
      <textarea
        name="content"
        placeholder="Content"
        value={draft.content}
        onChange={(e) => setDraft({ content: e.target.value })}
        className={css.textarea}
        required
      />
      <select
        name="tag"
        value={draft.tag}
        onChange={(e) => setDraft({ tag: e.target.value as NoteTag })}
        className={css.select}
      >
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>
      <div className={css.buttons}>
        <button
          type="submit"
          className={css.submit}
          disabled={mutation.status === "pending"}
        >
          {mutation.status === "pending" ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  );
}
