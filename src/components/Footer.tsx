import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock } from "lucide-react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.462-5.767 5.488 0 1.04.311 2.013.849 2.844l-.572 2.084 2.179-.562a5.704 5.704 0 0 0 3.311 1.098c3.18 0 5.767-2.462 5.767-5.488 0-3.025-2.588-5.464-5.767-5.464m0 10.099a4.642 4.642 0 0 1-2.366-.658l-.17-.101-1.293.334.346-1.26-.111-.175a4.356 4.356 0 0 1-.713-2.373c0-2.517 2.158-4.564 4.807-4.564 2.65 0 4.807 2.047 4.807 4.564 0 2.518-2.157 4.567-4.807 4.567m3.214-3.416c-.176-.088-.883-.435-1.02-.485-.137-.05-.237-.074-.337.074-.1.148-.387.485-.475.585-.088.1-.176.111-.323.037-.147-.074-.636-.234-1.213-.75-.377-.336-.631-.752-.705-.861-.074-.11-.008-.17.055-.225.057-.05.127-.136.19-.204.064-.068.085-.111.128-.185.043-.074.021-.14-.011-.196-.032-.057-.302-.728-.415-1-.112-.27-.224-.224-.319-.224-.082-.003-.176-.003-.271-.003-.1 0-.261.037-.398.185-.137.148-.522.511-.522 1.246 0 .735.535 1.446.61 1.545.074.099 1.055 1.61 2.555 2.259.357.155.636.247.854.316.359.115.685.099.943.06.287-.044.896-.366 1.022-.72.126-.354.126-.657.088-.72-.038-.062-.139-.1-.315-.188" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-dark-card border-t border-white/[0.06]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg/30 to-dark-bg/50 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-2 ring-primary/30">
                <Image src="/logo.jpg" alt="Logo Pox Print Gráfica Rápida" fill className="object-cover" />
              </div>
              <div>
                <span className="font-display text-lg font-bold text-white tracking-tight">
                  POX<span className="text-primary">.</span>PRINT
                </span>
                <span className="block text-[10px] text-gray tracking-widest uppercase">
                  Gráfica Rápida
                </span>
              </div>
            </div>
            <p className="text-sm text-gray leading-relaxed mb-4">
              A maior gráfica e papelaria de Poxoréu. Mais de 170 produtos e serviços gráficos, personalizados e de papelaria. Qualidade profissional com atendimento personalizado.
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/5566997111882"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-success/20 text-success flex items-center justify-center hover:bg-success/30 transition-all duration-300 hover:scale-110"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/poxprintgraficarapida"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-pink-400 flex items-center justify-center hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Navegação</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Início", href: "/" },
                { label: "Catálogo", href: "/catalogo" },
                { label: "Carrinho", href: "/carrinho" },
                { label: "Localização", href: "/localizacao" },
                { label: "Contato", href: "/#contato" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Categorias</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Gráfica", href: "/catalogo?categoria=grafica" },
                { label: "Lan House", href: "/catalogo?categoria=lanhouse" },
                { label: "Todos os Produtos", href: "/catalogo" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contato</h4>
            <ul className="space-y-3 text-sm text-gray">
              <li>
                <a href="https://wa.me/5566997111882" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-success transition-colors">
                  <WhatsAppIcon className="h-4 w-4" />
                  (66) 99711-1882
                </a>
              </li>
              <li>
                <a href="https://instagram.com/poxprintgraficarapida" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-pink-400 transition-colors">
                  <InstagramIcon className="h-4 w-4" />
                  @poxprintgraficarapida
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  Rua Paraíba, s/n, Centro<br />
                  Poxoréu - MT
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  Seg a Sex: 07:30-11:00 | 13:00-17:00<br />
                  Sáb: 07:30-11:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider-gradient my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray">
          <p>&copy; {new Date().getFullYear()} Pox Print Gráfica Rápida. Todos os direitos reservados.</p>
          <p className="text-center md:text-right leading-relaxed">
            Pedidos organizados no site e finalizados via WhatsApp.<br />
            Nenhum pagamento é processado online.
          </p>
        </div>
      </div>
    </footer>
  );
}
