import Link from "next/link";
import { FileQuestion, Home, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center pt-16">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 flex items-center justify-center mx-auto mb-6 shadow-2xl">
          <FileQuestion className="h-12 w-12 text-primary-light" />
        </div>
        <h1 className="text-6xl md:text-7xl font-bold gradient-text mb-4">404</h1>
        <p className="text-xl font-bold text-white mb-2">Página não encontrada</p>
        <p className="text-gray text-sm mb-8 max-w-sm mx-auto leading-relaxed">
          A página que você procura não existe, foi removida ou está temporariamente indisponível.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary-lg">
            <Home className="h-5 w-5" />
            Voltar ao Início
          </Link>
          <Link href="/catalogo" className="btn-secondary">
            <ShoppingBag className="h-5 w-5" />
            Ver Catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}
