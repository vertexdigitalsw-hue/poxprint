"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingCart, Plus, Minus, Eye, ArrowRight } from "lucide-react";
import type { FlatProduct, MainCategory } from "@/types";
import { mainCategoryColors } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: FlatProduct;
  index: number;
}

const categoriaLabel: Record<string, string> = {
  grafica: "Gráfica",
  lanhouse: "Lan House",
  prateleira: "Prateleira",
};

export default function ProductCard({ product, index }: ProductCardProps) {
  const { addItem, getItemQuantity } = useCart();
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState(false);
  const inCart = getItemQuantity(product.id);
  const colors = mainCategoryColors[product.categoria as MainCategory];

  const handleAdd = () => {
    addItem(product, qty);
    setToast(true);
    setQty(1);
    setTimeout(() => setToast(false), 2500);
  };

  const initials = product.nome
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 20) * 0.03, duration: 0.4 }}
      className="group relative"
    >
      <div className="relative glass rounded-2xl overflow-hidden h-full flex flex-col card-hover-lift">
        <div className="relative h-36 sm:h-44 bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg flex items-center justify-center overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-[0.08]`} />
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-3xl font-bold text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
            {initials}
          </div>

          {/* Hover overlay with actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-dark-bg/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
            <div className="flex gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
              <Link
                href={`/produto/${product.id}`}
                className="flex items-center gap-1.5 text-xs font-medium text-white bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 shadow-lg hover:bg-white/20 transition-all"
              >
                <Eye className="h-3.5 w-3.5" />
                Detalhes
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.preventDefault(); handleAdd(); }}
                className="flex items-center gap-1.5 text-xs font-medium text-white bg-gradient-to-r from-primary to-secondary px-4 py-2 rounded-xl shadow-lg shadow-primary/30 hover:shadow-glow-lg transition-all"
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                Comprar
              </motion.button>
            </div>
          </div>

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[70%]">
            <span className={`badge ${colors.badge} text-[10px]`}>
              {categoriaLabel[product.categoria] || product.categoria}
            </span>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-sm font-semibold text-white leading-snug mb-1.5 line-clamp-2 min-h-[2.5rem]">
            <Link href={`/produto/${product.id}`} className="hover:text-primary transition-colors focus-ring rounded">
              {product.nome}
            </Link>
          </h3>

          <p className="text-xs text-gray mb-2 truncate">
            Cód: {product.codigo}
          </p>

          <p className="text-xl md:text-2xl font-bold gradient-text-accent mb-4 mt-auto">
            {formatPrice(product.preco)}
          </p>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-dark-bg border border-white/10 rounded-xl">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-2 py-1.5 text-gray hover:text-white hover:bg-white/5 rounded-l-xl transition-colors focus-ring"
                aria-label="Diminuir quantidade"
              >
                <Minus className="h-3.5 w-3.5" />
              </motion.button>
              <span className="px-2.5 py-1.5 text-sm font-medium tabular-nums text-white min-w-[2rem] text-center">
                {qty}
              </span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setQty(qty + 1)}
                className="px-2 py-1.5 text-gray hover:text-white hover:bg-white/5 rounded-r-xl transition-colors focus-ring"
                aria-label="Aumentar quantidade"
              >
                <Plus className="h-3.5 w-3.5" />
              </motion.button>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAdd}
              className="flex-1 bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold py-2 px-3 rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-1.5 focus-ring"
              aria-label={`Adicionar ${product.nome} ao carrinho`}
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              Adicionar
            </motion.button>
          </div>
        </div>

        {inCart > 0 && (
          <div className="absolute top-3 right-3">
            <span className="text-[10px] font-medium text-primary bg-primary/15 backdrop-blur-md px-2 py-0.5 rounded-full border border-primary/20 shadow-sm">
              No carrinho: {inCart}x
            </span>
          </div>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] toast-enter pointer-events-none">
          <div className="bg-gradient-to-r from-primary to-secondary backdrop-blur-md text-white text-sm font-medium px-5 py-3 rounded-xl shadow-2xl shadow-primary/30 flex items-center gap-2 whitespace-nowrap border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            {product.nome} adicionado ao carrinho
          </div>
        </div>
      )}
    </motion.div>
  );
}
