"use client";

import { useState, Suspense } from "react";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <title>Pox Print Gráfica Rápida - A maior gráfica e papelaria de Poxoréu</title>
        <meta name="description" content="Mais de 170 produtos e serviços gráficos, personalizados e de papelaria em Poxoréu - MT. Qualidade profissional com entrega rápida. Peça pelo WhatsApp." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo.jpg" />
        <meta name="theme-color" content="#050816" />
        <meta name="author" content="Pox Print Gráfica Rápida" />
        <meta name="geo.region" content="BR-MT" />
        <meta name="geo.placename" content="Poxoréu" />

        <meta property="og:title" content="Pox Print Gráfica Rápida - A maior gráfica e papelaria de Poxoréu" />
        <meta property="og:description" content="Mais de 170 produtos e serviços gráficos, personalizados e de papelaria em Poxoréu - MT. Qualidade profissional com entrega rápida." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:site_name" content="Pox Print" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pox Print Gráfica Rápida - Poxoréu" />
        <meta name="twitter:description" content="Mais de 170 produtos e serviços gráficos em Poxoréu - MT. Qualidade profissional com entrega rápida." />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Pox Print Gráfica Rápida",
              "image": "/logo.jpg",
              "description": "Gráfica rápida e papelaria em Poxoréu - MT. Mais de 170 produtos e serviços gráficos, personalizados e de papelaria.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rua Paraíba, s/n",
                "addressLocality": "Poxoréu",
                "addressRegion": "MT",
                "addressCountry": "BR"
              },
              "telephone": "+5566997111882",
              "url": "https://poxprint.com.br",
              "priceRange": "R$",
              "openingHoursSpecification": [
                { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "07:30", "closes": "17:00" },
                { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "07:30", "closes": "11:00" }
              ]
            })
          }}
        />
      </head>
      <body>
        <CartProvider>
          <Header onCartOpen={() => setCartOpen(true)} />
          <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
          <Suspense fallback={null}>{children}</Suspense>
        </CartProvider>
      </body>
    </html>
  );
}
