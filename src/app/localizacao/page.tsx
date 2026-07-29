"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ChevronLeft, Navigation, Clock, MessageCircle } from "lucide-react";

const SCHEDULE = [
  { dia: "Segunda a Sexta", horas: "07:30 - 11:00 | 13:00 - 17:00" },
  { dia: "Sábado", horas: "07:30 - 11:00" },
  { dia: "Domingo", horas: "Fechado" },
];

export default function LocalizacaoPage() {
  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            href="/#contato"
            className="inline-flex items-center gap-1.5 text-sm text-gray hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar para Contato
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="badge-orange mb-4">
            <MapPin className="h-3 w-3" />
            Localização
          </span>
          <h1 className="section-title">Onde estamos</h1>
          <p className="section-subtitle mx-auto mt-4">
            Venha nos visitar ou veja como chegar
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-4"
          >
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-primary/15 text-primary-light">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] text-gray uppercase tracking-wider">Endereço</p>
                  <p className="text-sm font-medium text-white">Rua Paraíba, s/n, Centro</p>
                  <p className="text-xs text-gray">Poxoréu - MT</p>
                </div>
              </div>

              <div className="divider-gradient my-4" />

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-white/[0.06] text-gray">
                  <Clock className="h-5 w-5" />
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
              </div>

              <div className="divider-gradient my-4" />

              <a
                href="https://wa.me/5566997111882"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-success/10 border border-success/20 hover:bg-success/15 transition-all"
              >
                <MessageCircle className="h-5 w-5 text-success" />
                <div>
                  <p className="text-[10px] text-gray uppercase tracking-wider">WhatsApp</p>
                  <p className="text-sm font-semibold text-success">(66) 99711-1882</p>
                </div>
              </a>
            </div>

            <a
              href="https://www.google.com/maps/place/Pox+Print+Gr%C3%A1fica+R%C3%A1pida/@-15.837203,-54.3889498,153m"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 px-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-all shadow-lg shadow-primary/25"
            >
              <Navigation className="h-5 w-5" />
              Abrir rota no Google Maps
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 glass rounded-2xl overflow-hidden h-[500px] lg:h-[600px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1500!2d-54.3889498!3d-15.837203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x937741f28863efd9%3A0xbcae98f3957f666e!2sPox%20Print%20Gr%C3%A1fica%20R%C3%A1pida!5e0!3m2!1spt-BR!2sbr!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "500px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa - Pox Print Gráfica Rápida"
              className="rounded-2xl"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
