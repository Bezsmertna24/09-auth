import { api } from "./api";
import { Note, NoteResponse } from "@/types/note";

export const fetchNotes = (page: number, search: string = "", tag?: string) =>
  api.get<NoteResponse>("/notes", {
    params: { page, search, tag, perPage: 12 },
  });

export const fetchNoteById = (id: string) => api.get<Note>(`/notes/${id}`);
export const createNote = (note: Partial<Note>) => api.post<Note>("/notes", note);
export const deleteNote = (id: string) => api.delete<Note>(`/notes/${id}`);
