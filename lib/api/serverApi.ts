import { nextServer } from "./api";
import { User } from "@/types/user";
import { Note, FetchNotesResponse } from "@/types/note";
import type { AxiosResponse } from "axios";
import { cookies } from "next/headers";

async function buildCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const cookieParts: string[] = [];
  if (accessToken) cookieParts.push(`accessToken=${accessToken}`);
  if (refreshToken) cookieParts.push(`refreshToken=${refreshToken}`);

  return cookieParts.join("; ");
}

export const checkSession = async (): Promise<AxiosResponse<User | null>> => {
  const cookieHeader = await buildCookieHeader();
  return nextServer.get<User | null>("/auth/session", {
    headers: { Cookie: cookieHeader },
    withCredentials: true,
  });
};

export const getMe = async (): Promise<User> => {
  const cookieHeader = await buildCookieHeader();
  const response = await nextServer.get<User>("/users/me", {
    headers: { Cookie: cookieHeader },
  });
  return response.data;
};

export const fetchNotes = async (
  page: number = 1,
  perPage: number = 12,
  tag?: string,
  search?: string
): Promise<FetchNotesResponse> => {
  const cookieHeader = await buildCookieHeader();
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: { search, page, perPage, tag },
    headers: { Cookie: cookieHeader },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieHeader = await buildCookieHeader();
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieHeader },
  });
  return response.data;
};