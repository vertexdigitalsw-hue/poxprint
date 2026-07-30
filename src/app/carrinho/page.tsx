"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ShoppingBag, MapPin, CreditCard, ChevronLeft,
  User, Phone, Minus, Plus, Trash2, Image as ImageIcon, DollarSign
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice, buildFullWhatsAppMessage, openWhatsApp } from "@/lib/utils";

export default function CarrinhoPage() {
  const { items, totalPrice, observacoes, setObservacoes, updateQuantity, removeItem, updateItemArte, checkoutInfo, updateCheckoutInfo } = useCart();
  const [step, setStep] = useState<"carrinho" | "checkout" | "pagamento">("carrinho");

  const handleFinalize = () => {
    const lines = items.map((i) => ({
      nome: i.product.nome,
      quantity: i.quantity,
      preco: i.product.preco,
      subtotal: i.product.preco * i.quantity,
      arte: i.arte,
    }));
    const msg = buildFullWhatsAppMessage(lines, totalPrice, checkoutInfo, observacoes);
    openWhatsApp(msg);
  };

  const isValidCheckout = checkoutInfo.nome.trim() && checkoutInfo.telefone.trim() && checkoutInfo.formaPagamento;

  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title">Carrinho</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-4 mb-8" />
        </motion.div>

        <div className="flex items-center gap-3 mb-8 p-4 glass rounded-2xl">
          {[
            { key: "carrinho", label: "Itens", icon: ShoppingBag },
            { key: "checkout", label: "Dados", icon: MapPin },
            { key: "pagamento", label: "Pagar", icon: CreditCard },
          ].map((s, i) => {
            const active = step === s.key;
            const done = (step === "checkout" && i < 1) || (step === "pagamento" && i < 2);
            const Icon = s.icon;
            return (
              <div key={s.key} className="flex items-center gap-2 flex-1">
                <div className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    active ? "text-primary" : done ? "text-success" : "text-gray-dark"
                }`}>
                  <div className={`p-1.5 rounded-full ${
                    active ? "bg-primary/20" : done ? "bg-success/20" : "bg-white/[0.04]"
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span>{s.label}</span>
                </div>
                {i < 2 && <div className={`flex-1 h-px ${done ? "bg-success/30" : "bg-white/10"}`} />}
              </div>
            );
          })}
        </div>

        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 glass rounded-2xl">
            <div className="w-16 h-16 rounded-2xl bg-dark-bg mx-auto mb-4 flex items-center justify-center">
              <ShoppingBag className="h-8 w-8 text-gray-dark" />
            </div>
            <p className="text-gray text-lg mb-6">Seu carrinho está vazio</p>
            <Link href="/catalogo" className="btn-primary">Ver Catálogo</Link>
          </motion.div>
        ) : (
          <>
            {step === "carrinho" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="glass rounded-2xl p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0">
                          <ShoppingBag className="h-5 w-5 text-primary" />
                        </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white text-sm truncate">{item.product.nome}</p>
                        <p className="text-xs text-gray">{formatPrice(item.product.preco)} / un</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-dark-bg border border-white/10 rounded-lg">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 text-gray hover:text-white text-sm transition-colors">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2 py-1.5 text-sm font-medium tabular-nums text-white min-w-[1.5rem] text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 text-gray hover:text-white text-sm transition-colors">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-primary w-20 text-right tabular-nums">{formatPrice(item.product.preco * item.quantity)}</p>
                        <button onClick={() => removeItem(item.product.id)} className="p-1.5 text-gray-dark hover:text-red-400 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/[0.06]">
                      <label className="flex items-center gap-1.5 text-[10px] text-gray uppercase tracking-wider mb-1">
                          <ImageIcon className="h-3 w-3" />
                        Sua arte / logotipo
                      </label>
                      <input
                        type="text"
                        value={item.arte}
                        onChange={(e) => updateItemArte(item.product.id, e.target.value)}
                        placeholder="Ex.: Já enviei por e-mail, Preciso de design, Enviarei depois..."
                        className="input-field text-xs py-2"
                      />
                    </div>
                  </div>
                ))}
                <div className="glass rounded-2xl p-4">
                  <label className="block text-xs font-medium text-gray mb-1.5">Observações</label>
                  <textarea value={observacoes} onChange={(e) => setObservacoes(e.target.value)} placeholder="Ex.: embalagem para presente, recado..." rows={2} className="input-field resize-none text-sm" />
                </div>
                <div className="glass rounded-2xl p-4 flex items-center justify-between">
                  <span className="text-gray">Total</span>
                  <span className="text-3xl font-bold gradient-text">{formatPrice(totalPrice)}</span>
                </div>
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep("checkout")}
                    className="w-full btn-primary py-3.5"
                  >
                    Continuar para Dados
                    <ChevronLeft className="h-4 w-4 rotate-180" />
                  </motion.button>
                  <Link href="/catalogo" className="block w-full text-center text-sm text-gray py-2 mt-2 hover:text-white transition-colors">
                    Continuar comprando
                  </Link>
                </div>
              </motion.div>
            )}

            {step === "checkout" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6 space-y-4">
                <div className="relative">
                  <User className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-dark" />
                  <input type="text" value={checkoutInfo.nome} onChange={(e) => updateCheckoutInfo({ nome: e.target.value })} placeholder="Nome completo" className="input-field-icon" />
                </div>
                <div className="relative">
                  <Phone className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-dark" />
                  <input type="tel" value={checkoutInfo.telefone} onChange={(e) => updateCheckoutInfo({ telefone: e.target.value })} placeholder="(66) 99999-9999" className="input-field-icon" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray mb-2">Tipo de entrega</label>
                  <div className="flex gap-2">
                    {[
                      { key: "retirada" as const, label: "Retirar no local" },
                      { key: "entrega" as const, label: "Receber em casa" },
                    ].map((opt) => (
                      <motion.button
                        key={opt.key}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => updateCheckoutInfo({ tipoEntrega: opt.key })}
                        className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                          checkoutInfo.tipoEntrega === opt.key
                            ? "bg-primary text-white shadow-lg shadow-primary/25"
                            : "glass text-gray hover:text-white"
                        }`}
                      >
                        {opt.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
                {checkoutInfo.tipoEntrega === "entrega" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="overflow-hidden space-y-3">
                    <label className="block text-sm font-medium text-gray">Endereço de entrega</label>
                    <input type="text" value={checkoutInfo.rua} onChange={(e) => updateCheckoutInfo({ rua: e.target.value })} placeholder="Rua" className="input-field text-sm" />
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" value={checkoutInfo.bairro} onChange={(e) => updateCheckoutInfo({ bairro: e.target.value })} placeholder="Bairro" className="input-field text-sm" />
                      <input type="text" value={checkoutInfo.numero} onChange={(e) => updateCheckoutInfo({ numero: e.target.value })} placeholder="Número" className="input-field text-sm" />
                    </div>
                    <input type="text" value={checkoutInfo.complemento} onChange={(e) => updateCheckoutInfo({ complemento: e.target.value })} placeholder="Complemento (opcional)" className="input-field text-sm" />
                  </motion.div>
                )}
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep("carrinho")} className="btn-secondary flex-1">Voltar</button>
                  <motion.button
                    whileHover={checkoutInfo.nome.trim() && checkoutInfo.telefone.trim() ? { scale: 1.02 } : {}}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { if (checkoutInfo.nome.trim() && checkoutInfo.telefone.trim()) setStep("pagamento"); }}
                    disabled={!checkoutInfo.nome.trim() || !checkoutInfo.telefone.trim()}
                    className={`flex-1 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                      checkoutInfo.nome.trim() && checkoutInfo.telefone.trim()
                        ? "bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary-dark active:scale-[0.98]"
                        : "bg-dark-bg text-gray-dark cursor-not-allowed"
                    }`}
                  >
                    Continuar
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === "pagamento" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="glass rounded-2xl p-6">
                  <label className="block text-sm font-medium text-gray mb-3">Forma de pagamento *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: "pix", label: "PIX" },
                      { key: "credito", label: "Cartão de Crédito" },
                      { key: "debito", label: "Cartão de Débito" },
                      { key: "dinheiro", label: "Dinheiro" },
                    ].map((method) => (
                      <motion.button
                        key={method.key}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => updateCheckoutInfo({ formaPagamento: method.label })}
                        className={`py-4 px-4 rounded-xl text-sm font-medium transition-all duration-300 text-left ${
                          checkoutInfo.formaPagamento === method.label
                            ? "bg-primary text-white shadow-lg shadow-primary/25 ring-2 ring-primary/50"
                            : "glass text-gray hover:text-white"
                        }`}
                      >
                        <CreditCard className="h-4 w-4 mb-1.5" />
                        {method.label}
                      </motion.button>
                    ))}
                  </div>
                  {checkoutInfo.formaPagamento === "PIX" && (
                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                      <p className="text-yellow-400 text-xs leading-relaxed">
                        A produção do pedido será iniciada somente após a confirmação do pagamento.
                      </p>
                    </motion.div>
                  )}
                  {checkoutInfo.formaPagamento === "Dinheiro" && (
                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-3">
                      <label className="block text-sm font-medium text-gray mb-1.5">
                        <DollarSign className="h-4 w-4 inline mr-1" />
                        Precisa de troco para quanto?
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray text-sm">R$</span>
                        <input type="text" inputMode="decimal" value={checkoutInfo.troco} onChange={(e) => updateCheckoutInfo({ troco: e.target.value })} placeholder="0,00" className="input-field-icon pl-10" />
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="glass rounded-2xl p-6">
                  <h4 className="text-sm font-bold text-white mb-3">Resumo do Pedido</h4>
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between text-sm py-1.5">
                      <span className="text-gray truncate mr-2 text-xs">{item.quantity}x {item.product.nome}</span>
                      <span className="text-white font-medium tabular-nums shrink-0 text-xs">{formatPrice(item.product.preco * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="divider-gradient my-3" />
                  <div className="flex items-center justify-between">
                    <span className="text-gray font-medium">Total</span>
                    <span className="text-2xl font-bold gradient-text">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep("checkout")} className="btn-secondary flex-1">Voltar</button>
                  <motion.button
                    whileHover={isValidCheckout ? { scale: 1.02 } : {}}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleFinalize}
                    disabled={!isValidCheckout}
                    className={`flex-[2] py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      isValidCheckout
                        ? "bg-success text-white shadow-lg shadow-success/30 hover:bg-green-500 active:scale-[0.98]"
                        : "bg-dark-bg text-gray-dark cursor-not-allowed"
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                    </svg>
                    Finalizar Pedido
                  </motion.button>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
