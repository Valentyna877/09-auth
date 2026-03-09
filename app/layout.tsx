import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const roboto = Roboto({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "NoteHub — an application for creating and managing notes.",
  openGraph: {
    title: "NoteHub",
    description: "NoteHub — an application for creating and managing notes.",
    url: "https://08-zustand-qm6st2in3-valentynas-projects-4bb1e270.vercel.app",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <AuthProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
            <Footer />
            <ReactQueryDevtools initialIsOpen={false} />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}