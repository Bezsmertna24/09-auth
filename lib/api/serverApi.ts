import { api } from "./api";
import { cookies } from "next/headers";
import { Note, NoteResponse } from "@/types/note";
import type { User } from "@/types/user";

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  const cookieHeader = allCookies
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join("; ");

  return {
    headers: {
      Cookie: cookieHeader,
    },
  };
};

export const fetchNotes = async (
  page: number,
  search: string = "",
  tag?: string
): Promise<NoteResponse> => {
  const config = await getAuthHeaders();
  const response = await api.get<NoteResponse>("/notes", {
    ...config,
    params: { page, search, tag, perPage: 12 },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const config = await getAuthHeaders();
  const response = await api.get<Note>(`/notes/${id}`, config);
  return response.data;
};

export const createNote = async (note: Partial<Note>): Promise<Note> => {
  const config = await getAuthHeaders();
  const response = await api.post<Note>("/notes", note, config);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const config = await getAuthHeaders();
  const response = await api.delete<Note>(`/notes/${id}`, config);
  return response.data;
};

// --- Оновлена функція checkSession з аргументом refreshToken ---
export const checkSession = async (refreshToken?: string): Promise<{ accessToken: string; refreshToken: string } | null> => {
  let config;

  if (refreshToken) {
    // переданий токен використовується у заголовку
    config = {
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    };
  } else {
    // якщо токен не передано, беремо з cookies
    config = await getAuthHeaders();
  }

  try {
    const response = await api.post("/auth/refresh", {}, config);
    return response.data;
  } catch (error) {
    console.error("Failed to refresh session:", error);
    return null;
  }
};

export const getCurrentUser = async (): Promise<User> => {
  const config = await getAuthHeaders();
  const response = await api.get<User>("/users/me", config);
  return response.data;
};

