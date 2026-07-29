"use client";

import { motion } from "framer-motion";
import { Shield, Target, Heart, Award } from "lucide-react";

const VALUES = [
  {
    icon: Target,
    title: "Nossa Missão",
    desc: "Oferecer soluções gráficas e de papelaria com qualidade profissional, agilidade e atendimento personalizado para empresas e clientes de Poxoréu e região.",
  },
  {
    icon: Shield,
    title: "Produção Própria",
    desc: "Todo o processo é realizado internamente, do design à impressão e acabamento. Isso garante controle total de qualidade e prazos mais rápidos.",
  },
  {
    icon: Award,
    title: "Qualidade Garantida",
    desc: "Utilizamos materiais de primeira linha e equipamentos modernos para entregar um acabamento profissional em cada pedido, seja ele pequeno ou grande.",
  },
  {
    icon: Heart,
    title: "Compromisso com o Cliente",
    desc: "Mais de 10 anos atendendo Poxoréu com dedicação e respeito. Cada cliente é tratado de forma única, do orçamento à entrega final.",
  },
];

export default function AboutCompany() {
  return (
    <section className="relative py-24 bg-dark-card/30">
      <div className="absolute inset-0 bg-dots" />
      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge-success mb-4">Sobre Nós</span>
          <h2 className="section-title">Conheça a Pox Print</h2>
          <p className="section-subtitle mx-auto mt-4">
            Há mais de 10 anos sendo referência em gráfica rápida em Poxoréu
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {VALUES.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6 glass-hover"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-primary-light" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1.5">{item.title}</h3>
                    <p className="text-sm text-gray leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
