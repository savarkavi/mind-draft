import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from "./(marketing)/_components/Header";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MindDraft",
  description:
    "Streamline Your Thoughts with AI-Powered Notes. Welcome to MindDraft.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F3EBDB]`}>
        <Providers>
          <NextTopLoader color="#4dc88a" />
          <Toaster position="top-center" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
