import axios from "axios";
import type { Note } from "@/types/note";

const NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const LINK = 'https://notehub-public.goit.study/api/notes';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${NOTEHUB_TOKEN}`,
};


export const noteHubApi = axios.create({
  baseURL: LINK,
  headers,
  withCredentials: true,
});


export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});

export default api;

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(page: number, userQuery: string = "", tag?: string): Promise<NoteResponse> {
  const response = await noteHubApi.get<NoteResponse>("", {
    params: {
      search: userQuery || undefined,
      page,
      perPage: 12,
      tag: tag || undefined,
    },
  });
  return response.data;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

export async function createNote(newNote: CreateNoteParams): Promise<Note> {
  const response = await noteHubApi.post<Note>("", newNote);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await noteHubApi.delete<Note>(`/${id}`);
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await noteHubApi.get<Note>(`/${id}`);
  return response.data;
}
