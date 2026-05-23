import Link from "next/link";
import Image from "next/image";
import { CharacterListResponse } from "@/types/character";
import { GiPortal, GiSpaceship } from "react-icons/gi";
import { IoSearchCircleSharp, IoSkull, IoShieldCheckmark } from "react-icons/io5";

// Función asíncrona para obtener personajes con caché forzado (SSG)
async function getFeaturedCharacters(): Promise<CharacterListResponse> {
  const res = await fetch("https://rickandmortyapi.com/api/character?page=1", {
    cache: "force-cache", // Fuerza la caché en la petición, compilándose como SSG en build time
  });

  if (!res.ok) {
    throw new Error("No se pudo conectar al multiverso de personajes.");
  }

  return res.json();
}

export default async function HomePage() {
  const data = await getFeaturedCharacters();
  // Mostramos los primeros 12 personajes principales de la primera página
  const featured = data.results.slice(0, 12);

  return (
    <div className="space-y-12">
      {/* Hero Section (Futuristic Sci-Fi Landing) */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-r from-purple-900/40 via-[#0a0f1d]/90 to-emerald-950/30 border border-white/5 p-8 md:p-12 text-center space-y-6 shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-portal-green/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-portal-purple/10 rounded-full blur-3xl -z-10 animate-pulse"></div>

        <div className="flex justify-center">
          <GiPortal
            size={100}
            className="text-portal-green animate-spin [animation-duration:20s] text-glow-green"
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-linear-to-b from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
          Portal Multiversal de Rick & Morty
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
          Una aplicación avanzada construida con <strong className="text-portal-green">Next.js</strong> para explorar personajes de todas las dimensiones. Demuestra la implementación de estrategias avanzadas como <strong className="text-portal-purple">SSG, ISR, CSR y SSR</strong>.
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link
            href="/search"
            className="flex items-center gap-2 px-6 py-3.5 bg-portal-green hover:bg-emerald-400 text-[#05070c] font-black rounded-2xl transition shadow-lg shadow-emerald-500/20 transform hover:-translate-y-0.5"
          >
            <IoSearchCircleSharp size={24} />
            <span>Probar Buscador CSR en Tiempo Real</span>
          </Link>
          <a
            href="#featured-catalog"
            className="flex items-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition border border-white/10"
          >
            <GiSpaceship size={20} className="text-portal-purple" />
            <span>Ver Catálogo Pre-renderizado (SSG)</span>
          </a>
        </div>
      </section>

      {/* Justificación Técnica del Laboratorio */}
      <section className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/5 space-y-6">
        <h2 className="text-2xl font-extrabold flex items-center gap-2 text-white">
          <IoShieldCheckmark className="text-portal-purple text-glow-purple" />
          <span>Estrategias de Renderizado Utilizadas (Justificación)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/30 border border-white/5 rounded-xl p-5 space-y-3">
            <span className="inline-block px-2.5 py-1 text-xs font-black tracking-widest text-[#05070c] bg-portal-green rounded-md uppercase">
              SSG (Static Site Generation)
            </span>
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong>¿Dónde se usa?</strong> En esta Página Principal y en los personajes principales del detalle.
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong>Justificación:</strong> Al usar <code>cache: &apos;force-cache&apos;</code>, Next.js realiza la petición a la API durante la compilación en producción y pre-construye la página. No consume recursos de API en cada visita, logrando tiempos de carga instantáneos e indexación SEO óptima.
            </p>
          </div>

          <div className="bg-black/30 border border-white/5 rounded-xl p-5 space-y-3">
            <span className="inline-block px-2.5 py-1 text-xs font-black tracking-widest text-white bg-portal-purple rounded-md uppercase">
              ISR (Incremental Static Regeneration)
            </span>
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong>¿Dónde se usa?</strong> En las páginas de detalle dinámicas <code>character/[id]</code>.
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong>Justificación:</strong> Configurado a 10 días (<code>864000s</code>). Next.js entrega la versión estática instantánea y, al expirar el tiempo, regenera la página de fondo con datos frescos de la API si hay visitas. Evita recargas y llamadas a la API innecesarias.
            </p>
          </div>

          <div className="bg-black/30 border border-white/5 rounded-xl p-5 space-y-3">
            <span className="inline-block px-2.5 py-1 text-xs font-black tracking-widest text-[#05070c] bg-yellow-400 rounded-md uppercase">
              CSR (Client-Side Rendering)
            </span>
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong>¿Dónde se usa?</strong> En el Buscador interactivo (<code>/search</code>).
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong>Justificación:</strong> Es ideal para filtros y búsquedas dinámicas basadas en las interacciones del usuario. Los React Hooks <code>useState</code> y <code>useEffect</code> gestionan las peticiones en vivo basándose en las entradas de texto y combos, ofreciendo interactividad instantánea sin recargas de página.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Characters Catalog (SSG) */}
      <section id="featured-catalog" className="space-y-8 scroll-mt-24">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              Personajes Destacados (SSG)
            </h2>
            <p className="text-gray-400 text-sm">
              Estos personajes son obtenidos en tiempo de compilación utilizando peticiones en caché forzada.
            </p>
          </div>
          <Link
            href="/search"
            className="text-xs font-bold text-portal-green hover:underline flex items-center gap-1.5 focus:outline-none"
          >
            <span>Ver buscador interdimensional →</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.map((character) => {
            const isAlive = character.status === "Alive";
            const isDead = character.status === "Dead";

            return (
              <Link
                key={character.id}
                href={`/character/${character.id}`}
                className="group transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-portal-green/50 rounded-2xl"
              >
                <div className="glass-panel h-full rounded-2xl overflow-hidden border border-white/5 group-hover:border-white/20 transition-all flex flex-col">
                  {/* Character Image */}
                  <div className="relative aspect-square w-full bg-slate-900 overflow-hidden">
                    <Image
                      src={character.image}
                      alt={character.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      priority={false} // Configuración recomendada para Carga Diferida (Lazy Loading) bajo demanda
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full backdrop-blur-md bg-black/60 flex items-center gap-1.5 border border-white/10">
                      <span
                        className={`w-2 h-2 rounded-full ${isAlive
                            ? "bg-portal-green glow-green"
                            : isDead
                              ? "bg-red-500"
                              : "bg-gray-400"
                          }`}
                      ></span>
                      <span className="text-gray-200 capitalize">{character.status}</span>
                    </div>
                  </div>

                  {/* Character Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-lg font-black tracking-tight text-white group-hover:text-portal-green transition-colors line-clamp-1 capitalize">
                        {character.name}
                      </h3>
                      <p className="text-xs text-portal-purple font-semibold tracking-wider">
                        {character.species}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/5 space-y-1 text-left">
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">
                        Ubicación Actual
                      </span>
                      <span className="text-xs text-gray-300 font-semibold line-clamp-1">
                        {character.location.name}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
