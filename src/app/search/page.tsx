"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Character, CharacterListResponse } from "@/types/character";
import { IoSearchOutline, IoRefreshOutline, IoArrowBack, IoArrowForward, IoGitBranchOutline } from "react-icons/io5";
import { GiPortal } from "react-icons/gi";

export default function SearchPage() {
  // Estados para filtros
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");

  // Estados para paginación e información de API
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Efecto para cargar los datos en tiempo real cuando cambian los filtros
  useEffect(() => {
    const fetchFilteredCharacters = async () => {
      setLoading(true);
      setError(null);

      // Construcción dinámica de la URL con filtros
      let url = `https://rickandmortyapi.com/api/character/?page=${page}`;
      if (name) url += `&name=${encodeURIComponent(name.trim())}`;
      if (status) url += `&status=${status}`;
      if (gender) url += `&gender=${gender}`;
      if (type) url += `&type=${encodeURIComponent(type.trim())}`;

      try {
        const res = await fetch(url);
        
        if (res.status === 404) {
          // La API de Rick and Morty responde con 404 si no encuentra coincidencias
          setCharacters([]);
          setTotalPages(1);
          setTotalCount(0);
          setLoading(false);
          return;
        }

        if (!res.ok) {
          throw new Error("No se pudo obtener datos del Portal Interdimensional.");
        }

        const data: CharacterListResponse = await res.json();
        setCharacters(data.results);
        setTotalPages(data.info.pages);
        setTotalCount(data.info.count);
      } catch (err: any) {
        setError(err.message || "Error al realizar la conexión cuántica.");
      } finally {
        setLoading(false);
      }
    };

    // Debounce simple para evitar saturar la API con cada pulsación de tecla
    const delayDebounceFn = setTimeout(() => {
      fetchFilteredCharacters();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [name, status, gender, type, page]);

  // Resetea todos los filtros
  const handleResetFilters = () => {
    setName("");
    setStatus("");
    setGender("");
    setType("");
    setPage(1);
  };

  // Manejar el cambio de filtros para reiniciar a la página 1
  const handleFilterChange = (filterType: string, value: string) => {
    setPage(1);
    if (filterType === "name") setName(value);
    if (filterType === "status") setStatus(value);
    if (filterType === "gender") setGender(value);
    if (filterType === "type") setType(value);
  };

  return (
    <div className="space-y-10">
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <IoSearchOutline className="text-portal-green text-glow-green" />
            <span>Buscador Interdimensional (CSR)</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Filtra personajes en tiempo real utilizando renderizado en el lado del cliente (Client-Side Rendering).
          </p>
        </div>

        <button
          onClick={handleResetFilters}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl transition focus:outline-none"
        >
          <IoRefreshOutline size={16} />
          <span>Restablecer Filtros</span>
        </button>
      </div>

      {/* Filter panel (Futuristic Form) */}
      <section className="glass-panel rounded-2xl p-6 border border-white/5 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Name Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-portal-purple tracking-widest uppercase block">
              Nombre de Personaje
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => handleFilterChange("name", e.target.value)}
              placeholder="Ej: Rick, Morty, Summer..."
              className="w-full bg-[#0a0f1d]/60 border border-white/10 focus:border-portal-green/50 text-white text-sm px-4 py-2.5 rounded-xl outline-none transition-all placeholder:text-gray-600"
            />
          </div>

          {/* Status Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-portal-purple tracking-widest uppercase block">
              Estado de Vida
            </label>
            <select
              value={status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="w-full bg-[#0a0f1d]/60 border border-white/10 focus:border-portal-green/50 text-white text-sm px-4 py-2.5 rounded-xl outline-none transition-all"
            >
              <option value="">Todos los Estados</option>
              <option value="alive">Vivo (Alive)</option>
              <option value="dead">Muerto (Dead)</option>
              <option value="unknown">Desconocido (unknown)</option>
            </select>
          </div>

          {/* Gender Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-portal-purple tracking-widest uppercase block">
              Género
            </label>
            <select
              value={gender}
              onChange={(e) => handleFilterChange("gender", e.target.value)}
              className="w-full bg-[#0a0f1d]/60 border border-white/10 focus:border-portal-green/50 text-white text-sm px-4 py-2.5 rounded-xl outline-none transition-all"
            >
              <option value="">Todos los Géneros</option>
              <option value="male">Masculino (Male)</option>
              <option value="female">Femenino (Female)</option>
              <option value="genderless">Sin Género (Genderless)</option>
              <option value="unknown">Desconocido (unknown)</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-portal-purple tracking-widest uppercase block">
              Especie / Tipo
            </label>
            <input
              type="text"
              value={type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              placeholder="Ej: Clone, Parasite, Alien..."
              className="w-full bg-[#0a0f1d]/60 border border-white/10 focus:border-portal-green/50 text-white text-sm px-4 py-2.5 rounded-xl outline-none transition-all placeholder:text-gray-600"
            />
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="space-y-6">
        {loading ? (
          /* Grid loader */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="glass-panel h-80 rounded-2xl p-4 space-y-4">
                <div className="aspect-square bg-white/5 rounded-xl"></div>
                <div className="h-6 bg-white/10 rounded-md w-3/4"></div>
                <div className="h-4 bg-white/5 rounded-md w-1/2"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="glass-panel border border-red-500/10 p-8 text-center rounded-2xl text-red-400">
            {error}
          </div>
        ) : characters.length === 0 ? (
          /* Empty state */
          <div className="glass-panel p-16 text-center rounded-3xl border border-white/5 space-y-4 flex flex-col items-center">
            <GiPortal size={80} className="text-portal-purple animate-spin [animation-duration:30s] opacity-40" />
            <h3 className="text-xl font-bold text-white mt-4">
              ¡Ningún personaje en estas coordenadas!
            </h3>
            <p className="text-sm text-gray-500 max-w-sm">
              Ningún habitante del multiverso coincide con los filtros establecidos. Prueba a reajustar los filtros de arriba.
            </p>
          </div>
        ) : (
          /* Results grid */
          <>
            <div className="flex justify-between items-center text-xs text-gray-500 font-bold px-2 uppercase tracking-wider">
              <span>Coincidencias: {totalCount} personajes</span>
              <span>Página {page} de {totalPages}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {characters.map((character) => {
                const isAlive = character.status === "Alive";
                const isDead = character.status === "Dead";

                return (
                  <Link
                    key={character.id}
                    href={`/character/${character.id}`}
                    className="group transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-portal-green/50 rounded-2xl"
                  >
                    <div className="glass-panel h-full rounded-2xl overflow-hidden border border-white/5 group-hover:border-white/20 transition-all flex flex-col">
                      <div className="relative aspect-square w-full bg-slate-900 overflow-hidden">
                        <Image
                          src={character.image}
                          alt={character.name}
                          width={280}
                          height={280}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          priority={false} // Lazy loading por defecto en Next.js Image
                        />
                        <div className="absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full backdrop-blur-md bg-black/60 flex items-center gap-1.5 border border-white/10">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isAlive
                                ? "bg-portal-green glow-green"
                                : isDead
                                ? "bg-red-500"
                                : "bg-gray-400"
                            }`}
                          ></span>
                          <span className="text-gray-200 capitalize">{character.status}</span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <h3 className="text-lg font-black tracking-tight text-white group-hover:text-portal-green transition-colors line-clamp-1 capitalize font-sans">
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 pt-8">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="flex items-center gap-1 px-4 py-2.5 text-sm font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl transition disabled:opacity-30 disabled:pointer-events-none focus:outline-none"
                >
                  <IoArrowBack />
                  <span>Anterior</span>
                </button>
                
                <span className="text-sm font-bold text-gray-300 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                  {page} / {totalPages}
                </span>

                <button
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                  className="flex items-center gap-1 px-4 py-2.5 text-sm font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl transition disabled:opacity-30 disabled:pointer-events-none focus:outline-none"
                >
                  <span>Siguiente</span>
                  <IoArrowForward />
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
