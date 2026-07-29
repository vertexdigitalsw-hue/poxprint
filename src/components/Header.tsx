"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Menu, X, Clock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getStoreStatus, isHoliday } from "@/lib/holidays";

interface HeaderProps {
  onCartOpen: () => void;
}

const NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Catalogo", href: "/catalogo" },
  { label: "Contato", href: "/#contato" },
];

const SCHEDULE = [
  { dia: "Seg a Sex", horas: "07:30 - 11:00 | 13:00 - 17:00" },
  { dia: "Sábado", horas: "07:30 - 11:00" },
  { dia: "Domingo", horas: "Fechado" },
];

export default function Header({ onCartOpen }: HeaderProps) {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [statusOpen, setStatusOpen] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);

  const status = getStoreStatus();
  const holiday = isHoliday();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          setScrolled(y > 20);
          if (y > 200) {
            setHidden(y > lastY && y - lastY > 10);
          } else {
            setHidden(false);
          }
          setLastY(y);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (statusRef.current && !statusRef.current.contains(e.target as Node)) {
        setStatusOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-dark-bg/85 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl shadow-black/20"
            : "bg-gradient-to-b from-black/30 to-transparent"
        }`}
      >
        <div className={`max-w-7xl mx-auto px-4 flex items-center justify-between transition-all duration-500 ${
          scrolled ? "h-14" : "h-16"
        }`}>
          <Link href="/" className="flex items-center gap-3 group">
            <div className={`relative rounded-xl overflow-hidden ring-2 ring-primary/30 group-hover:ring-primary/60 transition-all duration-300 ${
              scrolled ? "w-8 h-8" : "w-9 h-9"
            }`}>
              <Image src="/logo.jpg" alt="Pox Print" fill className="object-cover" />
            </div>
            <div className="hidden sm:block">
              <span className={`font-display font-bold text-white tracking-tight transition-all duration-500 ${
                scrolled ? "text-base" : "text-lg"
              }`}>
                POX PRINT
              </span>
              <span className={`block text-[10px] text-gray tracking-widest uppercase transition-all duration-500 ${
                scrolled ? "opacity-60" : "opacity-100"
              }`}>
                Grafica Rapida
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-gray hover:text-white hover:bg-white/[0.06] rounded-lg transition-all duration-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative" ref={statusRef}>
              <motion.button
                onClick={() => setStatusOpen(!statusOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                  status.isOpen
                    ? "bg-success/10 text-success hover:bg-success/15"
                    : "bg-red-500/10 text-red-400 hover:bg-red-500/15"
                }`}
                aria-label="Status da loja"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${status.isOpen ? "bg-success" : "bg-red-400"} animate-pulse`} />
                {holiday && holiday.type !== "facultative" ? "Feriado" : status.statusText}
              </motion.button>

              <AnimatePresence>
                {statusOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-72 glass rounded-2xl p-5 shadow-2xl z-50"
                  >
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/[0.06]">
                      <div className={`p-2 rounded-xl ${status.isOpen ? "bg-success/20 text-success" : holiday && holiday.type !== "facultative" ? "bg-red-500/20 text-red-400" : "bg-red-500/20 text-red-400"}`}>
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${status.isOpen ? "text-success" : "text-red-400"}`}>
                          {holiday && holiday.type !== "facultative" ? "Fechado (Feriado)" : status.isOpen ? "Aberto agora" : "Fechado agora"}
                        </p>
                        {holiday && holiday.type !== "facultative" && (
                          <p className="text-xs text-gray mt-0.5">{holiday.name}</p>
                        )}
                        {!status.isOpen && !holiday && (
                          <p className="text-xs text-gray mt-0.5">{status.nextOpen}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      {SCHEDULE.map((s) => (
                        <div key={s.dia} className="flex items-center justify-between text-xs">
                          <span className="text-gray">{s.dia}</span>
                          <span className={`font-medium ${s.horas === "Fechado" ? "text-red-400" : "text-white"}`}>
                            {s.horas}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              onClick={onCartOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2.5 text-gray hover:text-white hover:bg-white/[0.06] rounded-xl transition-all duration-300"
              aria-label="Abrir carrinho"
            >
              <ShoppingCart className="h-5 w-5" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg shadow-primary/30"
                  >
                    {totalItems > 99 ? "99+" : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2.5 text-gray hover:text-white hover:bg-white/[0.06] rounded-xl transition-all duration-300"
              aria-label="Menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/[0.06] bg-dark-bg/98 backdrop-blur-2xl overflow-hidden"
            >
              <div className="px-4 py-3 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-gray hover:text-white hover:bg-white/[0.06] rounded-xl transition-all"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="divider-gradient my-2" />
                <a
                  href="https://wa.me/5566997111882"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-success hover:bg-white/[0.06] rounded-xl transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.462-5.767 5.488 0 1.04.311 2.013.849 2.844l-.572 2.084 2.179-.562a5.704 5.704 0 0 0 3.311 1.098c3.18 0 5.767-2.462 5.767-5.488 0-3.025-2.588-5.464-5.767-5.464m0 10.099a4.642 4.642 0 0 1-2.366-.658l-.17-.101-1.293.334.346-1.26-.111-.175a4.356 4.356 0 0 1-.713-2.373c0-2.517 2.158-4.564 4.807-4.564 2.65 0 4.807 2.047 4.807 4.564 0 2.518-2.157 4.567-4.807 4.567m3.214-3.416c-.176-.088-.883-.435-1.02-.485-.137-.05-.237-.074-.337.074-.1.148-.387.485-.475.585-.088.1-.176.111-.323.037-.147-.074-.636-.234-1.213-.75-.377-.336-.631-.752-.705-.861-.074-.11-.008-.17.055-.225.057-.05.127-.136.19-.204.064-.068.085-.111.128-.185.043-.074.021-.14-.011-.196-.032-.057-.302-.728-.415-1-.112-.27-.224-.224-.319-.224-.082-.003-.176-.003-.271-.003-.1 0-.261.037-.398.185-.137.148-.522.511-.522 1.246 0 .735.535 1.446.61 1.545.074.099 1.055 1.61 2.555 2.259.357.155.636.247.854.316.359.115.685.099.943.06.287-.044.896-.366 1.022-.72.126-.354.126-.657.088-.72-.038-.062-.139-.1-.315-.188" />
                  </svg>
                  Fale conosco no WhatsApp
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <motion.a
          href="https://wa.me/5566997111882"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 300, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-success flex items-center justify-center shadow-2xl shadow-success/40 hover:shadow-success/60 transition-shadow duration-300"
          aria-label="WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.031 6.172c-3.181 0-5.767 2.462-5.767 5.488 0 1.04.311 2.013.849 2.844l-.572 2.084 2.179-.562a5.704 5.704 0 0 0 3.311 1.098c3.18 0 5.767-2.462 5.767-5.488 0-3.025-2.588-5.464-5.767-5.464m0 10.099a4.642 4.642 0 0 1-2.366-.658l-.17-.101-1.293.334.346-1.26-.111-.175a4.356 4.356 0 0 1-.713-2.373c0-2.517 2.158-4.564 4.807-4.564 2.65 0 4.807 2.047 4.807 4.564 0 2.518-2.157 4.567-4.807 4.567m3.214-3.416c-.176-.088-.883-.435-1.02-.485-.137-.05-.237-.074-.337.074-.1.148-.387.485-.475.585-.088.1-.176.111-.323.037-.147-.074-.636-.234-1.213-.75-.377-.336-.631-.752-.705-.861-.074-.11-.008-.17.055-.225.057-.05.127-.136.19-.204.064-.068.085-.111.128-.185.043-.074.021-.14-.011-.196-.032-.057-.302-.728-.415-1-.112-.27-.224-.224-.319-.224-.082-.003-.176-.003-.271-.003-.1 0-.261.037-.398.185-.137.148-.522.511-.522 1.246 0 .735.535 1.446.61 1.545.074.099 1.055 1.61 2.555 2.259.357.155.636.247.854.316.359.115.685.099.943.06.287-.044.896-.366 1.022-.72.126-.354.126-.657.088-.72-.038-.062-.139-.1-.315-.188" />
          </svg>
        </motion.a>
        <motion.a
          href="https://instagram.com/poxprintgraficarapida"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 300, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center shadow-2xl shadow-pink-500/30 hover:shadow-pink-500/50 transition-shadow duration-300"
          aria-label="Instagram"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
          </svg>
        </motion.a>
      </div>
    </>
  );
}
