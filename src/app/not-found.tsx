import Link from "next/link";
import { GiPortal } from "react-icons/gi";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4 space-y-6">
      <div className="relative">
        <GiPortal size={120} className="text-portal-green animate-spin [animation-duration:15s] text-glow-green" />
        <span className="absolute inset-0 flex items-center justify-center text-4xl font-extrabold text-white">
          404
        </span>
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        ¡Dimensión Desconocida!
      </h1>
      <p className="text-gray-400 max-w-md mx-auto">
        El planeta o coordenada que buscas no existe en este multiverso. Es muy probable que Rick la haya destruido.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-portal-purple hover:bg-violet-500 text-white font-bold rounded-xl transition shadow-lg hover:shadow-violet-600/25"
      >
        Regresar al Portal Principal
      </Link>
    </div>
  );
}
