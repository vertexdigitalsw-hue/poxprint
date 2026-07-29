"use client";

import { motion } from "framer-motion";
import { Search, ShoppingCart, MessageCircle, Printer, Truck, CheckCircle } from "lucide-react";

const STEPS = [
  { icon: Search, title: "Escolha os Produtos", desc: "Navegue pelo catálogo e encontre o que precisa" },
  { icon: ShoppingCart, title: "Adicione ao Carrinho", desc: "Selecione a quantidade e adicione os itens" },
  { icon: MessageCircle, title: "Finalize no WhatsApp", desc: "Preencha seus dados e envie o pedido" },
  { icon: Printer, title: "Produção", desc: "Sua arte é preparada com qualidade profissional" },
  { icon: Truck, title: "Entrega ou Retirada", desc: "Receba em casa ou retire na loja" },
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 bg-dark-card/30">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge-secondary mb-4">Como Funciona</span>
          <h2 className="section-title">Simples e Rápido</h2>
          <p className="section-subtitle mx-auto mt-4">
            Do clique até a entrega em poucos passos
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-px h-[calc(100%-6rem)] bg-gradient-to-b from-primary/30 via-secondary/20 to-transparent hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="glass rounded-2xl p-6 text-center h-full glass-hover">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary-light" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-lg shadow-primary/30">
                      {index + 1}
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-xs text-gray leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
