export interface Note {
  id: string;
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  createdAt: string;
  updatedAt: string;
}

export type TagList = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export type NewNote = {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
};
