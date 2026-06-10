"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Globe,
  Cloud,
  RefreshCw,
  Settings,
  Palette,
  Search,
  Megaphone,
  TrendingUp,
  Shield,
  Zap,
  Users,
  ChevronDown,
  ChevronRight,
  Play,
  RotateCcw,
  Sparkles,
  Database,
  LayoutGrid,
  LayoutList,
  Moon,
  Sun,
  Mail,
  MapPin,
  Upload,
  Download,
  Building,
  User,
  Briefcase,
  Phone,
  Building2,
  Activity,
  Home as HomeIcon,
  GraduationCap,
  Scale,
  Camera,
  Scissors,
  ChefHat,
  Dumbbell,
  Clock,
  HeartHandshake
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CanvasGlow from "@/components/CanvasGlow";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import QRCode from "qrcode";

type CardCategory =
  | "technology"
  | "corporate"
  | "creative"
  | "healthcare"
  | "real_estate"
  | "education"
  | "finance"
  | "legal"
  | "photography"
  | "beauty"
  | "restaurant"
  | "fitness";

const CATEGORIES_CONFIG = {
  technology: {
    id: "technology",
    name: "Technology",
    accent: "text-cyan-400 border-cyan-400/30 bg-cyan-400/5",
    accentHex: "#00f0ff",
    isDark: true,
    iconName: "code2",
    defaultTitle: "CEO & FOUNDER",
    defaultTagline: "WHERE INNOVATION BEGINS",
    defaultPhone: "+91 98765 43210",
    defaultWebsite: "www.orginx.com"
  },
  corporate: {
    id: "corporate",
    name: "Corporate",
    accent: "text-blue-600 border-blue-600/30 bg-blue-600/5",
    accentHex: "#2563eb",
    isDark: false,
    iconName: "building2",
    defaultTitle: "MANAGING DIRECTOR",
    defaultTagline: "ENTERPRISE SOLUTIONS CO.",
    defaultPhone: "+91 87664 32109",
    defaultWebsite: "www.corporate.com"
  },
  creative: {
    id: "creative",
    name: "Creative",
    accent: "text-yellow-400 border-yellow-400/30 bg-yellow-400/5",
    accentHex: "#fbbf24",
    isDark: true,
    iconName: "palette",
    defaultTitle: "CREATIVE DIRECTOR",
    defaultTagline: "DESIGN STUDIO & ART LAB",
    defaultPhone: "+91 91234 56789",
    defaultWebsite: "www.creativex.com"
  },
  healthcare: {
    id: "healthcare",
    name: "Healthcare",
    accent: "text-emerald-500 border-emerald-500/30 bg-emerald-500/5",
    accentHex: "#10b981",
    isDark: false,
    iconName: "activity",
    defaultTitle: "MBBS, MD (Medicine)",
    defaultTagline: "CARE & CLINICAL EXCELLENCE",
    defaultPhone: "+91 99887 76655",
    defaultWebsite: "www.healthplus.com"
  },
  real_estate: {
    id: "real_estate",
    name: "Real Estate",
    accent: "text-amber-700 border-amber-700/30 bg-amber-700/5",
    accentHex: "#ca8a04",
    isDark: false,
    iconName: "home",
    defaultTitle: "REAL ESTATE CONSULTANT",
    defaultTagline: "SKYLINE PROPERTIES & CO.",
    defaultPhone: "+91 87654 98765",
    defaultWebsite: "www.skylineproperties.com"
  },
  education: {
    id: "education",
    name: "Education",
    accent: "text-teal-600 border-teal-600/30 bg-teal-600/5",
    accentHex: "#0d9488",
    isDark: false,
    iconName: "graduation-cap",
    defaultTitle: "ACADEMIC DIRECTOR",
    defaultTagline: "EDUCARE INSTITUTE OF LEARNING",
    defaultPhone: "+91 90909 90909",
    defaultWebsite: "www.educare.com"
  },
  finance: {
    id: "finance",
    name: "Finance",
    accent: "text-blue-700 border-blue-700/30 bg-blue-700/5",
    accentHex: "#2563eb",
    isDark: false,
    iconName: "trending-up",
    defaultTitle: "FINANCIAL ADVISOR",
    defaultTagline: "FINVEST ADVISORS & PARTNERS",
    defaultPhone: "+91 85274 62318",
    defaultWebsite: "www.finvest.com"
  },
  legal: {
    id: "legal",
    name: "Legal",
    accent: "text-amber-500 border-amber-500/30 bg-amber-500/5",
    accentHex: "#ca8a04",
    isDark: true,
    iconName: "scale",
    defaultTitle: "SENIOR PARTNER",
    defaultTagline: "LEXWELL LEGAL SOLUTIONS",
    defaultPhone: "+91 98100 12345",
    defaultWebsite: "www.lexwell.com"
  },
  photography: {
    id: "photography",
    name: "Photography",
    accent: "text-amber-500 border-amber-500/30 bg-amber-500/5",
    accentHex: "#f59e0b",
    isDark: true,
    iconName: "camera",
    defaultTitle: "PHOTOGRAPHER",
    defaultTagline: "PIXELCRAFT PHOTOGRAPHY",
    defaultPhone: "+91 77768 99900",
    defaultWebsite: "www.pixelcraft.com"
  },
  beauty: {
    id: "beauty",
    name: "Beauty & Salon",
    accent: "text-pink-500 border-pink-500/30 bg-pink-500/5",
    accentHex: "#db2777",
    isDark: false,
    iconName: "scissors",
    defaultTitle: "BEAUTY SPECIALIST",
    defaultTagline: "GLOW & GRACE BEAUTY SALON",
    defaultPhone: "+91 82103 45678",
    defaultWebsite: "www.glowandgrace.com"
  },
  restaurant: {
    id: "restaurant",
    name: "Restaurant",
    accent: "text-orange-500 border-orange-500/30 bg-orange-500/5",
    accentHex: "#ea580c",
    isDark: true,
    iconName: "chef-hat",
    defaultTitle: "HEAD CHEF",
    defaultTagline: "SPICE NATION RESTAURANT",
    defaultPhone: "+91 73555 97979",
    defaultWebsite: "www.spicenation.com"
  },
  fitness: {
    id: "fitness",
    name: "Fitness",
    accent: "text-lime-600 border-lime-600/30 bg-lime-600/5",
    accentHex: "#84cc16",
    isDark: false,
    iconName: "dumbbell",
    defaultTitle: "FITNESS TRAINER",
    defaultTagline: "FITLAB - TRAIN HARD LIVE STRONG",
    defaultPhone: "+91 88822 33445",
    defaultWebsite: "www.fitlab.com"
  }
} as const;

const CATEGORY_STYLES = {
  technology: {
    bg: "bg-gradient-to-br from-[#0b0410] to-[#1c0d2b]",
    textPrimary: "text-white",
    textSecondary: "text-zinc-400",
    accent: "text-cyan-400",
    accentBg: "bg-cyan-500",
    border: "border-cyan-500/20"
  },
  corporate: {
    bg: "bg-white",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-500",
    accent: "text-blue-600",
    accentBg: "bg-blue-600",
    border: "border-slate-200"
  },
  creative: {
    bg: "bg-[#18181b]",
    textPrimary: "text-white",
    textSecondary: "text-zinc-400",
    accent: "text-yellow-400",
    accentBg: "bg-yellow-400",
    border: "border-yellow-500/20"
  },
  healthcare: {
    bg: "bg-slate-50",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-500",
    accent: "text-emerald-500",
    accentBg: "bg-emerald-500",
    border: "border-slate-200"
  },
  real_estate: {
    bg: "bg-[#fafaf9]",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-500",
    accent: "text-amber-700",
    accentBg: "bg-amber-700",
    border: "border-slate-200"
  },
  education: {
    bg: "bg-white",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-500",
    accent: "text-teal-600",
    accentBg: "bg-teal-600",
    border: "border-slate-200"
  },
  finance: {
    bg: "bg-white",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-500",
    accent: "text-blue-700",
    accentBg: "bg-blue-700",
    border: "border-slate-200"
  },
  legal: {
    bg: "bg-zinc-950",
    textPrimary: "text-white",
    textSecondary: "text-zinc-400",
    accent: "text-amber-500",
    accentBg: "bg-amber-500",
    border: "border-zinc-800"
  },
  photography: {
    bg: "bg-zinc-900",
    textPrimary: "text-white",
    textSecondary: "text-zinc-400",
    accent: "text-amber-500",
    accentBg: "bg-amber-500",
    border: "border-zinc-800"
  },
  beauty: {
    bg: "bg-rose-50/50",
    textPrimary: "text-rose-950",
    textSecondary: "text-rose-700/70",
    accent: "text-pink-500",
    accentBg: "bg-pink-500",
    border: "border-pink-200"
  },
  restaurant: {
    bg: "bg-stone-900",
    textPrimary: "text-white",
    textSecondary: "text-stone-400",
    accent: "text-orange-500",
    accentBg: "bg-orange-500",
    border: "border-stone-800"
  },
  fitness: {
    bg: "bg-white",
    textPrimary: "text-zinc-900",
    textSecondary: "text-zinc-500",
    accent: "text-lime-600",
    accentBg: "bg-lime-600",
    border: "border-zinc-200"
  }
} as const;

const getInitials = (name: string) => {
  if (!name) return "OX";
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return (words[0][0] + (words[1] ? words[1][0] : "")).toUpperCase().substring(0, 2);
};

const drawRoundRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) => {
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(x, y, width, height, radius);
  } else {
    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
  }
};

const CategoryIcon = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case "code2":
      return <Code2 className={className} />;
    case "building2":
      return <Building2 className={className} />;
    case "palette":
      return <Palette className={className} />;
    case "activity":
      return <Activity className={className} />;
    case "home":
      return <HomeIcon className={className} />;
    case "graduation-cap":
      return <GraduationCap className={className} />;
    case "trending-up":
      return <TrendingUp className={className} />;
    case "scale":
      return <Scale className={className} />;
    case "camera":
      return <Camera className={className} />;
    case "scissors":
      return <Scissors className={className} />;
    case "chef-hat":
      return <ChefHat className={className} />;
    case "dumbbell":
      return <Dumbbell className={className} />;
    default:
      return <Code2 className={className} />;
  }
};

