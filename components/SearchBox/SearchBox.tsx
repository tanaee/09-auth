"use client";

import type { DebouncedState } from "use-debounce";
import css from "./SearchBox.module.css";
import type { ChangeEvent } from "react";
interface SearchBoxProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={value}
      onChange={onChange}
    />
  );
}
