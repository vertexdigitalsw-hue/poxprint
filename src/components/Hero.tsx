"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search, MessageCircle, Printer, Sparkles, FileText, Palette, Layers } from "lucide-react";

function FloatingIcon({ icon, className, delay = 0 }: { icon: React.ReactNode; className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute print-icon ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, -12, 0], rotate: [0, 8, -8, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div className="text-white/10">{icon}</div>
    </motion.div>
  );
}

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center group"
    >
      <div className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">{value}</div>
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
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.08] via-dark-bg to-dark-bg" />

      <div className="absolute top-0 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 -right-40 w-80 h-80 bg-secondary/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[180px]" />

      <div className="absolute inset-0 bg-noise" />

      <FloatingIcon icon={<Printer size={32} />} className="top-20 left-[8%]" delay={0} />
      <FloatingIcon icon={<Sparkles size={24} />} className="top-32 right-[12%]" delay={1.5} />
      <FloatingIcon icon={<Search size={28} />} className="bottom-40 left-[15%]" delay={3} />
      <FloatingIcon icon={<MessageCircle size={26} />} className="bottom-36 right-[18%]" delay={4.5} />
      <FloatingIcon icon={<Printer size={20} />} className="top-1/2 left-[5%]" delay={2} />
      <FloatingIcon icon={<FileText size={22} />} className="top-1/4 left-[60%]" delay={1} />
      <FloatingIcon icon={<Palette size={28} />} className="bottom-1/3 left-[70%]" delay={3.5} />
      <FloatingIcon icon={<Layers size={24} />} className="top-[60%] right-[8%]" delay={2.5} />

      <motion.div
        className="absolute top-1/3 left-1/4 w-2 h-2 bg-primary-light rounded-full"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/4 right-1/3 w-1.5 h-1.5 bg-secondary rounded-full"
        animate={{ scale: [1, 2, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-accent rounded-full"
        animate={{ scale: [1, 1.8, 1], opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="relative max-w-7xl mx-auto px-4 py-28 sm:py-32 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 glass-sm px-4 py-1.5 rounded-full text-xs sm:text-sm mb-6 md:mb-8 hover-glow">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-gray-light">Gráfica Rápida em Poxoréu - MT</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] tracking-tight"
          >
            A maior gráfica e
            <br />
            <span className="gradient-text">papelaria de Poxoréu</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 md:mt-6 text-base md:text-lg text-gray max-w-xl leading-relaxed"
          >
            Mais de 170 produtos e serviços gráficos, personalizados e de papelaria. Qualidade profissional com entrega rápida.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4"
          >
            <Link href="/catalogo" className="btn-primary-lg shadow-2xl shadow-primary/30 hover:shadow-glow-lg">
              <Search className="h-5 w-5" />
              Ver Catálogo
            </Link>
            <Link
              href="https://wa.me/5566997111882"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-base px-8 py-4 shadow-2xl shadow-success/30"
            >
              <MessageCircle className="h-5 w-5" />
              Solicitar Orçamento
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 md:mt-16"
          >
            <div className="divider-gradient mb-6" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                >
                  <AnimatedCounter value={s.value} label={s.label} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-transparent" />
    </section>
  );
}
