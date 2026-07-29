export type MainCategory = "grafica" | "lanhouse" | "prateleira";

export interface Product {
  codigo: string;
  nome: string;
  preco: number;
}

export type SubcategoryMap = {
  grafica: Record<string, Product[]>;
  lanhouse: Record<string, Product[]>;
  prateleira: Record<string, Product[]>;
};

export interface FlatProduct extends Product {
  id: string;
  categoria: MainCategory;
  subcategoria: string;
}

export interface CartItem {
  product: FlatProduct;
  quantity: number;
  arte: string;
}

export interface CategoryInfo {
  key: MainCategory;
  label: string;
  description: string;
  icon: string;
  count: number;
}

export const mainCategories: CategoryInfo[] = [
  {
    key: "grafica",
    label: "Gráfica",
    description: "Impressos personalizados, papelaria, cartões e muito mais",
    icon: "🖨️",
    count: 0,
  },
  {
    key: "lanhouse",
    label: "Lan House & Serviços",
    description: "Documentos, impressões, plastificação e serviços digitais",
    icon: "💻",
    count: 0,
  },
  {
    key: "prateleira",
    label: "Loja - Prateleira",
    description: "Produtos prontos para pronta-entrega",
    icon: "🏪",
    count: 0,
  },
];

export const subcategoryLabels: Record<string, string> = {
  adesivos: "Adesivos",
  agendas: "Agendas",
  albuns: "Álbuns",
  blocos: "Blocos",
  botons: "Botons",
  cadernetas: "Cadernetas",
  cadernos: "Cadernos",
  calendarios: "Calendários",
  cardapios: "Cardápios",
  cartoes: "Cartões",
  caixinhas: "Caixinhas",
  chaveiros: "Chaveiros",
  comandas: "Comandas",
  convites: "Convites",
  crachas: "Crachás",
  devocionais: "Devocionais",
  diversos: "Diversos",
  livros: "Livros",
  marcadores: "Marcadores",
  panfletos: "Panfletos",
  placas: "Placas",
  planners: "Planners",
  polaroids: "Polaroids",
  rifas: "Rifas",
  tags: "Tags",
  taloes: "Talões",
  documentos: "Documentos",
  impressoes: "Impressões",
  certidoes: "Certidões",
  plastificacao: "Plastificação",
  servicos_digitais: "Serviços Digitais",
  curriculo: "Currículo",
  fotografia: "Fotografia",
  acessorios: "Acessórios",
  blocos_cadernos: "Blocos e Cadernos",
  canetas: "Canetas",
  didaticos: "Didáticos",
  embalagens: "Embalagens",
  kits: "Kits",
  papelaria: "Papelaria",
  placas_quadros: "Placas e Quadros",
  planejamento: "Planejamento",
  presentes: "Presentes",
};

export interface CheckoutInfo {
  nome: string;
  telefone: string;
  tipoEntrega: "retirada" | "entrega";
  rua: string;
  bairro: string;
  numero: string;
  complemento: string;
  formaPagamento: string;
  troco: string;
}

export const paymentMethods = [
  { key: "pix", label: "PIX" },
  { key: "credito", label: "Cartao de Credito" },
  { key: "debito", label: "Cartao de Debito" },
  { key: "dinheiro", label: "Dinheiro" },
];

export const mainCategoryColors: Record<MainCategory, { gradient: string; badge: string; border: string; glow: string }> = {
  grafica: {
    gradient: "from-blue-500 via-cyan-400 to-blue-600",
    badge: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    border: "border-blue-500/20",
    glow: "rgba(37,99,235,0.15)",
  },
  lanhouse: {
    gradient: "from-emerald-500 via-teal-400 to-emerald-600",
    badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    border: "border-emerald-500/20",
    glow: "rgba(16,185,129,0.15)",
  },
  prateleira: {
    gradient: "from-amber-500 via-orange-400 to-amber-600",
    badge: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    border: "border-amber-500/20",
    glow: "rgba(245,158,11,0.15)",
  },
};
