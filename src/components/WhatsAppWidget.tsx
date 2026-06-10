"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Instagram, Mail } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        widgetRef.current &&
        !widgetRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-[99999] flex flex-col items-end">
      {/* Mini support card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.92 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 w-[calc(100vw-2rem)] max-w-[350px] sm:w-[350px] overflow-hidden rounded-3xl border border-white/20 bg-black/85 backdrop-blur-2xl shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.15)] relative"
          >
            {/* Header with glossy green gradient */}
            <div className="bg-gradient-to-r from-[#25D366]/90 to-[#128C7E]/90 p-5 text-white border-b border-white/10 relative overflow-hidden">
              {/* Glossy Sheen Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" />
              
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <h4 className="font-extrabold text-lg leading-tight tracking-tight flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                    OrginX Support
                  </h4>
                  <p className="mt-1 text-xs text-white/85">Choose an agent to start chatting on WhatsApp.</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1.5 text-white hover:bg-white/15 transition-colors border border-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] cursor-pointer"
                  aria-label="Close support card"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>

            {/* Translucent Glass Body */}
            <div className="flex flex-col gap-3.5 p-5 bg-zinc-950/45 relative z-10">
              
              {/* Agent 1 */}
              <a
                href="https://api.whatsapp.com/send?phone=918300178022&text=Hi%20OrginX%2C%20I%27d%20like%20to%20discuss%20a%20project!"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3.5 text-foreground transition-all duration-300 hover:translate-y-[-2px] hover:border-[#25D366]/40 hover:bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:shadow-[0_8px_20px_rgba(37,211,102,0.15)] relative overflow-hidden group"
              >
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent font-black text-white border border-white/15 shadow-md">
                  DP
                  <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-zinc-900 bg-[#4caf50]" />
                </div>
                <div className="flex-grow">
                  <div className="font-extrabold text-sm leading-none text-white tracking-tight group-hover:text-[#25D366] transition-colors">Dharani Prasanna</div>
                  <div className="mt-1 text-xs text-zinc-400">Technical & Operations Lead</div>
                </div>
                <MessageSquare className="h-4 w-4 text-[#25D366] group-hover:scale-110 transition-transform" />
              </a>

              {/* Agent 2 */}
              <a
                href="https://api.whatsapp.com/send?phone=918668008781&text=Hi%20OrginX%2C%20I%27d%20like%20to%20discuss%20a%20project!"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3.5 text-foreground transition-all duration-300 hover:translate-y-[-2px] hover:border-[#25D366]/40 hover:bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:shadow-[0_8px_20px_rgba(37,211,102,0.15)] relative overflow-hidden group"
              >
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500 font-black text-white border border-white/15 shadow-md">
                  OX
                  <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-zinc-900 bg-[#4caf50]" />
                </div>
                <div className="flex-grow">
                  <div className="font-extrabold text-sm leading-none text-white tracking-tight group-hover:text-[#25D366] transition-colors">Sales & Business</div>
                  <div className="mt-1 text-xs text-zinc-400">Strategy & Partnerships</div>
                </div>
                <MessageSquare className="h-4 w-4 text-[#25D366] group-hover:scale-110 transition-transform" />
              </a>

              {/* Instagram Link */}
              <a
                href="https://instagram.com/orginx.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3.5 text-foreground transition-all duration-300 hover:translate-y-[-2px] hover:border-accent-purple/40 hover:bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:shadow-[0_8px_20px_rgba(0,192,143,0.15)] relative overflow-hidden group"
              >
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-purple font-black text-white border border-white/15 shadow-md">
                  IG
                </div>
                <div className="flex-grow">
                  <div className="font-extrabold text-sm leading-none text-white tracking-tight group-hover:text-accent-purple transition-colors">Instagram</div>
                  <div className="mt-1 text-xs text-zinc-400">@orginx.in</div>
                </div>
                <Instagram className="h-4 w-4 text-accent-purple group-hover:scale-110 transition-transform" />
              </a>

              {/* Email Link */}
              <a
                href="mailto:orginxindia@gmail.com"
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3.5 text-foreground transition-all duration-300 hover:translate-y-[-2px] hover:border-accent/40 hover:bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:shadow-[0_8px_20px_rgba(0,128,255,0.15)] relative overflow-hidden group"
              >
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent font-black text-white border border-white/15 shadow-md">
                  EM
                </div>
                <div className="flex-grow">
                  <div className="font-extrabold text-sm leading-none text-white tracking-tight group-hover:text-accent transition-colors">Email Support</div>
                  <div className="mt-1 text-xs text-zinc-400">orginxindia@gmail.com</div>
                </div>
                <Mail className="h-4 w-4 text-accent group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button - Glossy Capsule */}
      <div className="rounded-full p-[1.5px] bg-gradient-to-tr from-[#25D366] via-white/60 to-[#128C7E]/40 shadow-[0_8px_32px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_44px_rgba(37,211,102,0.7)] transition-all duration-300 hover:scale-[1.04] active:scale-[0.96]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-13 w-13 items-center justify-center rounded-full bg-black/90 backdrop-blur-md text-white border border-white/15 shadow-[inset_0_2px_4px_rgba(255,255,255,0.35)] transition-transform focus:outline-none cursor-pointer relative overflow-hidden group"
          aria-label="Chat with support on WhatsApp"
        >
          {/* Inner ambient glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#25D366]/25 to-transparent opacity-60 group-hover:opacity-95 transition-opacity" />
          
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-[#25D366] relative z-10 transition-transform group-hover:scale-110">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}
