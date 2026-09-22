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
  title: "Bhavya Sri | VLSI Physical Design (PD) & RTL Engineer",
  description:
    "Portfolio of Bhavya Sri, VLSI Physical Design & RTL Engineer specializing in RTL design, logic synthesis, floorplanning, CTS, routing, and physical verification using industry EDA tools.",
  keywords: [
    "Bhavya Sri",
    "VLSI Engineer",
    "Physical Design",
    "RTL Engineer",
    "Verilog",
    "SystemVerilog",
    "Cadence Innovus",
    "Xilinx Vivado",
    "ASIC Design",
    "FPGA",
    "CTS",
    "STA",
    "RTL to GDSII",
  ],
  authors: [{ name: "Bhavya Sri" }],
  openGraph: {
    title: "Bhavya Sri | VLSI Physical Design & RTL Engineer",
    description:
      "Physical Design Trainee @ ChipXpert | Specializing in RTL-to-GDSII workflows, logic synthesis, CTS, routing, and physical verification.",
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
