import React from 'react';
import { motion } from 'framer-motion';

export function WhatsAppButton() {
  const link = "https://wa.me/5561991521044?text=Ol%C3%A1%2C%20preciso%20de%20um%20advogado%21";

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 w-16 h-16 bg-transparent rounded-full flex items-center justify-center p-0 z-50 shadow-[0_0_30px_rgba(37,211,102,0.5),0_0_60px_rgba(37,211,102,0.25)] group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(37, 211, 102, 0.6), 0 0 80px rgba(37, 211, 102, 0.35)" }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow animado (Radial Gradient) */}
      <motion.div
        className="absolute -inset-6 bg-[radial-gradient(circle,rgba(37,211,102,0.45)_0%,rgba(37,211,102,0)_70%)] rounded-full -z-10 pointer-events-none"
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Pulso contínuo (Anel) */}
      <motion.div
        className="absolute inset-0 border-2 border-[#25D366] rounded-full -z-20 pointer-events-none"
        animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Icone WhatsApp oficial do anexo */}
      <img
        src="assets/whatsapp_icon.png"
        alt="WhatsApp"
        className="w-full h-full object-contain z-10"
      />

      {/* Tooltip */}
      <span className="absolute right-20 top-1/2 -translate-y-1/2 bg-[#1c1d1f] text-white border border-white/10 px-4 py-2 rounded-md text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-lg">
        Fale conosco
      </span>
    </motion.a>
  );
}
