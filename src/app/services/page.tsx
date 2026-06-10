"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  Code2,
  Globe,
  Smartphone,
  Cloud,
  RefreshCw,
  Settings,
  Palette,
  Search,
  Megaphone,
  Check,
  ArrowRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CanvasGlow from "@/components/CanvasGlow";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function ServicesPage() {
  const serviceDetails = [
    {
      id: "software-development",
      number: "01",
      icon: Code2,
      category: "Engineering",
      title: "Custom Software Development",
      description: "Enterprise-grade system architectures, custom algorithms, backend infrastructures, and third-party API integrations engineered to support critical company workflows.",
      features: [
        "Robust architecture built in Go, Python, Java, or Node.js",
        "Highly-scalable SQL and NoSQL database layouts",
        "Cloud-agnostic backend systems (AWS, Azure, GCP)"
      ],
      image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "website-development",
      number: "02",
      icon: Globe,
      category: "Front-End",
      title: "Website Development",
      description: "Stunning, fast, and SEO-optimized custom web projects. From creative portfolios to enterprise portals, we bring ideas to life with state-of-the-art interactive frontends.",
      features: [
        "Fully-responsive frameworks built with React, Next.js, and HTML5",
        "Buttery-smooth page navigation, interactive motion effects, and micro-interactions",
        "Optimized for Google Core Web Vitals (maximum load speed)"
      ],
      image: "https://images.unsplash.com/photo-1547658719-da2b81169d42?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "mobile-applications",
      number: "03",
      icon: Smartphone,
      category: "Platforms",
      title: "Mobile App Development",
      description: "Native iOS, Android, and cross-platform apps that capture users' attention. We focus on creating smooth animations, lightning-fast interactions, and offline capabilities.",
      features: [
        "Native Swift/Kotlin and Flutter cross-platform architecture",
        "App Store and Play Store submission & updates",
        "Real-time sync, offline data management, push notification funnels"
      ],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "saas-solutions",
      number: "04",
      icon: Cloud,
      category: "Cloud Infrastructure",
      title: "SaaS Solutions",
      description: "Multi-tenant software architectures built to support millions of subscribers. We handle subscription structures, usage metering, authentication modules, and user dashboards.",
      features: [
        "Stripe subscription billing models and user access tiers",
        "Secure multi-tenant data partitioning and client configuration portals",
        "Robust administrative control centers and analytics graphs"
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "digital-transformation",
      number: "05",
      icon: RefreshCw,
      category: "Strategy",
      title: "Digital Transformation",
      description: "Modernize your outdated tools, migrate your systems to the cloud, and build modern APIs. We outline digital strategies that help your business pivot quickly to match market demands.",
      features: [
        "Legacy system updates and database migration",
        "Centralized enterprise architecture setup",
        "Employee digital onboarding and software integrations"
      ],
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "business-automation",
      number: "06",
      icon: Settings,
      category: "AI & Efficiency",
      title: "Business Automation",
      description: "Say goodbye to repetitive manual tasks. We integrate AI capabilities, build custom robotic workflows, and hook up automated scripts that cut down human error and operational hours.",
      features: [
        "Custom LLM integration and intelligent chatbot assistants",
        "Robotic Process Automation (RPA) and document processing",
        "Data scraper bots and automatic report dashboards"
      ],
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "branding-design",
      number: "07",
      icon: Palette,
      category: "Identity",
      title: "Branding & Creative Design",
      description: "A beautiful brand is key to user retention. We construct full brand guideline books, design high-fidelity vector assets, and sketch modern UI/UX wireframes with a clean theme.",
      features: [
        "Logo kits, brand guideline packages, typography systems",
        "Clean Figma user interface design and clickable prototypes",
        "Interactive guidelines, corporate stationery, and advertising assets"
      ],
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "seo-optimization",
      number: "08",
      icon: Search,
      category: "Discovery",
      title: "SEO Optimization",
      description: "Rank at the top of Google search pages. We optimize technical parameters, manage core directory structures, and plan content setups to build consistent, free organic site traffic.",
      features: [
        "Audit reports, keyword research lists, competitive analysis maps",
        "On-page technical optimization (sitemaps, schema tags)",
        "Strategic backlink growth and indexing bug resolution"
      ],
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "digital-marketing",
      number: "09",
      icon: Megaphone,
      category: "Growth",
      title: "Digital Marketing",
      description: "Promote your brand online and scale your revenue. We structure pay-per-click setups (PPC), coordinate high-conversion visual ad copy, and launch organic campaigns across social platforms.",
      features: [
        "PPC setup on Google Ads and Meta Platforms manager",
        "Strategic content schedules for LinkedIn and Twitter channels",
        "Detailed analytics track logs, pixel setups, and conversion dashboards"
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    }
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // Initialize Lenis smooth scroll
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenis.on("scroll", () => {
        ScrollTrigger.update();
      });

      const updateTicker = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(updateTicker);
      gsap.ticker.lagSmoothing(0);

      // Hero animations
      const heroTl = gsap.timeline();
      heroTl.fromTo(
        "#services-hero-label",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
      heroTl.fromTo(
        "#services-hero-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
      heroTl.fromTo(
        "#services-hero-description",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );

      // Parallax images scrolling
      const imageContainers = gsap.utils.toArray(".parallax-img-container") as Element[];
      imageContainers.forEach((container: Element) => {
        const img = container.querySelector(".parallax-img");
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -12 },
            {
              yPercent: 12,
              ease: "none",
              scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      });

      // Service Content entrance staggered (configured safer start for mobile layouts)
      const serviceCards = gsap.utils.toArray(".service-card") as Element[];
      serviceCards.forEach((card: Element) => {
        const animElements = card.querySelectorAll(".service-animate");
        gsap.fromTo(
          animElements,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%", // Triggers earlier to guarantee elements render on mobile viewports
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Background drifting glow orbs parallax
      const glowOrbs = gsap.utils.toArray(".bg-glow-orb") as Element[];
      glowOrbs.forEach((orb: Element) => {
        gsap.fromTo(
          orb,
          { yPercent: -20 },
          {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
              trigger: orb.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // Refresh ScrollTrigger offsets after mounts and after typical image loads
      const refreshTimers = [200, 800, 1500, 3000].map((delay) =>
        setTimeout(() => ScrollTrigger.refresh(), delay)
      );

      const handleWindowLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", handleWindowLoad);

      return () => {
        lenis.destroy();
        gsap.ticker.remove(updateTicker);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        refreshTimers.forEach((timer) => clearTimeout(timer));
        window.removeEventListener("load", handleWindowLoad);
      };
    }
  }, []);

  return (
    <>
      <Navbar />
      <CanvasGlow />

      {/* Header */}
      <section className="dot-grid pt-28 pb-12 sm:pt-36 sm:pb-20 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] rounded-full bg-accent/10 blur-[100px] sm:blur-[150px] pointer-events-none -z-10" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span
            id="services-hero-label"
            className="label opacity-0"
          >
            What We Deliver
          </span>
          <h1
            id="services-hero-title"
            className="mt-6 text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl text-foreground opacity-0 animate-fade-up leading-tight"
          >
            Our Services & <br />
            <span className="bg-gradient-to-r from-accent to-accent-purple bg-clip-text text-transparent">
              Capabilities
            </span>
          </h1>
          <p
            id="services-hero-description"
            className="mt-4 sm:mt-6 max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-text-secondary leading-relaxed opacity-0"
          >
            We design, build, scale and market premium digital products. Explore our detailed capabilities below and choose the perfect fit for your goals.
          </p>
        </div>
      </section>

      {/* Detailed Services list */}
      <div className="flex flex-col border-t border-border-custom bg-background relative z-10">
        {serviceDetails.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <section
              id={service.id}
              key={service.id}
              className="border-b border-border-custom py-14 sm:py-20 lg:py-28 relative overflow-hidden"
            >
              {/* Parallax ambient background glow orb */}
              <div className={`bg-glow-orb absolute w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full blur-[80px] sm:blur-[120px] opacity-15 pointer-events-none -z-10 ${
                isEven ? "-left-40 bg-accent" : "-right-40 bg-accent-purple"
              }`} style={{ top: "10%" }} />

              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                  
                  {/* Text Column (Glassmorphic Card) */}
                  <div
                    className={`service-card rounded-3xl border border-border-custom/85 bg-card-bg-custom/15 p-5 sm:p-8 lg:p-12 backdrop-blur-md shadow-xs hover:shadow-lg hover:shadow-accent/3 hover:border-accent/20 hover:bg-card-bg-custom/25 transition-all duration-500 group/card relative overflow-hidden ${
                      !isEven ? "lg:order-2" : ""
                    }`}
                  >
                    {/* Inner glowing card accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
                    
                    <div className="flex items-center gap-3 service-animate opacity-0">
                      <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent group-hover/card:bg-accent group-hover/card:text-black transition-all duration-500 shadow-[0_0_10px_rgba(0,128,255,0.1)] group-hover/card:shadow-[0_0_20px_rgba(0,128,255,0.4)] group-hover/card:rotate-6">
                        <service.icon className="h-4.5 w-4.5 sm:h-5 sm:w-5 transition-transform" />
                      </div>
                      <span className="text-[10px] sm:text-xs uppercase tracking-widest font-extrabold text-accent">
                        {service.number}. {service.category}
                      </span>
                    </div>

                    <h2 className="mt-4 sm:mt-6 text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-foreground service-animate opacity-0 group-hover/card:text-white transition-colors duration-300">
                      {service.title}
                    </h2>

                    <p className="mt-3 sm:mt-4 text-text-secondary text-xs sm:text-sm lg:text-base leading-relaxed service-animate opacity-0">
                      {service.description}
                    </p>

                    <div className="mt-6 sm:mt-8 flex flex-col gap-2.5 sm:gap-3.5 service-animate opacity-0">
                      {service.features.map((feat) => (
                        <div
                          key={feat}
                          className="flex items-start gap-3 p-2.5 sm:p-3 rounded-xl border border-border-custom/40 bg-black/10 hover:bg-black/35 hover:border-accent/15 transition-all duration-300 group/item"
                        >
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent group-hover/item:bg-accent group-hover/item:text-black transition-colors duration-300 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] mt-0.5">
                            <Check className="h-3 w-3" />
                          </div>
                          <span className="text-xs sm:text-sm text-text-secondary group-hover/item:text-foreground transition-colors duration-300 leading-tight">{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 sm:mt-10 service-animate opacity-0">
                      <div className="rounded-full p-[1px] bg-[#cccccc] shadow-[0_6px_15px_rgba(0,0,0,0.15)] w-max hover:scale-[1.03] transition-transform duration-300">
                        <div className="rounded-full bg-black/95 p-1 flex items-center border border-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]">
                          <Link
                            href="/#contact"
                            className="bg-accent hover:bg-accent/80 text-white rounded-full px-5 py-2 sm:py-2.5 text-[10px] sm:text-xs font-black transition-all whitespace-nowrap shadow-[0_0_12px_rgba(0,128,255,0.45),inset_0_1px_2px_rgba(255,255,255,0.4)] flex items-center gap-1.5 border border-white/10"
                          >
                            Book a Consultation <ArrowRight className="h-3.5 w-3.5 group-hover/card:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Image Column (Parallax wrapper) */}
                  <div
                    className={`parallax-img-container relative aspect-[1.8/1] sm:aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-border-custom shadow-[0_20px_45px_rgba(0,0,0,0.45)] group/img ${
                      !isEven ? "lg:order-1" : ""
                    }`}
                  >
                    {/* Dark overlay that fades on hover */}
                    <div className="absolute inset-0 bg-black/30 group-hover/img:bg-black/10 transition-colors duration-500 z-10 pointer-events-none" />
                    
                    {/* Glassmorphic border ring effect */}
                    <div className="absolute inset-0 border border-white/10 rounded-2xl sm:rounded-3xl pointer-events-none z-20 shadow-[inset_0_2px_10px_rgba(255,255,255,0.1)]" />
                    
                    <img
                      src={service.image}
                      alt={service.title}
                      className="parallax-img absolute inset-0 h-[130%] w-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                      style={{ top: "-15%" }}
                      loading="lazy"
                    />
                  </div>
                  
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <Footer />
      <WhatsAppWidget />
    </>
  );
}
