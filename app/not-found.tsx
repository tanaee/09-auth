import { Metadata } from "next";
import css from "./page.module.css";
export const metadata: Metadata = {
  title: "Not found page",
  description: "Not found page for work invalid routers",
  openGraph: {
    title: "Not found page",
    description: "Not found page for work invalid routers",
    url: "https://notehub.versel.app/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};
export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
