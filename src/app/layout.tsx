import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { IoSearch, IoHome, IoSkull } from "react-icons/io5";
import { GiUfo } from "react-icons/gi";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Rick & Morty Multiverse Hub",
  description: "Explora las dimensiones y personajes de Rick y Morty ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#05070c] text-gray-100 selection:bg-green-500 selection:text-black">
        {/* Navigation Bar (Glassmorphic) */}
        <nav className="glass-panel sticky top-0 z-50 px-6 py-4 shadow-lg border-b border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none"
            >
              <GiUfo size={38} className="text-portal-green group-hover:rotate-12 transition-transform duration-300" />
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-wider text-white group-hover:text-portal-green transition-colors">
                  RICK & MORTY
                </span>
                <span className="text-xs font-bold text-portal-purple tracking-widest uppercase">
                  Multiverse Hub
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all"
              >
                <IoHome className="text-portal-purple" />
                <span>Inicio</span>
              </Link>
              <Link
                href="/search"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all border border-transparent hover:border-portal-green/20"
              >
                <IoSearch className="text-portal-green text-glow-green" />
                <span>Buscador CSR</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Content Container */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="w-full py-8 border-t border-white/5 bg-black/40 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} - Rick & Morty Multiverse Hub. Desarrollado con Next.js App Router & Tailwind CSS.</p>
        </footer>
      </body>
    </html>
  );
}
