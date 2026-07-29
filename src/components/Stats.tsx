"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "170+", label: "Produtos Disponíveis", suffix: "+" },
  { value: "Entrega", label: "Rápida e Eficiente", suffix: "" },
  { value: "100%", label: "Qualidade Garantida", suffix: "%" },
  { value: "1000+", label: "Clientes Satisfeitos", suffix: "+" },
];

export default function Stats() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-card to-dark-bg" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge-success mb-4">{'Números'}</span>
          <h2 className="section-title">{'Pox Print em números'}</h2>
          <p className="section-subtitle mx-auto mt-4">
            {'Há anos servindo Poxoréu e região com excelência'}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-8 glass rounded-2xl group hover:border-primary/20 transition-all duration-500"
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <p className="text-gray text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
