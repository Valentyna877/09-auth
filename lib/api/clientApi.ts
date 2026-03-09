import { nextServer } from "./api";
import { User } from "@/types/user";
import { Note } from "@/types/note";
import type { FetchNotesResponse, NoteTag } from "@/types/note";

export const register = async (payload: { email: string; password: string }): Promise<User> => {
  const { data } = await nextServer.post<User>("/auth/register", payload);
  return data;
};

export const login = async (payload: { email: string, password: string }): Promise<User> => {
  const { data } = await nextServer.post<User>("/auth/login", payload);
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const checkSession = async (): Promise<User | null> => {
  const { data } = await nextServer.get<User | null>("/auth/session");
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const updateMe = async (payload: { username: string }): Promise<User> => {
  const { data } = await nextServer.patch<User>("/users/me", payload);
  return data;
};

export const fetchNotes = async (
  page: number = 1,
  perPage: number = 12,
  tag?: NoteTag,
  search?: string,
): Promise<FetchNotesResponse> => {
  const { data } = await nextServer.get<FetchNotesResponse>("/notes", {
    params: { search, page, perPage, tag },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: { title: string; content: string; tag: string }): Promise<Note> => {
  const { data } = await nextServer.post<Note>("/notes", note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
};