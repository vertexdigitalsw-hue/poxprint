"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { FlatProduct, CartItem, CheckoutInfo } from "@/types";

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  observacoes: string;
  setObservacoes: (val: string) => void;
  addItem: (product: FlatProduct, quantity?: number, arte?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateItemArte: (productId: string, arte: string) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
  checkoutInfo: CheckoutInfo;
  updateCheckoutInfo: (info: Partial<CheckoutInfo>) => void;
  resetCheckout: () => void;
}

const defaultCheckout: CheckoutInfo = {
  nome: "",
  telefone: "",
  tipoEntrega: "retirada",
  rua: "",
  bairro: "",
  numero: "",
  complemento: "",
  formaPagamento: "",
  troco: "",
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("poxprint-cart");
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [observacoes, setObservacoes] = useState("");
  const [checkoutInfo, setCheckoutInfo] = useState<CheckoutInfo>(defaultCheckout);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(loadCart());
    try {
      const saved = localStorage.getItem("poxprint-checkout");
      if (saved) setCheckoutInfo(JSON.parse(saved));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("poxprint-cart", JSON.stringify(items));
  }, [items, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem("poxprint-checkout", JSON.stringify(checkoutInfo));
  }, [checkoutInfo, hydrated]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.preco * i.quantity, 0);

  const addItem = useCallback((product: FlatProduct, quantity = 1, arte = "") => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity, arte }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  }, []);

  const updateItemArte = useCallback((productId: string, arte: string) => {
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, arte } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setObservacoes("");
    setCheckoutInfo(defaultCheckout);
    localStorage.removeItem("poxprint-checkout");
  }, []);

  const getItemQuantity = useCallback((productId: string) => {
    const item = items.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  }, [items]);

  const updateCheckoutInfo = useCallback((info: Partial<CheckoutInfo>) => {
    setCheckoutInfo((prev) => ({ ...prev, ...info }));
  }, []);

  const resetCheckout = useCallback(() => {
    setCheckoutInfo(defaultCheckout);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        observacoes,
        setObservacoes,
        addItem,
        removeItem,
        updateQuantity,
        updateItemArte,
        clearCart,
        getItemQuantity,
        checkoutInfo,
        updateCheckoutInfo,
        resetCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
