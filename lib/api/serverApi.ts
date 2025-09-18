import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/user";
import { Note } from "@/types/note";

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchServerNotes = async (
  page: number,
  mySearchNote: string,
  tag?: string,
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();

  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    headers: {
      Cookie: cookieStore.toString(),
    },
    params: {
      page,
      search: mySearchNote,
      tag,
    },
  });
  return response.data;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
export const fetchServerNoteById = async (id: string) => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
