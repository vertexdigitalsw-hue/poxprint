import type { MainCategory, SubcategoryMap, FlatProduct, CheckoutInfo } from "@/types";
import raw from "../../produtos.json";

const data = raw as unknown as SubcategoryMap;

export function getAllProducts(): FlatProduct[] {
  const result: FlatProduct[] = [];
  const cats = ["grafica", "lanhouse", "prateleira"] as MainCategory[];
  let id = 1;
  for (const cat of cats) {
    const subcats = data[cat];
    for (const [subcat, products] of Object.entries(subcats)) {
      for (const p of products) {
        result.push({ ...p, id: `p${String(id++).padStart(4, "0")}`, categoria: cat, subcategoria: subcat });
      }
    }
  }
  return result;
}

export function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function openWhatsApp(text: string) {
  const encoded = encodeURIComponent(text);
  window.open(`https://wa.me/5566997111882?text=${encoded}`, "_blank");
}

export function buildFullWhatsAppMessage(
  items: { nome: string; quantity: number; preco: number; subtotal: number; arte: string }[],
  total: number,
  checkoutInfo: CheckoutInfo,
  observacoes: string
): string {
  let msg = "*Olá! Gostaria de realizar este pedido.*\n\n";

  msg += `*Nome:* ${checkoutInfo.nome}\n`;
  msg += `*Telefone:* ${checkoutInfo.telefone}\n`;
  msg += `*Tipo de entrega:* ${checkoutInfo.tipoEntrega === "retirada" ? "Retirada no local" : "Entrega"}\n`;

  if (checkoutInfo.tipoEntrega === "entrega") {
    msg += `*Endereço:* Rua ${checkoutInfo.rua}, ${checkoutInfo.numero}`;
    if (checkoutInfo.bairro) msg += `, ${checkoutInfo.bairro}`;
    if (checkoutInfo.complemento) msg += ` - ${checkoutInfo.complemento}`;
    msg += "\n";
  }

  msg += `*Forma de pagamento:* ${checkoutInfo.formaPagamento || "A combinar"}\n`;

  if (checkoutInfo.formaPagamento === "Dinheiro" && checkoutInfo.troco) {
    msg += `*Precisa de troco para:* R$ ${checkoutInfo.troco}\n`;
  }

  msg += "\n*Itens:*\n\n";
  items.forEach((item) => {
    msg += `• ${item.quantity}x ${item.nome}\n`;
    msg += `  Valor: ${formatPrice(item.preco)} (subtotal: ${formatPrice(item.subtotal)})`;
    if (item.arte) {
      msg += `\n  Arte: ${item.arte}`;
    }
    msg += "\n\n";
  });

  msg += `*Total:* ${formatPrice(total)}\n`;

  if (observacoes.trim()) {
    msg += `\n*Observações:* ${observacoes.trim()}\n`;
  }

  return msg;
}

export function getProductById(id: string): FlatProduct | undefined {
  return getAllProducts().find((p) => p.id === id);
}
