import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tummalapenta Bhavya Sri | VLSI Physical Design (PD) Engineer",
  description:
    "Portfolio of Tummalapenta Bhavya Sri, VLSI Physical Design (PD) Engineer specializing in physical implementation, floorplanning, CTS, routing, STA timing closure, and DRC/LVS physical verification using Cadence Innovus.",
  keywords: [
    "Tummalapenta Bhavya Sri",
    "Bhavya Sri",
    "Physical Design Engineer",
    "VLSI Engineer",
    "Floorplanning",
    "CTS",
    "Static Timing Analysis",
    "STA",
    "Cadence Innovus",
    "Place and Route",
    "DRC LVS",
    "RTL to GDSII",
  ],
  authors: [{ name: "Tummalapenta Bhavya Sri" }],
  openGraph: {
    title: "Tummalapenta Bhavya Sri | VLSI Physical Design (PD) Engineer",
    description:
      "Physical Design Trainee @ ChipXpert | Specializing in physical implementation, floorplanning, CTS, routing, STA timing closure, and physical verification.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-background text-foreground antialiased selection:bg-cyan-500/30 selection:text-cyan-200`}
      >
        {children}
      </body>
    </html>
  );
}
