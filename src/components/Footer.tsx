import Link from "next/link";
import { Twitter, Linkedin, Github, MessageSquare, Instagram, Mail } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-border-custom bg-card-bg-custom/50 py-16 mt-auto relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 group">
              <Logo iconSizeClassName="h-11" isInverted={false} />
            </Link>
            <p className="mt-4 text-sm text-text-secondary leading-relaxed max-w-xs">
              OrginX is an ultra-premium technology hub. We build, scale, and transform ambitious digital products.
            </p>
            <div className="mt-6 flex flex-col gap-3 text-text-secondary">
              <div className="flex gap-4">
                <a href="#" className="hover:text-accent transition-colors" aria-label="Twitter"><Twitter className="h-5 w-5" /></a>
                <a href="#" className="hover:text-accent transition-colors" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
                <a href="https://instagram.com/orginx.in" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
                <a href="#" className="hover:text-accent transition-colors" aria-label="GitHub"><Github className="h-5 w-5" /></a>
              </div>
              <a href="mailto:orginxindia@gmail.com" className="flex items-center gap-2 text-xs hover:text-accent transition-colors mt-2">
                <Mail className="h-4 w-4 text-accent" /> orginxindia@gmail.com
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm tracking-wider uppercase text-foreground">Company</h4>
            <div className="mt-4 flex flex-col gap-3">
              <Link href="/#about" className="text-sm text-text-secondary hover:text-foreground transition-colors">About Us</Link>
              <Link href="/#process" className="text-sm text-text-secondary hover:text-foreground transition-colors">Our Process</Link>
              <Link href="/#contact" className="text-sm text-text-secondary hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm tracking-wider uppercase text-foreground">Services</h4>
            <div className="mt-4 flex flex-col gap-3">
              <Link href="/services#software-development" className="text-sm text-text-secondary hover:text-foreground transition-colors">Web Development</Link>
              <Link href="/services#mobile-applications" className="text-sm text-text-secondary hover:text-foreground transition-colors">Mobile Apps</Link>
              <Link href="/services#saas-solutions" className="text-sm text-text-secondary hover:text-foreground transition-colors">SaaS Platforms</Link>
              <Link href="/services#digital-marketing" className="text-sm text-text-secondary hover:text-foreground transition-colors">Digital Marketing</Link>
            </div>
          </div>

          {/* Immediate support channels */}
          <div>
            <h4 className="font-semibold text-sm tracking-wider uppercase text-foreground">Immediate Contact</h4>
            <p className="mt-4 text-sm text-text-secondary leading-relaxed">
              Have questions? Chat directly with the founders on WhatsApp.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href="https://wa.me/918300178022"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-text-secondary hover:text-[#25D366] transition-colors"
              >
                <MessageSquare className="h-3.5 w-3.5" /> Operations: +91 8300178022
              </a>
              <a
                href="https://wa.me/918668008781"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-text-secondary hover:text-[#25D366] transition-colors"
              >
                <MessageSquare className="h-3.5 w-3.5" /> Strategy: +91 8668008781
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border-custom mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-text-secondary">
          <p>&copy; {new Date().getFullYear()} OrginX. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
