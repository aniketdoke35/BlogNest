import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlogNest",
  description: "A premium blogging platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="py-8 text-center text-sm text-neutral-400 bg-neutral-900 mt-auto">
            &copy; {new Date().getFullYear()} BlogNest. All rights reserved.
          </footer>
        </Providers>
      </body>
    </html>
  );
}
