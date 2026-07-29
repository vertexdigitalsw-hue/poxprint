"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingCart, Plus, Minus, MessageCircle, ChevronLeft, Printer, Package } from "lucide-react";
import { getProductById, getAllProducts, formatPrice } from "@/lib/utils";
import { mainCategoryColors } from "@/types";
import type { MainCategory } from "@/types";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailClient({ id }: { id: string }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const product = getProductById(id);
  const allProducts = useMemo(() => getAllProducts(), []);

  const related = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter((p) => p.subcategoria === product.subcategoria && p.id !== product.id)
      .slice(0, 4);
  }, [product, allProducts]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg pt-16">
        <div className="text-center glass rounded-2xl p-12 max-w-md">
          <Package className="h-12 w-12 text-gray-dark mx-auto mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">Produto não encontrado</h1>
          <p className="text-gray text-sm mb-6">O produto que você procura não está disponível.</p>
          <Link href="/catalogo" className="btn-primary">
            <ChevronLeft className="h-4 w-4" />
            Voltar ao Catálogo
          </Link>
        </div>
      </div>
    );
  }

  const colors = mainCategoryColors[product.categoria as MainCategory];

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const initials = product.nome
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-1.5 text-sm text-gray hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar ao Catálogo
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl overflow-hidden"
          >
            <div className="relative h-64 sm:h-80 md:h-96 bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg flex items-center justify-center">
              <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-[0.06]`} />
              <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-4xl font-bold text-white shadow-2xl`}>
                {initials}
              </div>
              <div className="absolute top-4 left-4">
                <span className={`badge ${colors.badge}`}>
                  <Printer className="h-3 w-3" />
                  {product.categoria === "grafica"
                    ? "Gráfica"
                    : product.categoria === "lanhouse"
                    ? "Lan House"
                    : "Prateleira"}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <span className={`badge ${colors.badge} mb-3 w-fit`}>
              {product.subcategoria}
            </span>

            <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-3">
              {product.nome}
            </h1>

            <p className="text-sm text-gray mb-4">
              Código: <span className="text-gray-light font-mono">{product.codigo}</span>
            </p>

            <div className="divider-gradient my-4" />

            <p className="text-3xl sm:text-4xl font-bold gradient-text mb-6">
              {formatPrice(product.preco)}
            </p>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm text-gray">Quantidade:</span>
              <div className="flex items-center bg-dark-bg border border-white/10 rounded-xl">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-2 text-gray hover:text-white hover:bg-white/5 rounded-l-xl transition-colors"
                  aria-label="Diminuir"
                >
                  <Minus className="h-4 w-4" />
                </motion.button>
                <span className="px-4 py-2 text-base font-medium tabular-nums text-white min-w-[2.5rem] text-center">
                  {qty}
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-2 text-gray hover:text-white hover:bg-white/5 rounded-r-xl transition-colors"
                  aria-label="Aumentar"
                >
                  <Plus className="h-4 w-4" />
                </motion.button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAdd}
                className="flex-1 btn-primary-lg"
              >
                <ShoppingCart className="h-5 w-5" />
                {added ? "Adicionado!" : "Adicionar ao Carrinho"}
              </motion.button>
              <a
                href={`https://wa.me/5566997111882?text=Olá! Tenho interesse em: ${product.nome} (Cód: ${product.codigo}) - ${formatPrice(product.preco)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-base px-6 py-4"
              >
                <MessageCircle className="h-5 w-5" />
                Comprar pelo WhatsApp
              </a>
            </div>

            <div className="mt-6 p-4 glass rounded-xl">
              <p className="text-xs text-gray leading-relaxed">
                {'Os pedidos são processados e finalizados via WhatsApp. Nenhum pagamento é realizado diretamente no site.'}
              </p>
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="divider-gradient mb-8" />
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
              {'Você também pode gostar'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
