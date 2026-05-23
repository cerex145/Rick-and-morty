import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Character, CharacterListResponse } from "@/types/character";
import { IoArrowBackOutline, IoHeartOutline, IoLocationOutline, IoFlaskOutline, IoCalendarOutline, IoFilmOutline } from "react-icons/io5";
import { GiPortal } from "react-icons/gi";

// Configuración de Revalidación para ISR (Incremental Static Regeneration) cada 10 días
export const revalidate = 864000; // 10 días = 10 * 86400 segundos

interface CharacterPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Obtener un personaje por su ID (usando ISR)
async function getCharacter(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    next: { revalidate: 864000 }, // 10 días
  });

  if (!res.ok) {
    throw new Error(`No se pudo obtener información del personaje con ID ${id}`);
  }

  return res.json();
}

// Genera los parámetros estáticos (SSG) para los primeros 20 personajes durante la compilación
export async function generateStaticParams() {
  try {
    const res = await fetch("https://rickandmortyapi.com/api/character?page=1");
    if (!res.ok) return [];

    const data: CharacterListResponse = await res.json();
    return data.results.map((character) => ({
      id: character.id.toString(),
    }));
  } catch (error) {
    console.error("Error en generateStaticParams:", error);
    return [];
  }
}

// Generación de metadatos dinámicos para optimización SEO
export async function generateMetadata({ params }: CharacterPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const character = await getCharacter(id);
    return {
      title: `${character.name} - Rick & Morty Hub`,
      description: `Detalles completos del personaje ${character.name} de la especie ${character.species} del multiverso de Rick and Morty.`,
    };
  } catch {
    return {
      title: "Personaje No Encontrado - Rick & Morty Hub",
    };
  }
}

export default async function CharacterDetailPage({ params }: CharacterPageProps) {
  const { id } = await params;
  const character = await getCharacter(id);

  const isAlive = character.status === "Alive";
  const isDead = character.status === "Dead";

  // Fecha legible de creación en la API
  const creationDate = new Date(character.created).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition border border-white/5 focus:outline-none"
        >
          <IoArrowBackOutline size={16} />
          <span>Volver al Portal Principal</span>
        </Link>
      </div>

      {/* Main detail card (Premium design with status color borders) */}
      <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-white/5">
        {/* Banner with status colors */}
        <div
          className={`h-24 bg-linear-to-r ${
            isAlive
              ? "from-emerald-950/60 to-emerald-800/25 border-b border-portal-green/20"
              : isDead
              ? "from-red-950/60 to-red-900/25 border-b border-red-500/20"
              : "from-slate-900 to-slate-800 border-b border-white/10"
          } p-6 flex items-center justify-between`}
        >
          <div className="flex items-center gap-2">
            <GiPortal size={24} className={isAlive ? "text-portal-green animate-spin [animation-duration:8s]" : "text-gray-400"} />
            <span className="text-xs font-black tracking-widest text-white/60 uppercase">
              Expediente Multiversal
            </span>
          </div>

          <div className="px-3.5 py-1 text-xs font-bold rounded-full bg-black/50 border border-white/10 flex items-center gap-1.5">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isAlive ? "bg-portal-green glow-green" : isDead ? "bg-red-500" : "bg-gray-400"
              }`}
            ></span>
            <span className="capitalize text-gray-200">{character.status}</span>
          </div>
        </div>

        {/* Content Layout */}
        <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8">
          {/* Avatar side */}
          <div className="flex-1 flex flex-col items-center space-y-4">
            <div className="relative rounded-2xl overflow-hidden aspect-square w-64 shadow-2xl border border-white/10">
              <Image
                src={character.image}
                alt={character.name}
                width={300}
                height={300}
                className="w-full h-full object-cover"
                priority={true} // Priority loading as this is the primary asset on this page
              />
            </div>
            
            <h1 className="text-3xl font-black text-center text-white capitalize tracking-tight leading-tight">
              {character.name}
            </h1>
            <p className="text-sm font-bold text-portal-green tracking-widest uppercase">
              {character.species}
            </p>
          </div>

          {/* Details side (Fields mapped comprehensively) */}
          <div className="flex-2 space-y-6">
            <h2 className="text-xl font-extrabold text-white border-b border-white/5 pb-2">
              Ficha Técnica del Sujeto
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Status & Species */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-white/5 rounded-xl text-portal-purple">
                  <IoHeartOutline size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">
                    Estado & Especie
                  </span>
                  <span className="text-sm font-semibold text-gray-200">
                    {character.status} — {character.species}
                  </span>
                </div>
              </div>

              {/* Gender */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-white/5 rounded-xl text-portal-purple">
                  <IoFlaskOutline size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">
                    Género / Identidad
                  </span>
                  <span className="text-sm font-semibold text-gray-200 capitalize">
                    {character.gender}
                  </span>
                </div>
              </div>

              {/* Type (if exists) */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-white/5 rounded-xl text-portal-purple">
                  <GiPortal size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">
                    Subtipo / Clasificación
                  </span>
                  <span className="text-sm font-semibold text-gray-200">
                    {character.type || "Estándar / Ninguno"}
                  </span>
                </div>
              </div>

              {/* Episode appearances */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-white/5 rounded-xl text-portal-purple">
                  <IoFilmOutline size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">
                    Aparición en Capítulos
                  </span>
                  <span className="text-sm font-semibold text-gray-200">
                    {character.episode.length} {character.episode.length === 1 ? "episodio" : "episodios"}
                  </span>
                </div>
              </div>

              {/* Origin Location */}
              <div className="flex items-start gap-3 sm:col-span-2">
                <div className="p-2.5 bg-white/5 rounded-xl text-portal-purple">
                  <IoLocationOutline size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">
                    Planeta / Dimensión de Origen
                  </span>
                  <span className="text-sm font-semibold text-gray-200 capitalize">
                    {character.origin.name}
                  </span>
                </div>
              </div>

              {/* Last known location */}
              <div className="flex items-start gap-3 sm:col-span-2">
                <div className="p-2.5 bg-white/5 rounded-xl text-portal-purple">
                  <IoLocationOutline size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">
                    Última Ubicación Registrada
                  </span>
                  <span className="text-sm font-semibold text-gray-200 capitalize">
                    {character.location.name}
                  </span>
                </div>
              </div>

              {/* Created Date */}
              <div className="flex items-start gap-3 sm:col-span-2">
                <div className="p-2.5 bg-white/5 rounded-xl text-portal-purple">
                  <IoCalendarOutline size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">
                    Ingresado al Registro Multiversal
                  </span>
                  <span className="text-sm font-semibold text-gray-200">
                    {creationDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
