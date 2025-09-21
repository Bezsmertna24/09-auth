import { api } from "@/lib/api/api";
import type { User } from "@/types/user";
import type { Note } from "@/types/note";

export const loginUser = async (email: string, password: string) => {
  const response = await api.post<User>("/auth/login", { email, password });
  return response.data;
};

export const registerUser = async (email: string, password: string) => {
  const response = await api.post<User>("/auth/register", { email, password });
  return response.data;
};

export const logoutUser = async () => {
  await api.post("/auth/logout");
};

export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string
): Promise<{ notes: Note[]; totalPages: number }> => {
  const response = await api.get("/notes", {
    params: { page, perPage: 12, search, tag },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  const response = await api.post("/notes", note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
};

export const getSession = async (): Promise<{ data: User | null }> => {
  const response = await api.get<User>("/auth/session");
  return { data: response.data || null };
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<User>("/users/me");
  return response.data;
};

export const updateUser = async (data: Partial<User>): Promise<User> => {
  const response = await api.patch<User>("/users/me", data);
  return response.data;
};


