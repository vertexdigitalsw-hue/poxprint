"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { mainCategories, type MainCategory, mainCategoryColors } from "@/types";
import { getAllProducts } from "@/lib/utils";

const allProducts = getAllProducts();
const catsWithCounts = mainCategories.map((cat) => ({
  ...cat,
  count: allProducts.filter((p) => p.categoria === cat.key).length,
}));

export default function Categories() {
  return (
    <section className="relative py-24 bg-dark-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-primary/5 to-dark-bg" />
      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge-primary mb-4">Nossas Categorias</span>
          <h2 className="section-title">{'Tudo que você precisa em um só lugar'}</h2>
          <p className="section-subtitle mx-auto mt-4">
            {'São mais de 170 produtos organizados em categorias para você encontrar o que precisa'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {catsWithCounts.map((cat, index) => {
            const colors = mainCategoryColors[cat.key as MainCategory];
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/catalogo?categoria=${cat.key}`}
                  className="group block card-premium p-8 h-full"
                >
                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-2xl mb-6 shadow-lg`}>
                      {cat.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{cat.label}</h3>
                    <p className="text-gray text-sm mb-6 leading-relaxed">{cat.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`badge ${colors.badge}`}>{cat.count} produtos</span>
                      <span className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 text-sm">
                        {'Explorar \u2192'}
                      </span>
                    </div>
                  </div>
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