export default function Home() {
  const [stats, setStats] = useState({ clients: 0, completed: 0, rate: 0, years: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Widget states for Capabilities Bento Grid
  const [sandboxState, setSandboxState] = useState<"idle" | "loading" | "success">("idle");
  const [saasTrafficLevel, setSaasTrafficLevel] = useState(1);
  const [activePalette, setActivePalette] = useState(0);
  const [mockTheme, setMockTheme] = useState<"dark" | "light">("dark");
  const [mockView, setMockView] = useState<"grid" | "list">("grid");
  const [flowActiveStep, setFlowActiveStep] = useState(0);
  const [seoOptimized, setSeoOptimized] = useState(false);

  const [mockDeployState, setMockDeployState] = useState<"idle" | "compiling" | "live">("idle");
  const [mockProgress, setMockProgress] = useState(0);

  const handleMockDeploy = () => {
    if (mockDeployState === "live") {
      setMockDeployState("idle");
      setMockProgress(0);
      return;
    }
    setMockDeployState("compiling");
    setMockProgress(0);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (mockDeployState === "compiling") {
      interval = setInterval(() => {
        setMockProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setMockDeployState("live");
            return 100;
          }
          return prev + 20;
        });
      }, 250);
    }
    return () => clearInterval(interval);
  }, [mockDeployState]);

  // Form states
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", service: "", message: "" });

  // Business Card Generator States
  const [cardCategory, setCardCategory] = useState<CardCategory>("technology");
  const [cardBusinessName, setCardBusinessName] = useState("OrginX");
  const [cardName, setCardName] = useState("Dharshan K");
  const [cardTitle, setCardTitle] = useState("CEO & FOUNDER");
  const [cardTagline, setCardTagline] = useState("WHERE INNOVATION BEGINS");
  const [cardPhone, setCardPhone] = useState("+91 98765 43210");
  const [cardEmail, setCardEmail] = useState("orginxindia@gmail.com");
  const [cardWebsite, setCardWebsite] = useState("www.orginx.com");
  const [cardAddress, setCardAddress] = useState("Bangalore, India");
  const [logoUrl, setLogoUrl] = useState<string>(""); 
  const [profileUrl, setProfileUrl] = useState<string>(""); 
  const [cardFlipped, setCardFlipped] = useState(false);
  const [defaultProfileDataUrl, setDefaultProfileDataUrl] = useState<string>("");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const imageCacheRef = useRef<{ [key: string]: HTMLImageElement }>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetch("/user_photo.jpg")
        .then((res) => res.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setDefaultProfileDataUrl(reader.result as string);
          };
          reader.readAsDataURL(blob);
        })
        .catch((err) => console.error("Error preloading profile photo:", err));
    }
  }, []);

  useEffect(() => {
    // Structured vCard with CRLF line endings, FN property, phone, and website
    const cleanPhone = cardPhone.replace(/\s+/g, "");
    const cleanWebsite = cardWebsite.startsWith("http") ? cardWebsite : `https://${cardWebsite}`;
    const vcardData = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${cardName};;;;`,
      `FN:${cardName}`,
      `ORG:${cardBusinessName}`,
      `TITLE:${cardTitle}`,
      `TEL;TYPE=CELL:${cleanPhone}`,
      `EMAIL;TYPE=INTERNET,WORK:${cardEmail}`,
      `URL;TYPE=WORK:${cleanWebsite}`,
      `ADR;TYPE=WORK:;;${cardAddress};;;;`,
      "END:VCARD"
    ].join("\r\n");

    QRCode.toDataURL(vcardData, { margin: 1, width: 350 })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.error("Error generating preview QR code:", err));
  }, [cardName, cardBusinessName, cardEmail, cardAddress, cardTitle, cardPhone, cardWebsite]);

  // Preload files in the background to ensure synchronous, pop-up safe drawing on download
  useEffect(() => {
    const preload = (key: string, src: string) => {
      if (!src) return;
      const img = new Image();
      if (src.startsWith("http") && !src.includes(window.location.host)) {
        img.crossOrigin = "anonymous";
      }
      img.src = src;
      img.onload = () => {
        imageCacheRef.current[key] = img;
      };
    };

    preload("logo", logoUrl);
    preload("profile", profileUrl || defaultProfileDataUrl || "/user_photo.jpg");
    preload("qr", qrCodeDataUrl);
    preload("defaultLogo", "/logo.png");
  }, [logoUrl, profileUrl, defaultProfileDataUrl, qrCodeDataUrl]);

  const handleCategoryChange = (cat: keyof typeof CATEGORIES_CONFIG) => {
    setCardCategory(cat);
    const config = CATEGORIES_CONFIG[cat];
    setCardTitle(config.defaultTitle);
    setCardTagline(config.defaultTagline);
    setCardPhone(config.defaultPhone);
    setCardWebsite(config.defaultWebsite);
    
    // Automatically shift brand name if it's default or matched a previous template default
    if (cardBusinessName === "OrginX" || Object.values(CATEGORIES_CONFIG).some(c => c.defaultTagline === cardTagline)) {
      if (cat === "technology") setCardBusinessName("OrginX");
      else if (cat === "corporate") setCardBusinessName("Aarav Co.");
      else if (cat === "creative") setCardBusinessName("CreativeX");
      else if (cat === "healthcare") setCardBusinessName("HealthPlus");
      else if (cat === "real_estate") setCardBusinessName("Skyline");
      else if (cat === "education") setCardBusinessName("Educare");
      else if (cat === "finance") setCardBusinessName("Finvest");
      else if (cat === "legal") setCardBusinessName("LexWell");
      else if (cat === "photography") setCardBusinessName("PixelCraft");
      else if (cat === "beauty") setCardBusinessName("Glow & Grace");
      else if (cat === "restaurant") setCardBusinessName("Spice Nation");
      else if (cat === "fitness") setCardBusinessName("FitLab");
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setLogoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadCardSide = async (side: "front" | "back") => {
    const canvas = document.createElement("canvas");
    canvas.width = 1050;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Helper to load an image from URL/DataURL safely
    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        if (src.startsWith("http") && !src.includes(window.location.host)) {
          img.crossOrigin = "anonymous";
        }
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
        img.src = src;
      });
    };

    // Helper to get from cache or load dynamically (fallback)
    const getCachedOrLoad = async (key: string, src: string): Promise<HTMLImageElement | null> => {
      if (imageCacheRef.current[key] && imageCacheRef.current[key].src === src) {
        return imageCacheRef.current[key];
      }
      if (!src) return null;
      try {
        const img = await loadImage(src);
        imageCacheRef.current[key] = img;
        return img;
      } catch (e) {
        console.error(`Error loading image ${key} in download flow:`, e);
        return null;
      }
    };

    const style = CATEGORIES_CONFIG[cardCategory];

    try {
      // 1. Draw rounded card clipping path for canvas download
      ctx.save();
      ctx.beginPath();
      drawRoundRect(ctx, 10, 10, canvas.width - 20, canvas.height - 20, 40);
      ctx.clip();

      // 2. Draw background gradient based on theme
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      if (cardCategory === "technology") {
        gradient.addColorStop(0, "#0b0410");
        gradient.addColorStop(1, "#1c0d2b");
      } else if (cardCategory === "corporate") {
        gradient.addColorStop(0, "#ffffff");
        gradient.addColorStop(1, "#f1f5f9");
      } else if (cardCategory === "creative") {
        gradient.addColorStop(0, "#18181b");
        gradient.addColorStop(1, "#27272a");
      } else if (cardCategory === "healthcare") {
        gradient.addColorStop(0, "#f8fafc");
        gradient.addColorStop(1, "#e2e8f0");
      } else if (cardCategory === "real_estate") {
        gradient.addColorStop(0, "#fafaf9");
        gradient.addColorStop(1, "#e7e5e4");
      } else if (cardCategory === "education") {
        gradient.addColorStop(0, "#ffffff");
        gradient.addColorStop(1, "#f2f7f7");
      } else if (cardCategory === "finance") {
        gradient.addColorStop(0, "#ffffff");
        gradient.addColorStop(1, "#eff6ff");
      } else if (cardCategory === "legal") {
        gradient.addColorStop(0, "#09090b");
        gradient.addColorStop(1, "#18181b");
      } else if (cardCategory === "photography") {
        gradient.addColorStop(0, "#0c0a09");
        gradient.addColorStop(1, "#1c1917");
      } else if (cardCategory === "beauty") {
        gradient.addColorStop(0, "#fff1f2");
        gradient.addColorStop(1, "#ffe4e6");
      } else if (cardCategory === "restaurant") {
        gradient.addColorStop(0, "#1c1917");
        gradient.addColorStop(1, "#292524");
      } else if (cardCategory === "fitness") {
        gradient.addColorStop(0, "#ffffff");
        gradient.addColorStop(1, "#f4f4f5");
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw background panel geometries matching the category templates
      if (cardCategory === "corporate") {
        ctx.fillStyle = "#0f4c81";
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.65, 0);
        ctx.lineTo(canvas.width, 0);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(canvas.width * 0.78, canvas.height);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#38bdf8";
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.61, 0);
        ctx.lineTo(canvas.width * 0.65, 0);
        ctx.lineTo(canvas.width * 0.78, canvas.height);
        ctx.lineTo(canvas.width * 0.74, canvas.height);
        ctx.closePath();
        ctx.fill();
      } else if (cardCategory === "creative") {
        ctx.fillStyle = "#fbbf24";
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.68, 0);
        ctx.lineTo(canvas.width, 0);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(canvas.width * 0.85, canvas.height);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#18181b";
        ctx.globalAlpha = 0.25;
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.76, 0);
        ctx.lineTo(canvas.width * 0.82, 0);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(canvas.width * 0.94, canvas.height);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1.0;
      } else if (cardCategory === "healthcare") {
        ctx.fillStyle = "rgba(16, 185, 129, 0.08)";
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.7, 0);
        ctx.bezierCurveTo(canvas.width * 0.8, canvas.height * 0.2, canvas.width * 0.75, canvas.height * 0.8, canvas.width, canvas.height);
        ctx.lineTo(canvas.width, 0);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = "#10b981";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.6, canvas.height * 0.8);
        ctx.lineTo(canvas.width * 0.7, canvas.height * 0.8);
        ctx.lineTo(canvas.width * 0.72, canvas.height * 0.7);
        ctx.lineTo(canvas.width * 0.74, canvas.height * 0.92);
        ctx.lineTo(canvas.width * 0.76, canvas.height * 0.75);
        ctx.lineTo(canvas.width * 0.78, canvas.height * 0.82);
        ctx.lineTo(canvas.width * 0.9, canvas.height * 0.8);
        ctx.stroke();
      } else if (cardCategory === "real_estate") {
        ctx.fillStyle = "#0f172a";
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.72, 0);
        ctx.lineTo(canvas.width, 0);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(canvas.width * 0.82, canvas.height);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#ca8a04";
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.7, 0);
        ctx.lineTo(canvas.width * 0.72, 0);
        ctx.lineTo(canvas.width * 0.82, canvas.height);
        ctx.lineTo(canvas.width * 0.8, canvas.height);
        ctx.closePath();
        ctx.fill();
      } else if (cardCategory === "education") {
        ctx.fillStyle = "rgba(13, 148, 136, 0.12)";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(canvas.width * 0.3, 0, canvas.width * 0.4, canvas.height * 0.4);
        ctx.quadraticCurveTo(canvas.width * 0.2, canvas.height, 0, canvas.height);
        ctx.closePath();
        ctx.fill();
      } else if (cardCategory === "finance") {
        ctx.fillStyle = "rgba(37, 99, 235, 0.1)";
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.6, canvas.height);
        ctx.quadraticCurveTo(canvas.width * 0.8, canvas.height * 0.4, canvas.width, canvas.height * 0.7);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fill();
      } else if (cardCategory === "legal") {
        ctx.strokeStyle = "#ca8a04";
        ctx.lineWidth = 2;
        ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
        ctx.lineWidth = 0.5;
        ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
      } else if (cardCategory === "photography") {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(canvas.width * 0.85, canvas.height * 0.5, 200, 0, Math.PI * 2);
        ctx.stroke();
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(canvas.width * 0.85, canvas.height * 0.5, 140, 0, Math.PI * 2);
        ctx.stroke();
      } else if (cardCategory === "beauty") {
        ctx.fillStyle = "rgba(236, 72, 153, 0.06)";
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * 0.7);
        ctx.quadraticCurveTo(canvas.width * 0.3, canvas.height * 0.5, canvas.width * 0.5, canvas.height * 0.75);
        ctx.quadraticCurveTo(canvas.width * 0.8, canvas.height * 0.95, canvas.width, canvas.height * 0.65);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();
      } else if (cardCategory === "restaurant") {
        ctx.fillStyle = "rgba(234, 88, 12, 0.1)";
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.7, 0);
        ctx.bezierCurveTo(canvas.width * 0.8, canvas.height * 0.3, canvas.width * 0.75, canvas.height * 0.7, canvas.width, canvas.height);
        ctx.lineTo(canvas.width, 0);
        ctx.closePath();
        ctx.fill();
      } else if (cardCategory === "fitness") {
        ctx.fillStyle = "#84cc16";
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.78, 0);
        ctx.lineTo(canvas.width * 0.86, 0);
        ctx.lineTo(canvas.width * 0.68, canvas.height);
        ctx.lineTo(canvas.width * 0.6, canvas.height);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#18181b";
        ctx.globalAlpha = 0.15;
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.86, 0);
        ctx.lineTo(canvas.width * 0.94, 0);
        ctx.lineTo(canvas.width * 0.76, canvas.height);
        ctx.lineTo(canvas.width * 0.68, canvas.height);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1.0;
      } else {
        // Draw dot grid
        ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
        for (let x = 30; x < canvas.width; x += 30) {
          for (let y = 30; y < canvas.height; y += 30) {
            ctx.beginPath();
            ctx.arc(x, y, 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 5. Card Border line
      ctx.strokeStyle = style.isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      drawRoundRect(ctx, 10, 10, canvas.width - 20, canvas.height - 20, 40);
      ctx.stroke();

      if (side === "front") {
        // Draw Logo Box
        if (logoUrl) {
          const logoImg = await getCachedOrLoad("logo", logoUrl);
          if (logoImg) {
            ctx.save();
            ctx.beginPath();
            drawRoundRect(ctx, 100, 100, 100, 100, 16);
            ctx.clip();
            ctx.drawImage(logoImg, 100, 100, 100, 100);
            ctx.restore();
          }
          
          ctx.fillStyle = style.isDark ? "#ffffff" : "#09090b";
          ctx.font = "bold 36px sans-serif";
          ctx.fillText(cardBusinessName || "OrginX", 220, 160);
        } else {
          // Default Brand Logo (with initials) matching selected cardCategory accent color
          const accentColor = style.accentHex;
          ctx.fillStyle = accentColor;
          ctx.beginPath();
          drawRoundRect(ctx, 100, 100, 100, 100, 16);
          ctx.fill();

          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 44px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(getInitials(cardBusinessName || "OrginX"), 150, 150);
          ctx.textAlign = "left";
          ctx.textBaseline = "alphabetic";

          ctx.fillStyle = style.isDark ? "#ffffff" : "#09090b";
          ctx.font = "bold 36px sans-serif";
          ctx.fillText(cardBusinessName || "OrginX", 220, 160);
        }

        // Bottom text block
        ctx.fillStyle = style.accentHex;
        ctx.font = "bold 18px monospace";
        ctx.fillText(cardTitle.toUpperCase() || "CORPORATE IDENTITY CARD", 100, 390);

        ctx.fillStyle = style.isDark ? "#ffffff" : "#09090b";
        ctx.font = "bold 64px sans-serif";
        ctx.fillText(cardBusinessName || "OrginX", 100, 465);

        ctx.fillStyle = style.isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)";
        ctx.font = "bold 22px sans-serif";
        ctx.fillText(cardTagline || "CREATIVE STUDIO & SOFTWARE HOUSE", 100, 510);
      } else {
        // Draw Back Side
        // Top Header
        ctx.fillStyle = style.isDark ? "#ffffff" : "#09090b";
        ctx.font = "bold 48px sans-serif";
        ctx.fillText(cardName || "Dharshan K", 100, 140);

        ctx.fillStyle = style.isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)";
        ctx.font = "bold 18px monospace";
        ctx.fillText(cardTitle.toUpperCase() || "FOUNDER & LEAD ENGINEER", 100, 180);

        // Profile Picture
        const profileSrc = profileUrl || defaultProfileDataUrl || "/user_photo.jpg";
        const profileImg = await getCachedOrLoad("profile", profileSrc);
        if (profileImg) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(180, 340, 90, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(profileImg, 90, 250, 180, 180);
          ctx.restore();
          
          ctx.strokeStyle = style.isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(180, 340, 90, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Contact details
        ctx.fillStyle = style.isDark ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.85)";
        ctx.font = "normal 24px monospace";
        ctx.fillText(`Phone:   ${cardPhone || "+91 98765 43210"}`, 310, 295);
        ctx.fillText(`Email:   ${cardEmail || "orginxindia@gmail.com"}`, 310, 345);
        ctx.fillText(`Website: ${cardWebsite || "www.orginx.com"}`, 310, 395);
        ctx.fillText(`Address: ${cardAddress || "Bangalore, India"}`, 310, 445);

        // QR Code
        if (qrCodeDataUrl) {
          const qrImg = await getCachedOrLoad("qr", qrCodeDataUrl);
          if (qrImg) {
            ctx.drawImage(qrImg, 730, 220, 220, 220);
          }
        }

        // Bottom Tap indicators
        ctx.fillStyle = style.isDark ? "rgba(255, 255, 255, 0.35)" : "rgba(0, 0, 0, 0.35)";
        ctx.font = "bold 16px monospace";
        ctx.fillText("TAP WITH PHONE FOR CONTACT TRANSFERS", 100, 520);

        ctx.fillStyle = "#10b981";
        ctx.font = "bold 16px monospace";
        ctx.fillText("TAP ACTIVE ●", 830, 520);
      }

      ctx.restore(); // Restore clipping path

      // Trigger file download
      const cleanBusinessName = (cardBusinessName || "OrginX").replace(/\s+/g, "_");
      const filename = `${cleanBusinessName}_Card_${side === "front" ? "Front" : "Back"}.png`;
      const link = document.createElement("a");
      link.download = filename;
      link.href = canvas.toDataURL("image/png");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (err) {
      console.error("Error exporting card canvas:", err);
    }
  };
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Mouse position tracking ref
  const glowWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      if (glowWrapperRef.current) {
        glowWrapperRef.current.style.transform = `translate(${nx * -15}px, ${ny * -15}px)`;
      }
    };

    const handleMouseLeave = () => {
      if (glowWrapperRef.current) {
        glowWrapperRef.current.style.transform = `translate(0px, 0px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);



  // GSAP animations for smooth scroll-triggered entry
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // Initialize Lenis smooth scroll if not on mobile
      let lenis: Lenis | null = null;
      let updateTicker: ((time: number) => void) | null = null;

      if (window.innerWidth >= 768) {
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });

        lenis.on("scroll", () => {
          ScrollTrigger.update();
        });

        updateTicker = (time: number) => {
          lenis?.raf(time * 1000);
        };

        gsap.ticker.add(updateTicker);
      }
      gsap.ticker.lagSmoothing(0);

      // Hero elements entrance animations
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(
        "#hero-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power4.out" }
      );
      tl.fromTo(
        "#hero-left > *, #hero-right > *",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.6"
      );
      tl.fromTo(
        "#hero-center",
        { opacity: 0, scale: 0.92, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: "power4.out" },
        "-=0.8"
      );

      // Stats count up scroll trigger
      const statsObj = { clients: 0, completed: 0, rate: 0, years: 0 };
      gsap.to(statsObj, {
        clients: 45,
        completed: 150,
        rate: 98,
        years: 2,
        duration: 2.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#stats",
          start: "top 95%",
          toggleActions: "play none none none"
        },
        onUpdate: () => {
          setStats({
            clients: Math.floor(statsObj.clients),
            completed: Math.floor(statsObj.completed),
            rate: Math.floor(statsObj.rate),
            years: Math.floor(statsObj.years)
          });
        }
      });

      // Smoothly flatten hero bottom rounded corners on scroll to blend into the next section
      gsap.to("#hero", {
        borderBottomLeftRadius: "0px",
        borderBottomRightRadius: "0px",
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom 60%",
          scrub: true,
        }
      });

      // Horizontal scroll animation for Why Choose Us
      if (window.innerWidth >= 768 && scrollContainerRef.current) {
        gsap.to(scrollContainerRef.current, {
          x: () => -(scrollContainerRef.current!.scrollWidth - window.innerWidth + 64),
          ease: "none",
          scrollTrigger: {
            trigger: "#process",
            pin: true,
            scrub: 0.5,
            start: "top top",
            end: () => `+=${scrollContainerRef.current!.scrollWidth - window.innerWidth}`,
            invalidateOnRefresh: true,
          }
        });
      }

      // Parallax scrolling for masterpieces images
      gsap.fromTo(
        "#about-right-img",
        { yPercent: 10 },
        {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: "#about",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Section animations (fade headers)
      const sectionSelectors = ["#about", "#services", "#process", "#reviews", "#contact"];
      sectionSelectors.forEach((id) => {
        gsap.fromTo(
          `${id} .label, ${id} h2, ${id} p:not(.bento-card p)`,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: id,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Bento cards fade in (individually for mobile compatibility)
      const bentoCards = gsap.utils.toArray(".bento-card") as Element[];
      bentoCards.forEach((card: Element) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              toggleActions: "play none none reverse"
            }
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
        if (lenis) lenis.destroy();
        if (updateTicker) gsap.ticker.remove(updateTicker);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        refreshTimers.forEach((timer) => clearTimeout(timer));
        window.removeEventListener("load", handleWindowLoad);
      };
    }
  }, []);

  // Horizontal Scroll for Why Us
  const whyUsRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.phone || !formState.service || !formState.message) return;
    setFormStatus("sending");

    try {
      const response = await fetch("https://formsubmit.co/ajax/orginxindia@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          service: formState.service,
          message: formState.message,
          _subject: "New Contact Message - OrginX Website"
        })
      });

      if (response.ok) {
        setFormStatus("success");
        setFormState({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus("error");
    } finally {
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  };

  const style = CATEGORY_STYLES[cardCategory];

  return (
    <>
      <Navbar />
      <div 
        ref={glowWrapperRef}
        className="fixed inset-0 pointer-events-none transition-transform duration-300 ease-out z-[1]"
      >
        <CanvasGlow />
      </div>

      {/* Mainframe Interactive Hero Section (Creatix Style Pivot) */}
      <section id="hero" className="bg-white text-zinc-900 rounded-b-[40px] sm:rounded-b-[60px] lg:rounded-b-[80px] shadow-2xl relative z-20 pt-20 pb-28 lg:pt-24 lg:pb-40 select-none overflow-hidden transition-all duration-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          
          {/* Centered Heading */}
          <h1
            id="hero-title"
            className="text-center text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 font-sans max-w-4xl leading-tight"
          >
            Empowering Brands <br className="hidden sm:inline" />
            Through Creative Solutions
          </h1>

          {/* Three Column Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center w-full mt-6 sm:mt-10 lg:mt-12">
            
            {/* Left Column: Starburst, Intro Paragraph, and Button */}
            <div id="hero-left" className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 order-2 lg:order-1">
              {/* Blue/green starburst SVGs */}
              <div className="relative text-accent w-12 h-12">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="w-full h-full animate-[spin_20s_linear_infinite]">
                  {[...Array(8)].map((_, i) => {
                    const angle = (i * Math.PI) / 4;
                    return (
                      <line
                        key={i}
                        x1="50"
                        y1="50"
                        x2={50 + 40 * Math.cos(angle)}
                        y2={50 + 40 * Math.sin(angle)}
                      />
                    );
                  })}
                </svg>
              </div>

              <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed max-w-xs font-sans">
                From web development to branding, we deliver innovative strategies that elevate your brand and drive growth. Let&apos;s create something exceptional together.
              </p>

              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-zinc-300 hover:border-zinc-800 text-zinc-800 hover:bg-zinc-50 px-6 py-2.5 text-xs font-bold transition-all font-sans cursor-pointer"
              >
                Innovate Your Brand
              </a>
            </div>

            {/* Center Column: Portrait Image overlapping buttons wrapper */}
            <div id="hero-center" className="lg:col-span-4 flex flex-col items-center justify-center relative order-1 lg:order-2 mt-6 lg:-mt-16">
              {/* Celebrating woman portrait */}
              <div className="relative z-10 w-[270px] sm:w-[360px] lg:w-[360px] xl:w-[400px] aspect-[1024/912] flex items-end justify-center select-none top-0">
                {/* 3D Depth Radial Aura */}
                <div className="absolute w-[80%] h-[80%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-accent/30 to-accent-purple/20 rounded-full blur-[80px] opacity-30 -z-10 pointer-events-none animate-pulse" style={{ animationDuration: "10s" }} />
                
                <img
                  src="/header.png"
                  alt="Celebrating Creative Professional Portrait"
                  className="h-full w-auto object-contain drop-shadow-[0_35px_65px_rgba(0,0,0,0.15)] transform hover:scale-[1.02] transition-transform duration-500"
                  draggable="false"
                />

                {/* Capsule action buttons overlay (Super Glossy Double-Outline Design) */}
                <div className="absolute -bottom-6 sm:-bottom-4 left-1/2 -translate-x-1/2 z-20 rounded-2xl sm:rounded-full p-[1px] bg-[#cccccc] shadow-[0_20px_45px_rgba(0,0,0,0.35)] w-[calc(100vw-40px)] sm:w-max animate-pulse" style={{ animationDuration: "3s" }}>
                  <div className="rounded-2xl sm:rounded-full bg-black/90 p-2 sm:p-[6px] flex flex-col sm:flex-row items-center gap-2 sm:gap-2.5 border border-white/20 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)]">
                    <a
                      href="#contact"
                      className="w-full sm:w-auto text-center bg-accent hover:bg-accent/80 text-white rounded-xl sm:rounded-full px-6 py-2.5 text-xs font-black transition-all whitespace-nowrap cursor-pointer shadow-[0_0_20px_rgba(0,128,255,0.55),inset_0_1px_2px_rgba(255,255,255,0.4)] hover:scale-[1.03] border border-white/10"
                    >
                      Start Your Project
                    </a>
                    <a
                      href="#contact"
                      className="w-full sm:w-auto text-center border border-white/20 hover:border-white/40 bg-[#151515] hover:bg-[#252525] text-white rounded-xl sm:rounded-full px-5 py-2.5 text-xs font-bold transition-all whitespace-nowrap cursor-pointer shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] hover:scale-[1.01]"
                    >
                      Let&apos;s Collaborate
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Experience Stars and Ratings */}
            <div id="hero-right" className="lg:col-span-4 flex flex-col items-center lg:items-end text-center lg:text-right gap-6 order-3 lg:order-3">
              {/* Star icons */}
              <div className="flex gap-1 text-accent">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                  </svg>
                ))}
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-3xl sm:text-4xl font-black text-zinc-950 font-sans tracking-tight">2 Years</span>
                <span className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-widest font-sans">Experience</span>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator chevron */}
        <div 
          onClick={() => {
            const target = document.getElementById("about");
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-0.5 text-zinc-400 hover:text-zinc-600 transition-colors duration-200 cursor-pointer z-20 group"
        >
          <span className="text-[8px] uppercase font-bold tracking-widest font-sans">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </div>
      </section>

      {/* OrginX Sub-sections (Cover background video on scroll) */}
      <div className="relative z-10 bg-background transition-colors duration-500">
        
        {/* Stats Banner */}
        <section id="stats" className="border-b border-border-custom bg-background py-12 relative overflow-hidden dot-grid">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/3 to-accent-purple/3 pointer-events-none" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="flex flex-col items-center justify-center text-center p-6 rounded-2xl border border-zinc-200/60 bg-white/60 backdrop-blur-md shadow-xs hover:shadow-md hover:border-accent/30 transition-all duration-300">
                <span className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent font-sans">{stats.clients.toLocaleString()}+</span>
                <span className="text-[10px] sm:text-xs font-extrabold text-zinc-400 uppercase tracking-widest mt-2 font-sans">Global Clients</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-6 rounded-2xl border border-zinc-200/60 bg-white/60 backdrop-blur-md shadow-xs hover:shadow-md hover:border-accent-purple/30 transition-all duration-300">
                <span className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-accent-purple to-accent-purple/80 bg-clip-text text-transparent font-sans">{stats.completed}+</span>
                <span className="text-[10px] sm:text-xs font-extrabold text-zinc-400 uppercase tracking-widest mt-2 font-sans">Projects Completed</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-6 rounded-2xl border border-zinc-200/60 bg-white/60 backdrop-blur-md shadow-xs hover:shadow-md hover:border-accent/30 transition-all duration-300">
                <span className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-accent to-accent-purple bg-clip-text text-transparent font-sans">{stats.rate}%</span>
                <span className="text-[10px] sm:text-xs font-extrabold text-zinc-400 uppercase tracking-widest mt-2 font-sans">Success Rate</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-6 rounded-2xl border border-zinc-200/60 bg-white/60 backdrop-blur-md shadow-xs hover:shadow-md hover:border-accent-purple/30 transition-all duration-300">
                <span className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-accent-purple to-accent bg-clip-text text-transparent font-sans">{stats.years}+</span>
                <span className="text-[10px] sm:text-xs font-extrabold text-zinc-400 uppercase tracking-widest mt-2 font-sans">Years Experience</span>
              </div>
            </div>
          </div>
        </section>

        {/* Turning Ideas Into Masterpieces */}
        <section id="about" className="border-b border-border-custom bg-background py-24 dot-grid relative overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-accent/5 to-transparent blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-accent-purple/5 to-transparent blur-[120px] pointer-events-none" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              {/* Left Column */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent font-extrabold text-[10px] sm:text-xs uppercase tracking-widest shadow-[0_2px_8px_rgba(0,128,255,0.04)]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                    </span>
                    Interactive Studio
                  </span>
                  <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl tracking-tight mt-4 leading-tight text-foreground">
                    Create Your Custom <span className="bg-gradient-to-r from-accent to-accent-purple bg-clip-text text-transparent">Business Card</span> Instantly.
                  </h2>
                  <p className="mt-4 text-text-secondary text-sm leading-relaxed">
                    Provide your branding details below to compile an interactive smart card. Scan the dynamic QR code to sync contacts instantly, or download print-ready files.
                  </p>
                </div>

                {/* Form Controls Card */}
                <div className="p-6 rounded-3xl border border-zinc-200/80 bg-white/50 backdrop-blur-xs shadow-sm flex flex-col gap-4">
                  
                  {/* Row 1: Business Name & Full Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-1.5">
                        <Building className="h-3 w-3 text-accent" />
                        Business Name
                      </label>
                      <input
                        type="text"
                        value={cardBusinessName}
                        onChange={(e) => setCardBusinessName(e.target.value)}
                        placeholder="OrginX"
                        className="rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs outline-none focus:border-accent transition-colors text-zinc-950 font-sans shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-1.5">
                        <User className="h-3 w-3 text-accent" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Dharshan K"
                        className="rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs outline-none focus:border-accent transition-colors text-zinc-950 font-sans shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                      />
                    </div>
                  </div>

                  {/* Row 2: Designation/Title & Tagline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-1.5">
                        <Briefcase className="h-3 w-3 text-accent" />
                        Job Title / Designation
                      </label>
                      <input
                        type="text"
                        value={cardTitle}
                        onChange={(e) => setCardTitle(e.target.value)}
                        placeholder="Founder & Lead Engineer"
                        className="rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs outline-none focus:border-accent transition-colors text-zinc-950 font-sans shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3 text-accent" />
                        Tagline / Slogan
                      </label>
                      <input
                        type="text"
                        value={cardTagline}
                        onChange={(e) => setCardTagline(e.target.value)}
                        placeholder="Creative Studio & Software House"
                        className="rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs outline-none focus:border-accent transition-colors text-zinc-950 font-sans shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                      />
                    </div>
                  </div>

                  {/* Row 3: Phone Number & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-1.5">
                        <Phone className="h-3 w-3 text-accent" />
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={cardPhone}
                        onChange={(e) => setCardPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs outline-none focus:border-accent transition-colors text-zinc-950 font-sans shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-1.5">
                        <Mail className="h-3 w-3 text-accent" />
                        Gmail / Email
                      </label>
                      <input
                        type="email"
                        value={cardEmail}
                        onChange={(e) => setCardEmail(e.target.value)}
                        placeholder="orginxindia@gmail.com"
                        className="rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs outline-none focus:border-accent transition-colors text-zinc-950 font-sans shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                      />
                    </div>
                  </div>

                  {/* Row 4: Website & Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-1.5">
                        <Globe className="h-3 w-3 text-accent" />
                        Website Link
                      </label>
                      <input
                        type="text"
                        value={cardWebsite}
                        onChange={(e) => setCardWebsite(e.target.value)}
                        placeholder="www.orginx.com"
                        className="rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs outline-none focus:border-accent transition-colors text-zinc-950 font-sans shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-1.5">
                        <MapPin className="h-3 w-3 text-accent" />
                        Address
                      </label>
                      <input
                        type="text"
                        value={cardAddress}
                        onChange={(e) => setCardAddress(e.target.value)}
                        placeholder="Bangalore, India"
                        className="rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs outline-none focus:border-accent transition-colors text-zinc-950 font-sans shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                      />
                    </div>
                  </div>

                  {/* File Uploads Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-100">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-1.5">
                        <Upload className="h-3 w-3 text-accent" />
                        Upload Logo (Front)
                      </span>
                      <label className="flex items-center justify-center border border-dashed border-zinc-200 rounded-xl bg-white px-3 py-2 text-[11px] text-zinc-500 hover:border-accent transition-colors cursor-pointer hover:bg-zinc-50/50">
                        <span className="truncate">{logoUrl ? "Change Logo file" : "Choose file..."}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-1.5">
                        <Upload className="h-3 w-3 text-accent" />
                        Profile Image (Back)
                      </span>
                      <label className="flex items-center justify-center border border-dashed border-zinc-200 rounded-xl bg-white px-3 py-2 text-[11px] text-zinc-500 hover:border-accent transition-colors cursor-pointer hover:bg-zinc-50/50">
                        <span className="truncate">{profileUrl ? "Change Photo file" : "Choose file..."}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Category Grid Selectors */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-zinc-100 mt-1">
                    <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Card Template Category</span>
                    <div className="grid grid-cols-2 gap-2 max-h-[190px] overflow-y-auto pr-1">
                      {Object.values(CATEGORIES_CONFIG).map((cat) => {
                        const isSelected = cardCategory === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => handleCategoryChange(cat.id)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-left cursor-pointer transition-all hover:bg-zinc-50/80 active:scale-95 ${
                              isSelected 
                                ? "border-zinc-900 bg-zinc-900 text-white shadow-md hover:bg-zinc-900" 
                                : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400"
                            }`}
                          >
                            <div className={`p-1 rounded-md ${
                              isSelected ? "bg-white/10 text-white" : "bg-zinc-100 text-zinc-600"
                            }`}>
                              <CategoryIcon name={cat.iconName} className="h-3.5 w-3.5" />
                            </div>
                            <span className="text-[10px] font-bold truncate leading-tight">{cat.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: 3D Flip Card Preview */}
              <div className="lg:col-span-6 flex flex-col gap-6 items-center justify-center w-full overflow-hidden">
                <div className="w-full h-[180px] min-[360px]:h-[210px] min-[440px]:h-[240px] sm:h-[260px] flex items-center justify-center overflow-visible">
                  <div 
                    className="relative w-[420px] aspect-[1.75/1] cursor-pointer scale-[0.68] min-[360px]:scale-[0.8] min-[440px]:scale-[0.9] sm:scale-100 origin-center transition-transform @container flex-shrink-0"
                    style={{ perspective: "1200px" }}
                    onClick={() => setCardFlipped(!cardFlipped)}
                  >
                    <div
                      className="relative w-full h-full rounded-2xl transition-transform duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.15)] select-none"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: cardFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
                      }}
                    >
                    
                    {/* CARD FRONT */}
                    <div
                      className={`absolute inset-0 w-full h-full rounded-2xl p-[5.5cqw] sm:p-6 border flex flex-col justify-between overflow-hidden shadow-inner ${style.bg} ${style.border}`}
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      {/* Background Category vectors */}
                      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
                        {cardCategory === "technology" && (
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <circle cx="90" cy="10" r="40" fill="none" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />
                            <circle cx="10" cy="90" r="30" fill="none" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" />
                            <path d="M 0 50 L 100 50 M 50 0 L 50 100" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                          </svg>
                        )}
                        {cardCategory === "corporate" && (
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M 60 0 L 100 0 L 100 100 L 78 100 Z" fill="#0f4c81" opacity="0.95" />
                            <path d="M 53 0 L 60 0 L 78 100 L 71 100 Z" fill="#38bdf8" opacity="0.8" />
                          </svg>
                        )}
                        {cardCategory === "creative" && (
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M 65 0 L 100 0 L 100 100 L 85 100 Z" fill="#fbbf24" />
                            <path d="M 75 0 L 85 0 L 100 100 L 90 100 Z" fill="#18181b" opacity="0.6" />
                          </svg>
                        )}
                        {cardCategory === "healthcare" && (
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M 70 0 C 85 20 80 80 100 100 L 100 0 Z" fill="#10b981" opacity="0.1" />
                            <path d="M 50 85 L 60 85 L 63 70 L 66 95 L 69 80 L 72 87 L 85 87" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        {cardCategory === "real_estate" && (
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M 70 0 L 100 0 L 100 100 L 82 100 Z" fill="#0f172a" />
                            <path d="M 68 0 L 70 0 L 82 100 L 80 100 Z" fill="#ca8a04" />
                          </svg>
                        )}
                        {cardCategory === "education" && (
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M 0 0 Q 30 0 40 40 T 20 100 L 0 100 Z" fill="#0d9488" opacity="0.15" />
                            <path d="M 0 0 Q 35 0 45 45 T 25 100" fill="none" stroke="#0d9488" strokeWidth="1.5" opacity="0.3" />
                          </svg>
                        )}
                        {cardCategory === "finance" && (
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M 60 100 Q 80 40 100 70 L 100 100 Z" fill="#2563eb" opacity="0.15" />
                            <path d="M 50 100 Q 75 20 100 50" fill="none" stroke="#2563eb" strokeWidth="1.5" opacity="0.2" />
                          </svg>
                        )}
                        {cardCategory === "legal" && (
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <rect x="3" y="3" width="94" height="94" rx="2" fill="none" stroke="#d97706" strokeWidth="0.8" opacity="0.4" />
                            <rect x="5" y="5" width="90" height="90" rx="1" fill="none" stroke="#d97706" strokeWidth="0.3" opacity="0.3" />
                          </svg>
                        )}
                        {cardCategory === "photography" && (
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <circle cx="85" cy="50" r="30" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="4" />
                            <circle cx="85" cy="50" r="20" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="2" />
                            <line x1="55" y1="50" x2="115" y2="50" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />
                          </svg>
                        )}
                        {cardCategory === "beauty" && (
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M 0 70 Q 30 50 50 75 T 100 65 L 100 100 L 0 100 Z" fill="#fbcfe8" opacity="0.5" />
                            <path d="M 0 75 Q 30 55 50 80 T 100 70" fill="none" stroke="#ec4899" strokeWidth="1" opacity="0.3" />
                          </svg>
                        )}
                        {cardCategory === "restaurant" && (
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M 70 0 C 80 30 75 70 100 100 L 100 0 Z" fill="#ea580c" opacity="0.15" />
                            <circle cx="95" cy="50" r="25" fill="none" stroke="#ea580c" strokeWidth="1" opacity="0.2" />
                          </svg>
                        )}
                        {cardCategory === "fitness" && (
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M 75 0 L 85 0 L 65 100 L 55 100 Z" fill="#84cc16" opacity="0.3" />
                            <path d="M 85 0 L 95 0 L 75 100 L 65 100 Z" fill="#18181b" opacity="0.1" />
                          </svg>
                        )}
                      </div>

                      {/* Header Logo pill */}
                      <div className="flex justify-between items-start z-10">
                        <div className="flex items-center gap-[2cqw] sm:gap-2">
                          {logoUrl ? (
                            <>
                              <img src={logoUrl} alt="Logo" className="h-[8.5cqw] w-[8.5cqw] sm:h-9 sm:w-9 rounded-lg object-contain border border-white/20 bg-white/5 p-0.5" />
                              <span className={`font-extrabold text-[3.3cqw] sm:text-sm tracking-wider uppercase ${style.textPrimary}`}>{cardBusinessName || "OrginX"}</span>
                            </>
                          ) : (
                            <>
                              <div className={`h-[8.5cqw] w-[8.5cqw] sm:h-9 sm:w-9 rounded-lg ${style.accentBg} flex items-center justify-center font-black text-xs text-white border border-white/20 shadow-lg`}>
                                <CategoryIcon name={CATEGORIES_CONFIG[cardCategory].iconName} className="h-[4.8cqw] w-[4.8cqw] sm:h-5 sm:w-5 text-white" />
                              </div>
                              <span className={`font-extrabold text-[3.3cqw] sm:text-sm tracking-wider uppercase ${style.textPrimary}`}>{cardBusinessName || "OrginX"}</span>
                            </>
                          )}
                        </div>
                        <span className={`text-[1.8cqw] sm:text-[8px] font-mono tracking-widest uppercase ${style.textSecondary}`}>Smart NFC Ready</span>
                      </div>

                      {/* Core Content */}
                      <div className="z-10 flex flex-col gap-0.5">
                        <span className={`text-[1.8cqw] sm:text-[8px] font-mono tracking-widest font-bold uppercase ${style.accent}`}>{cardTitle || "CORPORATE IDENTITY CARD"}</span>
                        <h3 className={`text-[5.5cqw] sm:text-2xl font-black tracking-tight leading-tight uppercase font-sans ${style.textPrimary}`}>
                          {cardBusinessName || "OrginX"}
                        </h3>
                        <p className={`text-[2.2cqw] sm:text-[9px] tracking-wider ${style.textSecondary}`}>{cardTagline || "CREATIVE STUDIO & SOFTWARE HOUSE"}</p>
                      </div>

                      {/* Card Shimmer lighting shine overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                    </div>

                    {/* CARD BACK */}
                    <div
                      className={`absolute inset-0 w-full h-full rounded-2xl p-[5.5cqw] sm:p-6 border flex flex-col justify-between overflow-hidden shadow-inner ${style.bg} ${style.border}`}
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)"
                      }}
                    >
                      {/* Background Category vectors */}
                      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                        {cardCategory === "technology" && (
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <circle cx="90" cy="10" r="40" fill="none" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />
                            <circle cx="10" cy="90" r="30" fill="none" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" />
                            <path d="M 0 50 L 100 50 M 50 0 L 50 100" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                          </svg>
                        )}
                        {cardCategory === "corporate" && (
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M 60 0 L 100 0 L 100 100 L 78 100 Z" fill="#0f4c81" opacity="0.95" />
                            <path d="M 53 0 L 60 0 L 78 100 L 71 100 Z" fill="#38bdf8" opacity="0.8" />
                          </svg>
                        )}
                        {cardCategory === "creative" && (
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M 65 0 L 100 0 L 100 100 L 85 100 Z" fill="#fbbf24" />
                            <path d="M 75 0 L 85 0 L 100 100 L 90 100 Z" fill="#18181b" opacity="0.6" />
                          </svg>
                        )}
                        {cardCategory === "healthcare" && (
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M 70 0 C 85 20 80 80 100 100 L 100 0 Z" fill="#10b981" opacity="0.1" />
                            <path d="M 50 85 L 60 85 L 63 70 L 66 95 L 69 80 L 72 87 L 85 87" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        {cardCategory === "real_estate" && (
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M 70 0 L 100 0 L 100 100 L 82 100 Z" fill="#0f172a" />
                            <path d="M 68 0 L 70 0 L 82 100 L 80 100 Z" fill="#ca8a04" />
                          </svg>
                        )}
                        {cardCategory === "education" && (
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M 0 0 Q 30 0 40 40 T 20 100 L 0 100 Z" fill="#0d9488" opacity="0.15" />
                            <path d="M 0 0 Q 35 0 45 45 T 25 100" fill="none" stroke="#0d9488" strokeWidth="1.5" opacity="0.3" />
                          </svg>
                        )}
                        {cardCategory === "finance" && (
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M 60 100 Q 80 40 100 70 L 100 100 Z" fill="#2563eb" opacity="0.15" />
                            <path d="M 50 100 Q 75 20 100 50" fill="none" stroke="#2563eb" strokeWidth="1.5" opacity="0.2" />
                          </svg>
                        )}
                        {cardCategory === "legal" && (
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <rect x="3" y="3" width="94" height="94" rx="2" fill="none" stroke="#d97706" strokeWidth="0.8" opacity="0.4" />
                            <rect x="5" y="5" width="90" height="90" rx="1" fill="none" stroke="#d97706" strokeWidth="0.3" opacity="0.3" />
                          </svg>
                        )}
                        {cardCategory === "photography" && (
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <circle cx="85" cy="50" r="30" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="4" />
                            <circle cx="85" cy="50" r="20" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="2" />
                            <line x1="55" y1="50" x2="115" y2="50" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />
                          </svg>
                        )}
                        {cardCategory === "beauty" && (
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M 0 70 Q 30 50 50 75 T 100 65 L 100 100 L 0 100 Z" fill="#fbcfe8" opacity="0.5" />
                            <path d="M 0 75 Q 30 55 50 80 T 100 70" fill="none" stroke="#ec4899" strokeWidth="1" opacity="0.3" />
                          </svg>
                        )}
                        {cardCategory === "restaurant" && (
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M 70 0 C 80 30 75 70 100 100 L 100 0 Z" fill="#ea580c" opacity="0.15" />
                            <circle cx="95" cy="50" r="25" fill="none" stroke="#ea580c" strokeWidth="1" opacity="0.2" />
                          </svg>
                        )}
                        {cardCategory === "fitness" && (
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M 75 0 L 85 0 L 65 100 L 55 100 Z" fill="#84cc16" opacity="0.3" />
                            <path d="M 85 0 L 95 0 L 75 100 L 65 100 Z" fill="#18181b" opacity="0.1" />
                          </svg>
                        )}
                      </div>

                      {/* Top Bar: Name & Title */}
                      <div className="flex justify-between items-start z-10">
                        <div className="flex flex-col">
                          <h4 className={`text-[3.5cqw] sm:text-base font-black tracking-tight uppercase leading-none truncate max-w-[45cqw] sm:max-w-[200px] ${style.textPrimary}`} title={cardName}>
                            {cardName || "Dharshan K"}
                          </h4>
                          <span className={`text-[1.8cqw] sm:text-[7.5px] font-bold tracking-wider uppercase mt-1 ${style.textSecondary}`}>
                            {cardTitle || "FOUNDER & LEAD ENGINEER"}
                          </span>
                        </div>
                        <span className={`text-[1.7cqw] sm:text-[7px] font-mono tracking-widest uppercase ${style.textSecondary}`}>Backside Layout</span>
                      </div>

                      {/* Middle Details Grid */}
                      <div className="flex gap-[2.5cqw] sm:gap-3 items-center z-10 my-1">
                        {/* Profile Image Frame */}
                        <div className={`h-[15cqw] w-[15cqw] sm:h-16 sm:w-16 rounded-full overflow-hidden border bg-white/5 flex-shrink-0 ${style.border}`}>
                          <img
                            src={profileUrl || defaultProfileDataUrl || "/user_photo.jpg"}
                            alt="Profile"
                            className="h-full w-full object-cover"
                          />
                        </div>

                        {/* Contact details */}
                        <div className={`flex-1 flex flex-col gap-[0.5cqw] sm:gap-1 text-[2.2cqw] sm:text-[9px] font-mono ${style.textSecondary}`}>
                          <span className="flex items-center gap-[1.5cqw] sm:gap-1.5 truncate max-w-[42cqw] sm:max-w-[200px]" title={cardPhone}>
                            <Phone className={`h-[2.5cqw] w-[2.5cqw] sm:h-2.5 sm:w-2.5 flex-shrink-0 ${style.accent}`} />
                            {cardPhone || "+91 98765 43210"}
                          </span>
                          <span className="flex items-center gap-[1.5cqw] sm:gap-1.5 truncate max-w-[42cqw] sm:max-w-[200px]" title={cardEmail}>
                            <Mail className={`h-[2.5cqw] w-[2.5cqw] sm:h-2.5 sm:w-2.5 flex-shrink-0 ${style.accent}`} />
                            {cardEmail || "orginxindia@gmail.com"}
                          </span>
                          <span className="flex items-center gap-[1.5cqw] sm:gap-1.5 truncate max-w-[42cqw] sm:max-w-[200px]" title={cardWebsite}>
                            <Globe className={`h-[2.5cqw] w-[2.5cqw] sm:h-2.5 sm:w-2.5 flex-shrink-0 ${style.accent}`} />
                            {cardWebsite || "www.orginx.com"}
                          </span>
                          <span className="flex items-center gap-[1.5cqw] sm:gap-1.5 truncate max-w-[42cqw] sm:max-w-[200px]" title={cardAddress}>
                            <MapPin className={`h-[2.5cqw] w-[2.5cqw] sm:h-2.5 sm:w-2.5 flex-shrink-0 ${style.accent}`} />
                            {cardAddress || "Bangalore, India"}
                          </span>
                        </div>

                        {/* Scan QR Code vCard container */}
                        <div 
                          onClick={(e) => {
                            e.stopPropagation(); // prevent card flip
                            setIsQrModalOpen(true);
                          }}
                          className="h-[15cqw] w-[15cqw] sm:h-16 sm:w-16 bg-white p-[0.5cqw] sm:p-0.5 rounded-lg border border-white/20 shadow-md flex-shrink-0 flex items-center justify-center cursor-zoom-in hover:scale-105 active:scale-95 transition-transform"
                          title="Click to expand and scan QR code"
                        >
                          {qrCodeDataUrl ? (
                            <img
                              src={qrCodeDataUrl}
                              alt="Scan Contact QR"
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <div className="h-full w-full bg-zinc-200 animate-pulse rounded-md" />
                          )}
                        </div>
                      </div>

                      <div className={`flex justify-between items-center z-10 pt-[1.5cqw] sm:pt-1.5 border-t ${style.border}`}>
                        <span className={`text-[1.8cqw] sm:text-[7px] font-mono tracking-wider ${style.textSecondary}`}>TAP WITH PHONE FOR CONTACT TRANSFERS</span>
                        <div className="flex items-center gap-[0.8cqw] sm:gap-1">
                          <span className="h-[1.5cqw] w-[1.5cqw] sm:h-1.5 sm:w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className={`text-[1.8cqw] sm:text-[7px] font-bold tracking-wider uppercase font-mono ${style.textSecondary}`}>Tap Active</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

                {/* Control Action buttons */}
                <div className="flex flex-wrap gap-3 mt-2">
                  <button
                    onClick={() => setCardFlipped(!cardFlipped)}
                    className="inline-flex items-center justify-center rounded-full border border-zinc-300 hover:border-zinc-800 bg-white text-zinc-800 hover:bg-zinc-50 px-5 py-2 text-xs font-bold transition-all font-sans cursor-pointer gap-1.5 shadow-sm"
                  >
                    <RefreshCw className="h-3 w-3 animate-[spin_8s_linear_infinite]" />
                    Flip Card
                  </button>

                  {/* Super Glossy Double-Outline Download Pill */}
                  <div className="rounded-full p-[1px] bg-[#cccccc] shadow-md w-max animate-pulse" style={{ animationDuration: "3s" }}>
                    <div className="rounded-full bg-black/90 p-[3px] flex items-center gap-1.5 border border-white/20">
                      <button
                        onClick={() => downloadCardSide("front")}
                        className="bg-accent hover:bg-accent/80 text-white rounded-full px-4 py-1.5 text-[10px] font-black transition-all whitespace-nowrap cursor-pointer hover:scale-[1.02] flex items-center gap-1 border border-white/10"
                      >
                        <Download className="h-3 w-3" />
                        Front PNG
                      </button>
                      <button
                        onClick={() => downloadCardSide("back")}
                        className="border border-white/20 hover:border-white/40 bg-[#151515] hover:bg-[#252525] text-white rounded-full px-4 py-1.5 text-[10px] font-bold transition-all whitespace-nowrap cursor-pointer hover:scale-[1.01] flex items-center gap-1"
                      >
                        <Download className="h-3 w-3" />
                        Back PNG
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-zinc-400 font-sans tracking-wide text-center">
                  * Note: Clicking the business card rotates it. Card templates generate high resolution PNG prints.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee Banner 1 */}
        <section className="bg-zinc-950 border-y border-border-custom py-8 overflow-hidden select-none">
          <div className="marquee-container w-full overflow-hidden flex">
            <div className="marquee-scroll text-4xl sm:text-5xl font-black uppercase tracking-wider text-white flex items-center gap-16 whitespace-nowrap">
              {[...Array(6)].map((_, i) => (
                <span key={i} className="flex items-center gap-16">
                  <span>Innovate</span>
                  <span className="text-accent">✦</span>
                  <span>Inspire</span>
                  <span className="text-accent-purple">✦</span>
                  <span>Create</span>
                  <span className="text-accent">✦</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid (Revamped to Interactive Bento Grid) */}
        <section id="services" className="border-t border-border-custom bg-background py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="label">Capabilities</span>
              <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl tracking-tight mt-2">
                Capabilities built for scale.
              </h2>
              <p className="mt-4 text-text-secondary text-sm">
                Explore our core technical offerings. Click on the buttons inside the cards to run simulations in real time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Bento Card 1: Custom Software Engineering */}
              <div className="bento-card md:col-span-2 overflow-hidden rounded-3xl border border-border-custom bg-card-bg-custom hover:bg-card-hover-custom p-8 flex flex-col justify-between transition-all hover:border-accent/40 relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  <div className="lg:col-span-6 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent border border-accent/20 mb-6">
                        <Code2 className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-accent">Engineering</span>
                      <h3 className="mt-2 font-extrabold text-2xl tracking-tight text-foreground">Custom Software Development</h3>
                      <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                        We build enterprise-grade systems, API integrations, and robust database architectures designed to support critical workflows.
                      </p>
                    </div>
                    
                    <div className="mt-6 flex flex-wrap gap-2 text-xs text-text-secondary">
                      <span className="px-3 py-1 rounded-full border border-border-custom bg-card-bg-custom">Go / Node.js</span>
                      <span className="px-3 py-1 rounded-full border border-border-custom bg-card-bg-custom">PostgreSQL</span>
                      <span className="px-3 py-1 rounded-full border border-border-custom bg-card-bg-custom">APIs</span>
                    </div>
                  </div>

                  {/* Widget Console */}
                  <div className="lg:col-span-6">
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-[10px] sm:text-xs text-zinc-100 shadow-2xl relative">
                      <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                        </div>
                        <span className="text-[9px] uppercase tracking-wider text-zinc-500">api_client.sh</span>
                      </div>

                      <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-400 font-bold">POST</span>
                          <span className="text-zinc-300 select-all text-[9px] sm:text-[11px] truncate">https://api.orginx.com/v1/auth</span>
                        </div>
                        <button
                          onClick={() => {
                            if (sandboxState === "idle") {
                              setSandboxState("loading");
                              setTimeout(() => setSandboxState("success"), 1200);
                            } else if (sandboxState === "success") {
                              setSandboxState("idle");
                            }
                          }}
                          disabled={sandboxState === "loading"}
                          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded-md text-[10px] font-bold transition-colors disabled:opacity-50 cursor-pointer"
                        >
                          {sandboxState === "loading" ? (
                            <RefreshCw className="h-2.5 w-2.5 animate-spin" />
                          ) : sandboxState === "success" ? (
                            <RotateCcw className="h-2.5 w-2.5" />
                          ) : (
                            <Play className="h-2.5 w-2.5 fill-white" />
                          )}
                          {sandboxState === "loading" ? "SENDING..." : sandboxState === "success" ? "RESET" : "RUN"}
                        </button>
                      </div>

                      <div className="h-28 rounded-lg bg-zinc-950/80 border border-zinc-800/50 p-3 overflow-y-auto scrollbar-thin">
                        {sandboxState === "idle" && (
                          <div className="text-zinc-400">
                            <span className="text-zinc-500">{"// Ready to test the authentication module"}</span><br />
                            <span className="text-blue-400">$</span> <span className="text-zinc-300">{"click run to dispatch the secure OAuth request..."}</span>
                          </div>
                        )}
                        {sandboxState === "loading" && (
                          <div className="text-zinc-400 animate-pulse">
                            <span className="text-blue-400">$</span> <span className="text-zinc-300">{'curl -X POST https://api.orginx.com/v1/auth -H "Authorization: Bearer ox_key..."'}</span><br />
                            <span className="text-amber-400">{"Connection established. Exchanging handshake tokens..."}</span>
                          </div>
                        )}
                        {sandboxState === "success" && (
                          <div>
                            <span className="text-zinc-500">{"// HTTP/2 200 OK - Latency: 24ms"}</span><br />
                            <span className="text-zinc-300">{"{"}</span><br />
                            <span className="pl-4 text-blue-400">{'"status"'}</span>: <span className="text-emerald-400">{'"success"'}</span>,<br />
                            <span className="pl-4 text-blue-400">{'"session"'}</span>: <span className="text-zinc-300">{"{"}</span><br />
                            <span className="pl-8 text-blue-400">{'"user_id"'}</span>: <span className="text-emerald-400">{'"ox_94a2"'}</span>,<br />
                            <span className="pl-8 text-blue-400">{'"scope"'}</span>: <span className="text-emerald-400">{'"read:admin_write"'}</span><br />
                            <span className="pl-4 text-zinc-300">{"}"}</span><br />
                            <span className="text-zinc-300">{"}"}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bento Card 2: SaaS Platforms */}
              <div className="bento-card md:col-span-1 overflow-hidden rounded-3xl border border-border-custom bg-card-bg-custom/30 p-8 flex flex-col justify-between transition-all hover:border-accent-purple/40 relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-purple/10 text-accent-purple border border-accent-purple/20 mb-6">
                    <Cloud className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-accent-purple">Cloud Infrastructure</span>
                  <h3 className="mt-2 font-extrabold text-2xl tracking-tight text-foreground">SaaS Solutions</h3>
                  <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                    Scalable multi-tenant products, stripe subscription billing engines, and metrics dashboards.
                  </p>
                </div>

                <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 relative z-10">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">SaaS Metrics</span>
                    <button
                      onClick={() => {
                        setSaasTrafficLevel((prev) => (prev === 3 ? 1 : prev + 1));
                      }}
                      className="text-[9px] bg-violet-500/20 text-violet-400 hover:bg-violet-500/30 px-2 py-0.5 rounded-full transition-colors cursor-pointer font-bold"
                    >
                      Scale Up +
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-center">
                      <span className="text-[9px] uppercase tracking-wider text-zinc-500">MRR</span>
                      <div className="text-sm font-black text-white mt-0.5 tracking-tight">
                        {saasTrafficLevel === 1 && "$182,400"}
                        {saasTrafficLevel === 2 && "$245,600"}
                        {saasTrafficLevel === 3 && "$312,900"}
                      </div>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-center">
                      <span className="text-[9px] uppercase tracking-wider text-zinc-500">Users</span>
                      <div className="text-sm font-black text-violet-400 mt-0.5 tracking-tight">
                        {saasTrafficLevel === 1 && "1,842"}
                        {saasTrafficLevel === 2 && "2,912"}
                        {saasTrafficLevel === 3 && "4,150"}
                      </div>
                    </div>
                  </div>

                  <div className="h-10 flex items-end gap-1.5 px-2">
                    {[0.4, 0.55, 0.5, 0.7, 0.65, 0.85, saasTrafficLevel === 1 ? 0.6 : saasTrafficLevel === 2 ? 0.8 : 0.98].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h * 100}%` }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                        className={`flex-1 rounded-t-sm ${i === 6 ? "bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.6)]" : "bg-violet-500/20"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Bento Card 3: Brand UX/Design */}
              <div className="bento-card md:col-span-1 overflow-hidden rounded-3xl border border-border-custom bg-card-bg-custom hover:bg-card-hover-custom p-8 flex flex-col justify-between transition-all hover:border-accent/40 relative group">
                <div className="absolute inset-0 bg-gradient-to-bl from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-accent/10 to-accent-purple/10 text-accent border border-accent/20 mb-6">
                    <Palette className="h-5 w-5 text-accent" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-gradient-to-r from-accent to-accent-purple bg-clip-text text-transparent">Identity</span>
                  <h3 className="mt-2 font-extrabold text-2xl tracking-tight text-foreground">Branding & UX Design</h3>
                  <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                    Figma-perfect interactive prototypes, structured brand guidelines, and unique styles.
                  </p>
                </div>

                <div className="mt-8 rounded-2xl border border-border-custom bg-black/40 p-4 relative z-10 flex flex-col items-center">
                  {/* Miniature Branding Card Widget */}
                  <div className={`w-full max-w-[220px] aspect-[1.6/1] p-3 transition-all duration-500 border border-white/10 flex flex-col justify-between shadow-lg relative overflow-hidden ${
                    activePalette === 0 ? "bg-zinc-900/90 rounded-xl" :
                    activePalette === 1 ? "bg-gradient-to-br from-pink-950/80 to-purple-950/80 rounded-none border-pink-500/20" :
                    activePalette === 2 ? "bg-black/90 rounded-2xl border-cyan-500/30" :
                    "bg-zinc-950/95 rounded-[30px] border-amber-500/20"
                  }`}>
                    {/* Background glow matching theme */}
                    <div className={`absolute -top-12 -right-12 w-24 h-24 rounded-full blur-2xl opacity-40 transition-colors duration-500 ${
                      activePalette === 0 ? "bg-[#0080ff]" :
                      activePalette === 1 ? "bg-[#ec4899]" :
                      activePalette === 2 ? "bg-[#06b6d4]" :
                      "bg-[#fbbf24]"
                    }`} />

                    <div className="flex justify-between items-center z-10">
                      {/* Logo Mark */}
                      <div className={`h-6 w-6 flex items-center justify-center font-black text-[10px] text-white transition-all duration-500 ${
                        activePalette === 0 ? "bg-[#0080ff] rounded-md" :
                        activePalette === 1 ? "bg-gradient-to-r from-pink-500 to-purple-500 rounded-none rotate-45" :
                        activePalette === 2 ? "bg-transparent border border-cyan-400 text-cyan-400 font-mono rounded-lg" :
                        "bg-[#fbbf24] text-black rounded-full"
                      }`}>
                        {activePalette === 0 && "OX"}
                        {activePalette === 1 && "O"}
                        {activePalette === 2 && "⚡"}
                        {activePalette === 3 && "★"}
                      </div>
                      <span className={`text-[8px] uppercase tracking-widest font-mono text-white/50`}>
                        {activePalette === 0 && "Agency"}
                        {activePalette === 1 && "Retro"}
                        {activePalette === 2 && "System"}
                        {activePalette === 3 && "Premium"}
                      </span>
                    </div>

                    <div className="z-10 mt-2">
                      <div className={`text-xs font-extrabold text-white tracking-tight leading-none ${
                        activePalette === 0 ? "font-sans" :
                        activePalette === 1 ? "font-serif italic" :
                        activePalette === 2 ? "font-mono text-cyan-400" :
                        "font-sans uppercase tracking-widest text-[#fbbf24]"
                      }`}>
                        {activePalette === 0 && "Creative Studio"}
                        {activePalette === 1 && "Neon Dreams"}
                        {activePalette === 2 && "quantum.code"}
                        {activePalette === 3 && "OBSIDIAN LABS"}
                      </div>
                      <div className="text-[7px] text-white/40 mt-1">
                        {activePalette === 0 && "Figma Prototyping System"}
                        {activePalette === 1 && "Synthesized Audio/Video UX"}
                        {activePalette === 2 && "Automated Node Compiler"}
                        {activePalette === 3 && "Bespoke Enterprise Design"}
                      </div>
                    </div>

                    {/* Color Swatches */}
                    <div className="flex gap-1 mt-2 z-10">
                      <div className={`h-2.5 w-2.5 rounded-full border border-white/10 ${
                        activePalette === 0 ? "bg-[#0080ff]" :
                        activePalette === 1 ? "bg-[#ec4899]" :
                        activePalette === 2 ? "bg-[#06b6d4]" :
                        "bg-[#fbbf24]"
                      }`} />
                      <div className={`h-2.5 w-2.5 rounded-full border border-white/10 ${
                        activePalette === 0 ? "bg-[#94a3b8]" :
                        activePalette === 1 ? "bg-[#8b5cf6]" :
                        activePalette === 2 ? "bg-[#10b981]" :
                        "bg-[#18181b]"
                      }`} />
                      <div className="h-2.5 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[5px] font-mono text-white/60">
                        {activePalette === 0 && "#0080ff"}
                        {activePalette === 1 && "#ec4899"}
                        {activePalette === 2 && "#06b6d4"}
                        {activePalette === 3 && "#fbbf24"}
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap justify-center gap-1 mt-4 w-full">
                    {["Classic", "Synthwave", "Cyberpunk", "Obsidian"].map((name, idx) => (
                      <button
                        key={name}
                        onClick={() => setActivePalette(idx)}
                        className={`h-5 px-2 rounded-full text-[8px] font-bold border tracking-wide uppercase transition-all cursor-pointer ${
                          activePalette === idx
                            ? "bg-foreground text-background border-foreground shadow-sm"
                            : "bg-transparent border-border-custom text-text-secondary hover:text-foreground"
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bento Card 4: Web & Mobile Development */}
              <div className="bento-card md:col-span-2 overflow-hidden rounded-3xl border border-border-custom bg-card-bg-custom hover:bg-card-hover-custom p-8 flex flex-col justify-between transition-all hover:border-accent/40 relative group">
                <div className="absolute inset-0 bg-gradient-to-tl from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  <div className="lg:col-span-6 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent border border-accent/20 mb-6">
                        <Globe className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-accent">Frontend Platforms</span>
                      <h3 className="mt-2 font-extrabold text-2xl tracking-tight text-foreground">Web & Mobile Development</h3>
                      <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                        High-performance web applications built in Next.js and fully native/cross-platform iOS & Android mobile apps.
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2 text-xs text-text-secondary">
                      <span className="px-3 py-1 rounded-full border border-border-custom bg-card-bg-custom">Next.js</span>
                      <span className="px-3 py-1 rounded-full border border-border-custom bg-card-bg-custom">React Native</span>
                      <span className="px-3 py-1 rounded-full border border-border-custom bg-card-bg-custom">GSAP Animations</span>
                    </div>
                  </div>

                  {/* Widget Frame */}
                  <div className="lg:col-span-6">
                    <div className="rounded-2xl border border-border-custom bg-black/40 p-4 shadow-2xl">
                      <div className="flex justify-between items-center mb-3 pb-2 border-b border-border-custom">
                        <span className="text-[10px] uppercase font-bold text-text-secondary">App Simulator</span>
                        
                        <div className="flex gap-2">
                          {mockDeployState === "live" && (
                            <>
                              <button
                                onClick={() => setMockTheme((t) => (t === "dark" ? "light" : "dark"))}
                                className="p-1 rounded-lg border border-border-custom hover:bg-card-bg-custom transition-all text-text-secondary hover:text-foreground cursor-pointer"
                                title="Toggle Theme"
                              >
                                {mockTheme === "dark" ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
                              </button>
                              <button
                                onClick={() => setMockView((v) => (v === "grid" ? "list" : "grid"))}
                                className="p-1 rounded-lg border border-border-custom hover:bg-card-bg-custom transition-all text-text-secondary hover:text-foreground cursor-pointer"
                                title="Toggle Layout"
                              >
                                {mockView === "grid" ? <LayoutList className="h-3.5 w-3.5" /> : <LayoutGrid className="h-3.5 w-3.5" />}
                              </button>
                            </>
                          )}
                          <button
                            onClick={handleMockDeploy}
                            disabled={mockDeployState === "compiling"}
                            className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase transition-all cursor-pointer ${
                              mockDeployState === "live"
                                ? "bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 border border-rose-500/30"
                                : mockDeployState === "compiling"
                                ? "bg-amber-500/20 text-amber-400 border border-amber-500/20 cursor-wait"
                                : "bg-accent/20 text-accent hover:bg-accent/30 border border-accent/30"
                            }`}
                          >
                            {mockDeployState === "live" ? "Stop" : mockDeployState === "compiling" ? `Compiling...` : "Deploy"}
                          </button>
                        </div>
                      </div>

                      <div className={`rounded-xl p-3 border border-border-custom transition-all duration-300 min-h-[160px] flex flex-col justify-between ${
                        mockDeployState === "live"
                          ? (mockTheme === "dark" ? "bg-zinc-950 text-slate-100" : "bg-white text-zinc-900")
                          : "bg-black text-emerald-400 font-mono text-[9px] sm:text-[10px]"
                      }`}>
                        
                        {mockDeployState === "idle" && (
                          <div className="flex flex-col items-center justify-center h-full py-4 text-center">
                            <Code2 className="h-8 w-8 text-zinc-600 mb-2 animate-pulse" />
                            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Simulator Inactive</div>
                            <p className="text-[9px] text-zinc-500 max-w-[180px] mt-1 font-sans">
                              Click the <span className="text-accent font-extrabold font-mono">Deploy</span> button at the top to build the Next.js app environment.
                            </p>
                          </div>
                        )}

                        {mockDeployState === "compiling" && (
                          <div className="flex flex-col justify-between h-full py-2">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 text-zinc-500">
                                <span className="text-amber-500 animate-pulse">●</span>
                                <span>building static routes...</span>
                              </div>
                              <div className="pl-3 text-zinc-400 select-none">
                                {mockProgress >= 20 && <div>✓ Compiled index.tsx</div>}
                                {mockProgress >= 40 && <div>✓ Verified TS type definitions</div>}
                                {mockProgress >= 60 && <div>✓ Bundled client components</div>}
                                {mockProgress >= 80 && <div>✓ Hydrating layout node elements</div>}
                                {mockProgress >= 100 && <div>✓ Server ready at localhost:3000</div>}
                              </div>
                            </div>
                            
                            <div className="mt-3">
                              <div className="flex justify-between items-center text-[8px] text-zinc-400 mb-1 font-sans">
                                <span>Compiling Project Bundle</span>
                                <span className="font-bold">{mockProgress}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-accent"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${mockProgress}%` }}
                                  transition={{ duration: 0.2 }}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {mockDeployState === "live" && (
                          <div className="h-full flex flex-col justify-between">
                            {/* Device status line */}
                            <div className="flex items-center justify-between pb-1.5 border-b border-zinc-200/20 mb-2">
                              <div className="flex items-center gap-1.5">
                                <div className="h-3 w-3 rounded-full bg-accent flex items-center justify-center text-[6px] text-white font-black">
                                  OX
                                </div>
                                <span className={`text-[8px] font-extrabold uppercase tracking-widest ${mockTheme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>
                                  Live Dashboard
                                </span>
                              </div>
                              <span className="text-[7px] text-emerald-500 font-bold tracking-wider animate-pulse flex items-center gap-1">
                                <span className="h-1 w-1 rounded-full bg-emerald-500" /> ONLINE
                              </span>
                            </div>

                            {/* Main Content Area */}
                            <div className="flex-1 flex flex-col justify-center">
                              {mockView === "grid" ? (
                                <div className="grid grid-cols-2 gap-2">
                                  {/* Metric Box 1 */}
                                  <div className={`rounded-lg p-2 border ${
                                    mockTheme === "dark" ? "bg-zinc-900 border-zinc-800/80" : "bg-zinc-50 border-zinc-200"
                                  }`}>
                                    <div className={`text-[7px] uppercase tracking-wider ${mockTheme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>Conversions</div>
                                    <div className="text-xs font-black tracking-tight mt-0.5">+18.4%</div>
                                    <div className="h-1 w-full bg-accent/25 rounded-full mt-1.5 overflow-hidden">
                                      <div className="h-full bg-accent w-[75%]" />
                                    </div>
                                  </div>
                                  {/* Metric Box 2 */}
                                  <div className={`rounded-lg p-2 border ${
                                    mockTheme === "dark" ? "bg-zinc-900 border-zinc-800/80" : "bg-zinc-50 border-zinc-200"
                                  }`}>
                                    <div className={`text-[7px] uppercase tracking-wider ${mockTheme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>App Speed</div>
                                    <div className="text-xs font-black tracking-tight mt-0.5 text-accent">98%</div>
                                    <div className="h-1 w-full bg-accent/25 rounded-full mt-1.5 overflow-hidden">
                                      <div className="h-full bg-accent w-[98%]" />
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex flex-col gap-1.5">
                                  {/* List Item 1 */}
                                  <div className={`rounded-lg p-1.5 border flex items-center justify-between ${
                                    mockTheme === "dark" ? "bg-zinc-900 border-zinc-800/80" : "bg-zinc-50 border-zinc-200"
                                  }`}>
                                    <div className="flex items-center gap-1.5">
                                      <div className="h-3.5 w-3.5 rounded-full bg-accent/20 flex items-center justify-center">
                                        <Globe className="h-2 w-2 text-accent" />
                                      </div>
                                      <span className="text-[8px] font-bold">domain_registry.bin</span>
                                    </div>
                                    <span className={`text-[8px] font-mono ${mockTheme === "dark" ? "text-emerald-400" : "text-emerald-600"}`}>ACTIVE</span>
                                  </div>
                                  {/* List Item 2 */}
                                  <div className={`rounded-lg p-1.5 border flex items-center justify-between ${
                                    mockTheme === "dark" ? "bg-zinc-900 border-zinc-800/80" : "bg-zinc-50 border-zinc-200"
                                  }`}>
                                    <div className="flex items-center gap-1.5">
                                      <div className="h-3.5 w-3.5 rounded-full bg-purple-500/20 flex items-center justify-center">
                                        <Settings className={`h-2.5 w-2.5 ${mockTheme === "dark" ? "text-purple-400" : "text-purple-600"}`} />
                                      </div>
                                      <span className="text-[8px] font-bold">api_listener.sh</span>
                                    </div>
                                    <span className={`text-[8px] font-mono ${mockTheme === "dark" ? "text-emerald-400" : "text-emerald-600"}`}>ACTIVE</span>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            {/* SVG mini chart (Sparkline) */}
                            <div className="mt-2 pt-1.5 border-t border-zinc-200/20 flex items-center justify-between gap-3">
                              <span className={`text-[6px] uppercase tracking-widest font-mono ${mockTheme === "dark" ? "text-zinc-500 font-bold" : "text-zinc-600 font-bold"}`}>Performance Node</span>
                              <svg className="w-20 h-4 overflow-visible" viewBox="0 0 100 20">
                                <defs>
                                  <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                                  </linearGradient>
                                </defs>
                                <path
                                  d="M0,15 Q15,5 30,12 T60,4 T90,14 L100,10 L100,20 L0,20 Z"
                                  fill="url(#chartGlow)"
                                />
                                <path
                                  d="M0,15 Q15,5 30,12 T60,4 T90,14 L100,10"
                                  fill="none"
                                  stroke="var(--accent)"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bento Card 5: Business Automation */}
              <div className="bento-card md:col-span-2 overflow-hidden rounded-3xl border border-border-custom bg-card-bg-custom hover:bg-card-hover-custom p-8 flex flex-col justify-between transition-all hover:border-accent/40 relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  <div className="lg:col-span-6 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent border border-accent/20 mb-6">
                        <Settings className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-accent">AI & Efficiency</span>
                      <h3 className="mt-2 font-extrabold text-2xl tracking-tight text-foreground">Business Automation</h3>
                      <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                        Cut operating costs. Integrate LLM classifiers, data crawlers, and event triggers to sync systems instantly.
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2 text-xs text-text-secondary">
                      <span className="px-3 py-1 rounded-full border border-border-custom bg-card-bg-custom">AI Models</span>
                      <span className="px-3 py-1 rounded-full border border-border-custom bg-card-bg-custom">Webhooks</span>
                      <span className="px-3 py-1 rounded-full border border-border-custom bg-card-bg-custom">Workflows</span>
                    </div>
                  </div>

                  {/* Widget Node Webhook */}
                  <div className="lg:col-span-6">
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 shadow-2xl relative">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Automation Simulator</span>
                        <button
                          onClick={() => {
                            if (flowActiveStep === 0 || flowActiveStep === 3) {
                              setFlowActiveStep(1);
                              setTimeout(() => setFlowActiveStep(2), 1000);
                              setTimeout(() => setFlowActiveStep(3), 2000);
                            }
                          }}
                          disabled={flowActiveStep === 1 || flowActiveStep === 2}
                          className="text-[9px] bg-accent/20 hover:bg-accent/30 text-accent px-2 py-0.5 rounded-full border border-accent/30 transition-all font-bold cursor-pointer disabled:opacity-60"
                        >
                          {flowActiveStep === 0 && "TRIGGER SIMULATION"}
                          {flowActiveStep === 1 && "RECEIVING..."}
                          {flowActiveStep === 2 && "GPT CLASSIFY..."}
                          {flowActiveStep === 3 && "SUCCESS ✔"}
                        </button>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3 relative">
                        <div className="absolute left-[30px] right-[30px] top-1/2 -translate-y-1/2 h-0.5 bg-zinc-800 hidden sm:block z-0" />
                        <div className="absolute top-[30px] bottom-[30px] left-1/2 -translate-x-1/2 w-0.5 bg-zinc-800 sm:hidden block z-0" />
                        
                        {/* Node 1 */}
                        <div className={`relative z-10 flex flex-col items-center gap-1 p-2 rounded-xl border transition-all duration-300 w-24 text-center ${
                          flowActiveStep >= 1 ? "bg-accent/15 border-accent/40 text-accent font-bold" : "bg-zinc-900 border-zinc-800 text-zinc-500"
                        }`}>
                          <Megaphone className="h-4 w-4" />
                          <span className="text-[7px] font-bold uppercase tracking-wider">Lead Submitted</span>
                          {flowActiveStep >= 1 && <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-accent text-white rounded-full text-[8px] flex items-center justify-center font-bold">✔</span>}
                        </div>

                        {/* Node 2 */}
                        <div className={`relative z-10 flex flex-col items-center gap-1 p-2 rounded-xl border transition-all duration-300 w-24 text-center ${
                          flowActiveStep >= 2 ? "bg-accent/25 border-accent/60 text-accent font-bold animate-pulse" : "bg-zinc-900 border-zinc-800 text-zinc-500"
                        }`}>
                          <Sparkles className="h-4 w-4" />
                          <span className="text-[7px] font-bold uppercase tracking-wider">GPT Classifier</span>
                          {flowActiveStep >= 2 && <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-accent text-white rounded-full text-[8px] flex items-center justify-center font-bold">✔</span>}
                        </div>

                        {/* Node 3 */}
                        <div className={`relative z-10 flex flex-col items-center gap-1 p-2 rounded-xl border transition-all duration-300 w-24 text-center ${
                          flowActiveStep >= 3 ? "bg-accent/15 border-accent/40 text-accent font-bold" : "bg-zinc-900 border-zinc-800 text-zinc-500"
                        }`}>
                          <Database className="h-4 w-4" />
                          <span className="text-[7px] font-bold uppercase tracking-wider">CRM Synced</span>
                          {flowActiveStep >= 3 && <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-accent text-white rounded-full text-[8px] flex items-center justify-center font-bold">✔</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bento Card 6: SEO & Marketing */}
              <div className="bento-card md:col-span-1 overflow-hidden rounded-3xl border border-border-custom bg-card-bg-custom hover:bg-card-hover-custom p-8 flex flex-col justify-between transition-all hover:border-accent/40 relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent border border-accent/20 mb-6">
                    <Search className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-accent">Discovery</span>
                  <h3 className="mt-2 font-extrabold text-2xl tracking-tight text-foreground">SEO & Marketing</h3>
                  <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                    Rank first on Google. Structured technical parameters and data conversion strategies.
                  </p>
                </div>

                {/* Search Rank Booster Widget */}
                <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 relative z-10">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Rankings</span>
                    <button
                      onClick={() => setSeoOptimized(!seoOptimized)}
                      className="text-[9px] bg-accent/20 text-accent px-2 py-0.5 rounded-full hover:bg-accent/30 transition-colors cursor-pointer font-bold"
                    >
                      {seoOptimized ? "Reset" : "Optimize"}
                    </button>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-1.5 flex items-center gap-1.5 text-[9px] text-zinc-300 mb-3">
                    <Search className="h-3.5 w-3.5 text-zinc-400" />
                    <span className="truncate font-mono">best custom tech agency</span>
                  </div>

                  <div className="flex flex-col gap-1.5 text-[9px]">
                    <motion.div
                      layout
                      className={`p-1.5 rounded-lg border flex items-center justify-between transition-colors duration-300 ${
                        seoOptimized ? "bg-accent/15 border-accent/40 text-accent font-bold" : "bg-zinc-900 border-zinc-800 text-zinc-400"
                      }`}
                    >
                      <span>1. OrginX Agency</span>
                      {seoOptimized ? (
                        <span className="text-[7px] bg-accent text-white px-1.5 py-0.5 rounded font-black">#1 RANKING</span>
                      ) : (
                        <span>3rd Position</span>
                      )}
                    </motion.div>

                    <motion.div
                      layout
                      className={`p-1.5 rounded-lg border bg-zinc-900 border-zinc-800/80 text-zinc-500 flex items-center justify-between transition-colors duration-300 ${
                        seoOptimized ? "order-2" : "order-none"
                      }`}
                    >
                      <span>2. Competitor A</span>
                      <span>1st Position</span>
                    </motion.div>

                    <motion.div
                      layout
                      className={`p-1.5 rounded-lg border bg-zinc-900 border-zinc-800/80 text-zinc-500 flex items-center justify-between transition-colors duration-300 ${
                        seoOptimized ? "order-3" : "order-none"
                      }`}
                    >
                      <span>3. Competitor B</span>
                      <span>2nd Position</span>
                    </motion.div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Why Us Horizontal Scroll */}
        <section ref={whyUsRef} id="process" className="border-t border-border-custom bg-background/50 relative w-full overflow-hidden">
          <div className="relative w-full h-auto py-16 md:py-0 md:h-screen flex flex-col justify-center overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-xl">
                <span className="label">Why Choose Us</span>
                <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl tracking-tight mt-2">
                  The OrginX Standard.
                </h2>
                <p className="mt-4 text-text-secondary text-sm">
                  {isMobile ? "Explore our core engineering principles." : "Scroll down to navigate through our core engineering principles."}
                </p>
              </div>
            </div>

            <div className="mt-12 w-full">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div 
                  ref={scrollContainerRef} 
                  className="flex overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none gap-6 w-full pb-6 scrollbar-none md:w-max"
                >
                  {/* Card 1 */}
                  <div className="glow-card active w-[280px] sm:w-[320px] rounded-2xl border border-border-custom bg-card-bg-custom/80 backdrop-blur p-8 snap-center flex-shrink-0">
                    <div className="text-3xl font-bold text-accent">01</div>
                    <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Shield className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 font-bold text-xl">Security First</h3>
                    <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                      Compliance, secure credential management, encrypted databases, and auth integrations.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="glow-card active w-[280px] sm:w-[320px] rounded-2xl border border-border-custom bg-card-bg-custom/80 backdrop-blur p-8 snap-center flex-shrink-0">
                    <div className="text-3xl font-bold text-accent">02</div>
                    <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Zap className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 font-bold text-xl">High Performance</h3>
                    <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                      Optimum load speeds, micro-interactions, Core Web Vitals audit compliance.
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="glow-card active w-[280px] sm:w-[320px] rounded-2xl border border-border-custom bg-card-bg-custom/80 backdrop-blur p-8 snap-center flex-shrink-0">
                    <div className="text-3xl font-bold text-accent">03</div>
                    <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Users className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 font-bold text-xl">Co-Founder Mindset</h3>
                    <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                      We embed our technical engineers within your team to design appropriate product options.
                    </p>
                  </div>

                  {/* Card 4 */}
                  <div className="glow-card active w-[280px] sm:w-[320px] rounded-2xl border border-border-custom bg-card-bg-custom/80 backdrop-blur p-8 snap-center flex-shrink-0">
                    <div className="text-3xl font-bold text-accent">04</div>
                    <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 font-bold text-xl">Scalable Architecture</h3>
                    <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                      Designed to grow from early user tests up to millions of requests without code refactoring.
                    </p>
                  </div>

                  {/* Card 5 */}
                  <div className="glow-card active w-[280px] sm:w-[320px] rounded-2xl border border-border-custom bg-card-bg-custom/80 backdrop-blur p-8 snap-center flex-shrink-0">
                    <div className="text-3xl font-bold text-accent">05</div>
                    <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Clock className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 font-bold text-xl">Rapid Delivery</h3>
                    <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                      Incremental sprints, continuous deployment pipelines, and active developer feedback loops to launch in weeks.
                    </p>
                  </div>

                  {/* Card 6 */}
                  <div className="glow-card active w-[280px] sm:w-[320px] rounded-2xl border border-border-custom bg-card-bg-custom/80 backdrop-blur p-8 snap-center flex-shrink-0">
                    <div className="text-3xl font-bold text-accent">06</div>
                    <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <HeartHandshake className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 font-bold text-xl">Dedicated Support</h3>
                    <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                      Post-launch security patches, SLA maintenance guarantees, server load auto-scaling, and constant growth audits.
                    </p>
                  </div>

                  {/* Card 7 */}
                  <div className="glow-card active w-[280px] sm:w-[320px] rounded-2xl border border-border-custom bg-card-bg-custom/80 backdrop-blur p-8 snap-center flex-shrink-0">
                    <div className="text-3xl font-bold text-accent">07</div>
                    <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Globe className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 font-bold text-xl">Global Scalability</h3>
                    <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                      Deploy systems globally with multi-region database replication, low-latency CDN routing, and localization readiness.
                    </p>
                  </div>

                  {/* Card 8 */}
                  <div className="glow-card active w-[280px] sm:w-[320px] rounded-2xl border border-border-custom bg-card-bg-custom/80 backdrop-blur p-8 snap-center flex-shrink-0">
                    <div className="text-3xl font-bold text-accent">08</div>
                    <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 font-bold text-xl">Modern UI/UX</h3>
                    <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                      Stunning custom design language, subtle micro-animations, and interactive layouts that maximize engagement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee Banner 2 */}
        <section className="bg-zinc-950 border-y border-border-custom py-8 overflow-hidden select-none">
          <div className="marquee-container w-full overflow-hidden flex">
            <div className="marquee-scroll text-lg sm:text-xl font-bold uppercase tracking-widest text-white/50 flex items-center gap-12 whitespace-nowrap" style={{ animationDirection: "reverse" }}>
              {[...Array(6)].map((_, i) => (
                <span key={i} className="flex items-center gap-12">
                  <span>UX/UI Design</span>
                  <span className="text-accent">✦</span>
                  <span>SaaS Development</span>
                  <span className="text-accent">✦</span>
                  <span>Brand Strategy</span>
                  <span className="text-accent">✦</span>
                  <span>SEO Authority</span>
                  <span className="text-accent">✦</span>
                  <span>Mobile Applications</span>
                  <span className="text-accent">✦</span>
                  <span>Custom API Integrations</span>
                  <span className="text-accent">✦</span>
                </span>
              ))}
            </div>
          </div>
        </section>



        {/* Testimonials / Reviews */}
        <section id="reviews" className="border-t border-border-custom bg-background py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="label text-accent font-bold tracking-widest uppercase text-xs bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">Reviews</span>
              <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl tracking-tight mt-4">
                What Our Clients Say
              </h2>
              <p className="mt-4 text-text-secondary text-sm">
                Feedback from founders and digital directors of platforms we help scale.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "OrginX transformed our complex legacy dashboard into a beautiful, lightning-fast application. Our MRR increased by 45% within months of launching.",
                  author: "Alexander Reed",
                  title: "CEO, CloudFlow",
                  stars: 5
                },
                {
                  quote: "The speed of implementation and the level of technical depth was exceptional. It felt like they were true co-founders rather than an external agency.",
                  author: "Sarah Chen",
                  title: "CTO, DataPulse",
                  stars: 5
                },
                {
                  quote: "Their focus on technical SEO audit parameters and Next.js optimization landed us on the first page of search results for our target queries.",
                  author: "Marcus Brody",
                  title: "Director of Product, SwiftPay",
                  stars: 5
                }
              ].map((rev, i) => (
                <div
                  key={i}
                  className="rounded-3xl border border-border-custom bg-card-bg-custom/20 hover:bg-card-bg-custom/40 p-8 flex flex-col justify-between transition-all hover:border-accent/25"
                >
                  <div className="flex flex-col gap-4">
                    {/* Stars */}
                    <div className="flex gap-1 text-accent">
                      {[...Array(rev.stars)].map((_, idx) => (
                        <svg key={idx} viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                        </svg>
                      ))}
                    </div>
                    
                    <p className="text-sm sm:text-base text-text-secondary leading-relaxed italic">
                      &ldquo;{rev.quote}&rdquo;
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-border-custom/50 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-foreground">{rev.author}</h4>
                      <p className="text-[10px] text-text-secondary mt-0.5">{rev.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Get in Touch Today */}
        <section id="contact" className="border-t border-border-custom bg-background py-24 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent/5 filter blur-[120px] pointer-events-none z-0" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Form Block */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div>
                  <span className="label text-accent font-bold tracking-widest uppercase text-xs bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">Get in Touch Today!</span>
                  <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl tracking-tight mt-4 leading-tight">
                    Let&apos;s Build Your Next Masterpiece.
                  </h2>
                  <p className="mt-3 text-text-secondary text-sm">
                    Have an idea or a project timeline in mind? Reach out and we&apos;ll schedule a scoping call within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-text-secondary">Name *</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="John Doe"
                        className="rounded-xl border border-border-custom bg-card-bg-custom/50 p-3.5 text-sm outline-none focus:border-accent transition-colors text-foreground"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-text-secondary">Email *</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="john@company.com"
                        className="rounded-xl border border-border-custom bg-card-bg-custom/50 p-3.5 text-sm outline-none focus:border-accent transition-colors text-foreground"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-text-secondary">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="+91 83001 78022"
                        className="rounded-xl border border-border-custom bg-card-bg-custom/50 p-3.5 text-sm outline-none focus:border-accent transition-colors text-foreground"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-text-secondary">Need of Services *</label>
                      <select
                        required
                        value={formState.service}
                        onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                        className="rounded-xl border border-border-custom bg-card-bg-custom/50 p-3.5 text-sm outline-none focus:border-accent transition-colors text-foreground appearance-none cursor-pointer bg-no-repeat bg-[right_1rem_center]"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23888888'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3e%3c/svg%3e")`,
                          backgroundSize: '1.25rem'
                        }}
                      >
                        <option value="" disabled className="bg-card-bg-custom text-zinc-400">Select a Service...</option>
                        <option value="Custom Software Development" className="bg-card-bg-custom text-foreground">Custom Software Development</option>
                        <option value="Website Development" className="bg-card-bg-custom text-foreground">Website Development</option>
                        <option value="Mobile App Development" className="bg-card-bg-custom text-foreground">Mobile App Development</option>
                        <option value="SaaS Solutions" className="bg-card-bg-custom text-foreground">SaaS Solutions</option>
                        <option value="Digital Transformation" className="bg-card-bg-custom text-foreground">Digital Transformation</option>
                        <option value="Business Automation" className="bg-card-bg-custom text-foreground">Business Automation</option>
                        <option value="Branding & Creative Design" className="bg-card-bg-custom text-foreground">Branding & Creative Design</option>
                        <option value="SEO Optimization" className="bg-card-bg-custom text-foreground">SEO Optimization</option>
                        <option value="Digital Marketing" className="bg-card-bg-custom text-foreground">Digital Marketing</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-text-secondary">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Briefly describe your targets or timeline..."
                      className="rounded-xl border border-border-custom bg-card-bg-custom/50 p-3.5 text-sm outline-none focus:border-accent transition-colors resize-none text-foreground"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus !== "idle"}
                    className="mt-2 flex h-12 items-center justify-center gap-2 rounded-xl bg-accent text-sm font-bold text-black shadow-lg hover:bg-accent-purple transition-all cursor-pointer disabled:opacity-75"
                  >
                    {formStatus === "idle" && (
                      <>
                        <span>Send Message</span>
                        <ChevronRight className="h-4 w-4" />
                      </>
                    )}
                    {formStatus === "sending" && "Sending Message..."}
                    {formStatus === "success" && "Message Sent Successfully!"}
                    {formStatus === "error" && "Error sending, please try again."}
                  </button>
                </form>
              </div>

              {/* Special Offer Flyer Block */}
              <div className="lg:col-span-5 flex justify-center items-center">
                <div className="relative w-full max-w-md rounded-3xl overflow-hidden bg-gradient-to-tr from-accent/20 to-accent-purple/10 border border-accent/20 shadow-[0_24px_50px_rgba(0,0,0,0.35)] hover:border-accent/40 transition-colors duration-500 group">
                  <img
                    src="/special_offer.jpg"
                    alt="OrginX Special Offer - 50% OFF"
                    className="w-full h-auto object-cover transform group-hover:scale-[1.03] transition-transform duration-500"
                    draggable="false"
                  />
                  {/* Subtle inner overlay sheen */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                </div>
              </div>

            </div>
          </div>
        </section>

        <Footer />
      </div>
      <WhatsAppWidget />

      {/* QR Code Zoom Modal */}
      {isQrModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setIsQrModalOpen(false)}
        >
          <div 
            className="bg-white text-zinc-950 rounded-3xl p-8 max-w-sm w-full flex flex-col items-center shadow-2xl relative border border-zinc-200/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 cursor-pointer p-1 rounded-full hover:bg-zinc-100 transition-colors"
              onClick={() => setIsQrModalOpen(false)}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Icon */}
            <div className="mb-4 bg-blue-50 text-blue-600 p-3 rounded-2xl">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>

            <h3 className="text-lg font-black text-center mb-1">Scan to Save Contact</h3>
            <p className="text-xs text-zinc-500 text-center mb-6 font-sans">
              Use your phone&apos;s camera or a QR scanner to quickly sync contact details.
            </p>

            {/* Large QR Code Wrapper */}
            <div className="bg-white p-3 rounded-2xl border border-zinc-100 shadow-inner mb-6">
              {qrCodeDataUrl ? (
                <img 
                  src={qrCodeDataUrl} 
                  alt="Scan Contact QR Code" 
                  className="w-56 h-56 object-contain"
                />
              ) : (
                <div className="w-56 h-56 bg-zinc-200 animate-pulse rounded-xl" />
              )}
            </div>

            {/* Contact Preview Summary */}
            <div className="w-full bg-zinc-50 rounded-2xl p-4 border border-zinc-100 text-xs flex flex-col gap-2 font-sans">
              <div className="flex justify-between border-b border-zinc-200/50 pb-1.5">
                <span className="text-zinc-400">Name:</span>
                <span className="font-semibold text-zinc-800">{cardName || "Dharshan K"}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200/50 pb-1.5">
                <span className="text-zinc-400">Company:</span>
                <span className="font-semibold text-zinc-800">{cardBusinessName || "OrginX"}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200/50 pb-1.5">
                <span className="text-zinc-400">Email:</span>
                <span className="font-semibold text-zinc-800 truncate max-w-[180px]">{cardEmail || "orginxindia@gmail.com"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Address:</span>
                <span className="font-semibold text-zinc-800 truncate max-w-[180px]">{cardAddress || "Bangalore, India"}</span>
              </div>
            </div>

            <button 
              className="mt-6 w-full bg-zinc-950 hover:bg-zinc-800 text-white rounded-full py-2.5 text-xs font-bold transition-colors cursor-pointer"
              onClick={() => setIsQrModalOpen(false)}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </>
  );
}
