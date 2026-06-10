"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMobileOpen]);

  // Intersection Observer for scroll tracking
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sections = ["about", "services", "process", "reviews", "contact"];
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-30% 0px -60% 0px", // triggers when section covers middle of screen
      threshold: 0,
    });

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Handle scroll to top to clear active section
    const handleTopScroll = () => {
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", handleTopScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleTopScroll);
    };
  }, [pathname]);



  const navLinks = [
    { name: "About", href: "/#about", sectionId: "about" },
    { name: "Services", href: "/services", sectionId: "" },
    { name: "Process", href: "/#process", sectionId: "process" },
    { name: "Reviews", href: "/#reviews", sectionId: "reviews" },
    { name: "Contact", href: "/#contact", sectionId: "contact" },
  ];

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-[9000] transition-all duration-300 px-4 sm:px-6 lg:px-8 ${
          isScrolled
            ? "py-3"
            : "py-5"
        }`}
      >
        <div className={`mx-auto max-w-5xl rounded-full p-[1px] bg-[#cccccc] shadow-[0_20px_45px_rgba(0,0,0,0.35)] transition-all duration-300 ${
          isScrolled ? "scale-[0.98]" : ""
        }`}>
          <div className="rounded-full bg-black/90 text-white backdrop-blur-xl border border-white/20 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)] px-6 py-2 flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Logo iconSizeClassName="h-10 sm:h-11" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive =
                  (link.href === "/services" && pathname === "/services") ||
                  (pathname === "/" && link.sectionId && activeSection === link.sectionId);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-xs font-semibold uppercase tracking-wider transition-colors hover:text-white/100 ${
                      isActive ? "text-white" : "text-white/60"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="navActiveLine"
                        className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-4">

              {/* CTA Button */}
              <Link
                href="/#contact"
                className="hidden sm:inline-flex items-center justify-center rounded-full bg-accent hover:bg-accent/80 text-white px-5 py-2 text-xs font-black transition-all shadow-[0_0_15px_rgba(0,128,255,0.45),inset_0_1px_2px_rgba(255,255,255,0.4)] border border-white/10"
              >
                Get Started
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[8900] bg-zinc-950 pt-28 px-6 flex flex-col gap-6 md:hidden text-white"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive =
                  (link.href === "/services" && pathname === "/services") ||
                  (pathname === "/" && activeSection === link.sectionId);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`text-2xl font-bold transition-colors ${
                      isActive ? "text-accent" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                href="/#contact"
                onClick={() => setIsMobileOpen(false)}
                className="mt-6 flex h-12 items-center justify-center rounded-xl bg-accent text-sm font-semibold text-white"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
