import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "OrginX — Ultra-Premium Technology Hub | Software, Apps, SaaS",
  description: "OrginX is a futuristic, design-focused technology agency building enterprise software, high-performance web products, mobile applications, and digital marketing strategies.",
  keywords: "custom software, web design, mobile apps, SaaS, digital transformation, next.js, gsap, react, framer motion, tech agency, OrginX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light scroll-smooth">
      <head>
        {/* Load Mainframe Fonts */}
        <link href="https://db.onlinewebfonts.com/c/5ac3fe7c6abd2f62067f266d89671492?family=HelveticaNowDisplay-Medium" rel="stylesheet" type="text/css" />
        <link href="https://db.onlinewebfonts.com/c/1aa3377e489837a26d019bba501e779d?family=HelveticaNowDisplayW01-Rg" rel="stylesheet" type="text/css" />
      </head>
      <body className={`${plusJakarta.variable} font-sans bg-background text-foreground antialiased min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
