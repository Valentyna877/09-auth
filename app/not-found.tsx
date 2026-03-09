import type { Metadata } from "next";
import css from "./Home.module.css";

export const metadata: Metadata = {
  title: "NoteHub — Page not found",
  description: "This page does not exist in NoteHub.",
  openGraph: {
    title: "NoteHub — Page not found",
    description: "This page does not exist in NoteHub.",
    url: "https://08-zustand-qm6st2in3-valentynas-projects-4bb1e270.vercel.app",
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
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}