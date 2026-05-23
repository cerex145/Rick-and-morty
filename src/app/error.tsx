"use client";

import { useEffect } from "react";
import { BiError } from "react-icons/bi";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Layout error details:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4 space-y-6">
      <div className="p-4 bg-red-500/10 rounded-full border border-red-500/20 glow-red animate-bounce">
        <BiError size={50} className="text-red-500" />
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        ¡Fallo en el Computador de Navegación!
      </h1>
      <p className="text-gray-400 max-w-md mx-auto">
        Parece que hemos aterrizado en una dimensión equivocada o el portal de la API experimentó una fluctuación.
      </p>
      <div className="bg-black/30 border border-red-500/20 p-4 rounded-xl max-w-lg overflow-x-auto text-left text-xs font-mono text-red-400">
        Error: {error.message || "Fluctuación cuántica inesperada."}
      </div>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition shadow-lg hover:shadow-red-600/25"
      >
        Reajustar Coordenadas del Portal (Reintentar)
      </button>
    </div>
  );
}
