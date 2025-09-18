import { Suspense } from "react";
import css from "./LayoutNotes.module.css";
export default function LayoutNotes({
  children,
  sidebar,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
}>) {
  return (
    <section className={css.container}>
      <Suspense fallback={<div>Loading filters...</div>}>
        <aside className={css.sidebar}>{sidebar}</aside>
      </Suspense>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
}
