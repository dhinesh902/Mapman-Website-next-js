"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, Headset, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function FloatingContact() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="fixed bottom-6 right-6 z-[100] flex flex-col items-end"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-2 mb-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-3 rounded-[2rem] shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden"
          >
            {/* WhatsApp Action */}
            <a
              href="https://wa.me/919342376760"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-transparent hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-slate-800 dark:text-white px-4 py-3 rounded-2xl transition-all duration-300 group"
            >
              <div className="bg-emerald-100 dark:bg-emerald-500/20 p-3 rounded-full text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="flex flex-col pr-6">
                <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">WhatsApp Us</span>
                <span className="text-xs text-slate-500 font-medium">Quick response</span>
              </div>
            </a>

            {/* Call Action */}
            <a
              href="tel:+919342376760"
              className="flex items-center gap-4 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-500/10 text-slate-800 dark:text-white px-4 py-3 rounded-2xl transition-all duration-300 group"
            >
              <div className="bg-blue-100 dark:bg-blue-500/20 p-3 rounded-full text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-sm">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex flex-col pr-6">
                <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Call Support</span>
                <span className="text-xs text-slate-500 font-medium">Mon-Fri, 9am-6pm</span>
              </div>
            </a>
            
            <div className="h-px w-full bg-slate-100 dark:bg-slate-800 my-1" />
            
            {/* Contact Page Link */}
            <Link 
              href="/contact"
              className="flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-slate-500 hover:text-primary transition-colors group"
            >
              Visit Contact Page 
              <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Contact Button */}
      <Link href="/contact" className="relative z-10 block">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-primary text-white p-4 rounded-full shadow-[0_8px_30px_rgba(var(--primary),0.4)] flex items-center justify-center cursor-pointer group"
        >
          {/* Animated ping effect */}
          <span className="absolute inset-0 rounded-full bg-white/30 opacity-20 animate-ping group-hover:opacity-40 transition-opacity" />
          
          <Headset className="w-7 h-7 relative z-10 group-hover:scale-110 transition-transform duration-300" />
        </motion.div>
      </Link>
    </div>
  );
}
