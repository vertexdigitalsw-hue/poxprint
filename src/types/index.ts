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
    gradient: "from-primary via-secondary to-primary-dark",
    badge: "bg-primary/20 text-primary border-primary/30",
    border: "border-primary/20",
    glow: "rgba(240,10,120,0.15)",
  },
  lanhouse: {
    gradient: "from-secondary via-yellow-400 to-secondary",
    badge: "bg-secondary/20 text-secondary border-secondary/30",
    border: "border-secondary/20",
    glow: "rgba(250,204,21,0.15)",
  },
  prateleira: {
    gradient: "from-accent via-cyan-400 to-accent",
    badge: "bg-accent/20 text-accent border-accent/30",
    border: "border-accent/20",
    glow: "rgba(0,160,220,0.15)",
  },
};
