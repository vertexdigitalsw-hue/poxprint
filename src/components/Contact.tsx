"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

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

const SCHEDULE = [
  { dia: "Segunda a Sexta", horas: "07:30 - 11:00 | 13:00 - 17:00" },
  { dia: "Sábado", horas: "07:30 - 11:00" },
  { dia: "Domingo", horas: "Fechado" },
];

export default function Contact() {
  return (
    <section id="contato" className="relative py-24 bg-dark-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-card/50 via-dark-bg to-dark-bg" />
      <div className="absolute inset-0 bg-dots" />
      <div className="relative max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge-orange mb-4">Contato</span>
          <h2 className="section-title">Entre em contato</h2>
          <p className="section-subtitle mx-auto mt-4">
            Estamos prontos para atender você
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass rounded-2xl p-6 space-y-3">
            <motion.a
              href="https://wa.me/5566997111882"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 p-4 rounded-xl bg-success/10 border border-success/20 hover:bg-success/15 transition-all duration-300 group"
            >
              <div className="p-3 rounded-xl bg-success/20 text-success group-hover:scale-110 transition-transform duration-300">
                <WhatsAppIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] text-gray uppercase tracking-wider">WhatsApp</p>
                <p className="text-base font-bold text-success">(66) 99711-1882</p>
                <p className="text-xs text-gray">Clique e fale conosco agora</p>
              </div>
            </motion.a>

            <motion.a
              href="https://instagram.com/poxprintgraficarapida"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-orange-400/5 border border-pink-500/15 hover:from-purple-500/10 hover:via-pink-500/10 hover:to-orange-400/10 transition-all duration-300 group"
            >
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-pink-400 group-hover:scale-110 transition-transform duration-300">
                <InstagramIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] text-gray uppercase tracking-wider">Instagram</p>
                <p className="text-base font-bold text-pink-400">@poxprintgraficarapida</p>
                <p className="text-xs text-gray">Acompanhe nas redes</p>
              </div>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-start gap-4 p-4 rounded-xl"
            >
              <div className="p-3 rounded-xl bg-white/[0.06] text-gray">
                <Clock className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-gray uppercase tracking-wider mb-2">Horário de Funcionamento</p>
                <div className="space-y-1.5">
                  {SCHEDULE.map((s) => (
                    <div key={s.dia} className="flex items-center justify-between text-sm">
                      <span className="text-gray text-xs">{s.dia}</span>
                      <span className={`text-xs font-medium ${s.horas === "Fechado" ? "text-red-400" : "text-white"}`}>
                        {s.horas}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="glass rounded-2xl overflow-hidden h-[400px] lg:h-[450px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1500!2d-54.3889498!3d-15.837203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x937741f28863efd9%3A0xbcae98f3957f666e!2sPox%20Print%20Gr%C3%A1fica%20R%C3%A1pida!5e0!3m2!1spt-BR!2sbr!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da Pox Print"
                className="rounded-2xl"
              />
            </div>
            <div className="flex gap-3">
              <a
                href="https://www.google.com/maps/place/Pox+Print+Gr%C3%A1fica+R%C3%A1pida/@-15.837203,-54.3889498,153m"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold text-center hover:shadow-lg hover:shadow-primary/30 transition-all shadow-lg shadow-primary/25"
              >
                Abrir no Google Maps
              </a>
              <a
                href="/localizacao"
                className="flex-1 py-3.5 px-4 rounded-xl glass text-gray text-sm font-semibold text-center hover:text-white transition-all"
              >
                Ver mapa completo
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
