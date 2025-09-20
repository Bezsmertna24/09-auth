'use client';

import css from './NoteForm.module.css';
import { DraftNote, NoteTag, useNoteStore } from "@/lib/store/noteStore";
import { useRouter } from 'next/navigation';
import { createNote } from '@/lib/api';



export default function NoteForm() {
  const { draft, setDraft, clearDraft } = useNoteStore();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const newNote: DraftNote = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as NoteTag,
    };

    await createNote(newNote);
    clearDraft();
    router.back();
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <input
        name="title"
        placeholder="Title"
        value={draft.title}
        onChange={(e) => setDraft({ title: e.target.value })}
        className={css.input}
      />
      <textarea
        name="content"
        placeholder="Content"
        value={draft.content}
        onChange={(e) => setDraft({ content: e.target.value })}
        className={css.textarea}
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
        <button type="submit" className={css.submit}>
          Create
        </button>
        <button type="button" onClick={() => router.back()} className={css.cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

