import axios from "axios";
import type { Note } from "../types/note";

const NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const LINK = 'https://notehub-public.goit.study/api/notes';

const headers= {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${NOTEHUB_TOKEN}`,
};

interface NoteResponse {
    notes: Note[];
    totalPages: number;
}

export async function fetchNotes (page: number, userQuery: string=""): Promise<NoteResponse> {
    
    const response = await axios.get<NoteResponse>(LINK,
        {
            params: {
                search: userQuery,
                page: page,
                perPage: 12,
            },
            headers,
        });

    return response.data;
}

export interface CreateNoteParams {
    title: string;
    content: string;
    tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

export async function createNote(newNote: CreateNoteParams):Promise<Note> {
    const response = await axios.post<Note>(LINK, newNote, {headers});
    return response.data;
}

export async function deleteNote(id: string):Promise<Note> {
     const response = await axios.delete<Note>(`${LINK}/${id}`, {headers});
    return response.data;
 }

export async function fetchNoteById (id: string): Promise<Note> {
    const response = await axios.get<Note>(`${LINK}/${id}`, {headers});
    return response.data;
}