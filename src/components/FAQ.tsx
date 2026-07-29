"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "Quanto tempo demora para ficar pronto?",
    a: "O prazo varia conforme o produto e a demanda. Impressões simples podem ficar prontas no mesmo dia. Produtos personalizados como agendas e cadernos levam de 2 a 5 dias úteis. Consulte-nos pelo WhatsApp para prazos exatos.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "Aceitamos PIX, cartão de crédito, débito e dinheiro. O pagamento é combinado diretamente pelo WhatsApp após a finalização do pedido no site. Nenhum pagamento é processado online.",
  },
  {
    q: "Aceita PIX?",
    a: "Sim! PIX é uma das formas de pagamento disponíveis. Para pedidos com PIX, a produção é iniciada após a confirmação do pagamento.",
  },
  {
    q: "Faz entrega em Poxoréu?",
    a: "Sim, entregamos em Poxoréu e região. Consulte-nos para saber o prazo e valor da entrega. Você também pode retirar pessoalmente em nossa loja.",
  },
  {
    q: "Como enviar minha arte ou logotipo?",
    a: "Após finalizar o pedido, você pode enviar sua arte pelo WhatsApp. Aceitamos arquivos em PDF, PNG, JPG, CDR e AI. Se não tiver a arte pronta, temos designers que podem criar para você.",
  },
  {
    q: "Vocês fazem orçamento personalizado?",
    a: "Sim! Solicite um orçamento personalizado pelo WhatsApp. Informe o produto, quantidade e suas especificações que preparamos um valor especial para você.",
  },
];

function AccordionItem({ item, index }: { item: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`glass rounded-xl overflow-hidden transition-all duration-300 ${
        open ? "border-primary/20 shadow-glow" : ""
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 p-4 text-left focus-ring"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-white flex-1">{item.q}</span>
        <ChevronDown
          className={`h-4 w-4 text-gray shrink-0 transition-transform duration-300 ${
            open ? "rotate-180 text-primary-light" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0">
              <div className="divider-gradient mb-3" />
              <p className="text-sm text-gray leading-relaxed">{item.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section className="relative py-24 bg-dark-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-card/20 via-transparent to-dark-card/20" />
      <div className="relative max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="badge-primary mb-4">
            <HelpCircle className="h-3 w-3" />
            FAQ
          </span>
          <h2 className="section-title">Perguntas Frequentes</h2>
          <p className="section-subtitle mx-auto mt-4">
            Tire suas dúvidas rápidas
          </p>
        </motion.div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
