"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Search, MessageCircle, Printer, Sparkles } from "lucide-react";

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center group"
    >
      <div className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text-accent group-hover:scale-105 transition-transform duration-300">{value}</div>
      <div className="text-xs md:text-sm text-gray mt-1">{label}</div>
    </motion.div>
  );
}

export default function Hero() {
  const stats = [
    { value: "170+", label: "Produtos Disponíveis" },
    { value: "Própria", label: "Produção" },
    { value: "Rápido", label: "Atendimento" },
    { value: "Regional", label: "Entrega" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-dark-bg">
      {/* Logo image as large background composition - like the pizza hero concept */}
      <div className="absolute inset-0">
        <Image
          src="/logo.jpg"
          alt=""
          fill
          className="object-cover object-center sm:object-center md:object-[52%_center] lg:object-[55%_center] scale-[1.2] sm:scale-[1.35] md:scale-[1.15] lg:scale-[1.05] opacity-55 sm:opacity-50 md:opacity-45"
          priority
          sizes="100vw"
        />
      </div>

      {/* Additional color splashes to reinforce brand presence */}
      <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-gradient-to-br from-primary/20 via-primary/8 to-transparent rounded-full animate-morph-pink blur-[100px]" />
      <div className="absolute bottom-[-15%] right-[-8%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] bg-gradient-to-tl from-secondary/15 via-secondary/5 to-transparent rounded-full animate-morph-yellow blur-[100px]" />

      {/* Vignette / edge lighting */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 via-transparent to-dark-bg/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

      {/* Main dark overlay - 75% opacity gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-transparent" />

      {/* Subtle noise */}
      <div className="absolute inset-0 bg-noise" />

      {/* Ambient colored glows on edges */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-secondary/8 rounded-full blur-[120px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Floating decorative icons */}
      <motion.div
        className="absolute top-[14%] left-[6%] text-white/6"
        animate={{ y: [0, -15, 0], rotate: [0, 6, -6, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <Printer size={40} />
      </motion.div>
      <motion.div
        className="absolute bottom-[30%] right-[5%] text-white/6"
        animate={{ y: [0, 12, 0], rotate: [0, -5, 5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <Sparkles size={32} />
      </motion.div>

      {/* Floating particles */}
      {[
        { className: "top-[22%] left-[28%] w-1.5 h-1.5 bg-primary", delay: 0 },
        { className: "top-[48%] right-[25%] w-2 h-2 bg-secondary", delay: 1.5 },
        { className: "bottom-[35%] left-[30%] w-1 h-1 bg-accent", delay: 3 },
        { className: "top-[60%] right-[12%] w-1.5 h-1.5 bg-primary/60", delay: 0.8 },
      ].map((p, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${p.className}`}
          animate={{ y: [0, -18, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-28 sm:py-32 w-full">
        <div className="max-w-4xl mx-auto text-center">

          {/* Small brand signature */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-gray/60 font-medium">
              <span className="w-6 h-px bg-primary/40" />
              POX PRINT
              <span className="w-6 h-px bg-primary/40" />
            </span>
          </motion.div>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <span className="inline-flex items-center gap-2 glass-sm px-4 py-1.5 rounded-full text-xs sm:text-sm mb-6 md:mb-8 hover-glow">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-gray-light">Gráfica Rápida em Poxoréu - MT</span>
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] tracking-tight"
          >
            A maior gráfica de
            <br />
            <span className="gradient-text">Poxoréu</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-6 md:mt-8 text-lg md:text-xl text-gray-light/90 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Personalizando ideias com qualidade profissional
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mt-2 text-sm md:text-base text-gray max-w-xl mx-auto leading-relaxed"
          >
            Mais de 170 produtos e serviços gráficos em Poxoréu e região
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 md:gap-5 justify-center"
          >
            <Link href="/catalogo" className="btn-primary-lg shadow-2xl shadow-primary/30 hover:shadow-glow-lg">
              <Search className="h-5 w-5" />
              Ver Catálogo
            </Link>
            <Link
              href="https://wa.me/5566997111882"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-black/50 text-white font-semibold px-8 py-4 rounded-xl border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 active:scale-[0.97] hover:shadow-glow text-base shadow-2xl backdrop-blur-sm"
            >
              <MessageCircle className="h-5 w-5 text-primary" />
              Solicitar Orçamento
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-14 md:mt-20"
          >
            <div className="divider-gradient mb-6" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + i * 0.08 }}
                >
                  <AnimatedCounter value={s.value} label={s.label} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
