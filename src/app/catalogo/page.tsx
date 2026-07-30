"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ChevronDown, Package, X, Home, ChevronRight } from "lucide-react";
import { getAllProducts, formatPrice } from "@/lib/utils";
import type { FlatProduct, MainCategory } from "@/types";
import { mainCategoryColors, subcategoryLabels } from "@/types";
import ProductCard from "@/components/ProductCard";

const allProducts = getAllProducts();

type SortOption = "nome-asc" | "nome-desc" | "preco-asc" | "preco-desc";

const CATEGORY_FILTERS: { key: MainCategory | "todas"; label: string }[] = [
  { key: "todas", label: "Todos" },
  { key: "grafica", label: "Gráfica" },
  { key: "lanhouse", label: "Lan House" },
];

const ITEMS_PER_PAGE = 24;

export default function CatalogoPage() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<MainCategory | "todas">("todas");
  const [activeSubcat, setActiveSubcat] = useState<string>("todas");
  const [sort, setSort] = useState<SortOption>("nome-asc");
  const [page, setPage] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cat = searchParams.get("categoria") as MainCategory | null;
    if (cat && ["grafica", "lanhouse"].includes(cat)) {
      setActiveCat(cat);
    }
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const subcategories = useMemo(() => {
    if (activeCat === "todas") return [];
    const subs = new Set<string>();
    allProducts
      .filter((p) => p.categoria === activeCat)
      .forEach((p) => subs.add(p.subcategoria));
    return Array.from(subs).sort();
  }, [activeCat]);

  useEffect(() => {
    setActiveSubcat("todas");
    setPage(1);
  }, [activeCat]);

  useEffect(() => {
    setPage(1);
  }, [search, sort]);

  const suggestions = useMemo(() => {
    if (!search.trim()) return [];
    const term = search.toLowerCase().trim();
    return allProducts
      .filter(
        (p) =>
          p.nome.toLowerCase().includes(term) ||
          p.codigo.toLowerCase().includes(term)
      )
      .slice(0, 8);
  }, [search]);

  const filtered = useMemo(() => {
    let list = allProducts;

    if (activeCat !== "todas") {
      list = list.filter((p) => p.categoria === activeCat);
    }

    if (activeSubcat !== "todas") {
      list = list.filter((p) => p.subcategoria === activeSubcat);
    }

    if (search.trim()) {
      const term = search.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.nome.toLowerCase().includes(term) ||
          p.codigo.includes(term)
      );
    }

    switch (sort) {
      case "nome-asc":
        list.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
        break;
      case "nome-desc":
        list.sort((a, b) => b.nome.localeCompare(a.nome, "pt-BR"));
        break;
      case "preco-asc":
        list.sort((a, b) => a.preco - b.preco);
        break;
      case "preco-desc":
        list.sort((a, b) => b.preco - a.preco);
        break;
    }

    return list;
  }, [search, activeCat, activeSubcat, sort]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  const catLabel = activeCat === "todas" ? "Catálogo" : CATEGORY_FILTERS.find((f) => f.key === activeCat)?.label || "Catálogo";
  const subLabel = activeSubcat !== "todas" ? (subcategoryLabels[activeSubcat] || activeSubcat) : null;

  return (
    <div className="min-h-screen bg-dark-bg pt-20">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-dark-bg" />
        <div className="relative max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="flex items-center gap-1">
              <Home className="h-3 w-3" />
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-gray-dark" />
            {activeCat === "todas" ? (
              <span>Catálogo</span>
            ) : (
              <>
                <Link href="/catalogo">Catálogo</Link>
                <ChevronRight className="h-3 w-3 text-gray-dark" />
                {subLabel ? (
                  <>
                    <Link href={`/catalogo?categoria=${activeCat}`}>{catLabel}</Link>
                    <ChevronRight className="h-3 w-3 text-gray-dark" />
                    <span>{subLabel}</span>
                  </>
                ) : (
                  <span>{catLabel}</span>
                )}
              </>
            )}
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <span className="badge-primary mb-3">Catálogo</span>
            <h1 className="section-title text-3xl md:text-4xl">
              {subLabel || catLabel}
            </h1>
            <p className="text-gray text-sm mt-2">
              {filtered.length} produto{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
              {search.trim() && ` para "${search}"`}
            </p>
          </motion.div>

          {/* Search + Sort */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 relative" ref={searchRef}>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-dark" />
                <input
                  type="text"
                  placeholder="Buscar produtos... (digite para resultados em tempo real)"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => search.trim() && setShowSuggestions(true)}
                  className="input-field pl-10 pr-10"
                  aria-label="Buscar produtos"
                  aria-autocomplete="list"
                />
                {search && (
                  <button
                    onClick={() => { setSearch(""); setShowSuggestions(false); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-dark hover:text-white transition-colors"
                    aria-label="Limpar busca"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Live search results */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="search-results-dropdown"
                  >
                    <div className="px-4 py-2 text-[10px] text-gray uppercase tracking-wider border-b border-white/[0.06]">
                      Resultados em tempo real
                    </div>
                    {suggestions.map((p) => (
                      <Link
                        key={p.id}
                        href={`/produto/${p.id}`}
                        onClick={() => setShowSuggestions(false)}
                        className="search-result-item"
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${mainCategoryColors[p.categoria].gradient} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                          {p.nome.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate">{p.nome}</p>
                          <p className="text-xs text-gray">{formatPrice(p.preco)}</p>
                        </div>
                        <span className={`badge ${mainCategoryColors[p.categoria].badge} text-[9px]`}>
                          {p.categoria}
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="input-field w-auto min-w-[160px] text-sm cursor-pointer appearance-none pr-10"
                  aria-label="Ordenar por"
                >
                  <option value="nome-asc">A-Z</option>
                  <option value="nome-desc">Z-A</option>
                  <option value="preco-asc">Menor Preço</option>
                  <option value="preco-desc">Maior Preço</option>
                </select>
                <ChevronDown className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-dark pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Category filters */}
          <div className="flex gap-2 flex-wrap mb-6">
            {CATEGORY_FILTERS.map((f) => {
              const isActive = activeCat === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setActiveCat(f.key)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 focus-ring ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/25"
                      : "glass text-gray hover:text-white hover:bg-white/5"
                  }`}
                  aria-pressed={isActive}
                >
                  {f.label}
                </button>
              );
            })}
            {(activeCat !== "todas" || activeSubcat !== "todas" || search.trim()) && (
              <button
                onClick={() => { setActiveCat("todas"); setActiveSubcat("todas"); setSearch(""); setPage(1); }}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray hover:text-white hover:bg-white/5 transition-all border border-dashed border-white/10 focus-ring"
              >
                <X className="h-3.5 w-3.5 inline mr-1" />
                Limpar filtros
              </button>
            )}
          </div>

          {/* Subcategory filters */}
          <AnimatePresence mode="wait">
            {subcategories.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex gap-2 flex-wrap mb-8 overflow-hidden"
              >
                <button
                  onClick={() => setActiveSubcat("todas")}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 focus-ring ${
                    activeSubcat === "todas"
                      ? "bg-white/10 text-white border border-white/20"
                      : "text-gray hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  Todas as subcategorias
                </button>
                {subcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setActiveSubcat(sub)}
                    className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 focus-ring ${
                      activeSubcat === sub
                        ? "bg-white/10 text-white border border-white/20"
                        : "text-gray hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                    aria-pressed={activeSubcat === sub}
                  >
                    {subcategoryLabels[sub] || sub}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products grid */}
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32"
            >
              <div className="w-20 h-20 rounded-2xl bg-dark-card mx-auto mb-6 flex items-center justify-center">
                <Package className="h-10 w-10 text-gray-dark" />
              </div>
              <p className="text-gray text-lg font-medium mb-2">Nenhum produto encontrado</p>
              <p className="text-gray-dark text-sm mb-6 max-w-xs mx-auto">
                {search.trim()
                  ? `Nenhum resultado para "${search}". Tente outro termo.`
                  : "Nenhum produto disponível nesta categoria."}
              </p>
              <button
                onClick={() => { setActiveCat("todas"); setActiveSubcat("todas"); setSearch(""); setPage(1); }}
                className="btn-primary"
              >
                Ver todos os produtos
              </button>
            </motion.div>
          ) : (
            <>
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {paginated.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </motion.div>

              {hasMore && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center mt-12"
                >
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    className="btn-secondary px-10 py-3 focus-ring"
                  >
                    Carregar mais produtos ({filtered.length - paginated.length} restantes)
                  </button>
                </motion.div>
              )}

              {!hasMore && filtered.length > ITEMS_PER_PAGE && (
                <div className="text-center mt-12">
                  <div className="divider-gradient mb-4" />
                  <p className="text-gray-dark text-sm">
                    Mostrando todos os {filtered.length} produtos
                  </p>
                </div>
              )}

              {filtered.length > 0 && (
                <div className="text-center mt-6">
                  <p className="text-gray-dark text-xs">
                    Exibindo {paginated.length} de {filtered.length} produto{filtered.length !== 1 ? "s" : ""}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
