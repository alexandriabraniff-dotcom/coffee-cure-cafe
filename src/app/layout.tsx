import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Coffee Cure Cafe | Largs North, Adelaide",
  description:
    "Specialty coffee, fresh breakfast and lunch, house-made treats. Visit us at Shop 2/595a Military Rd, Largs North SA 5016.",
  keywords: ["coffee", "cafe", "Largs North", "Adelaide", "breakfast", "brunch", "specialty coffee"],
  openGraph: {
    title: "Coffee Cure Cafe | Largs North, Adelaide",
    description: "Specialty coffee, fresh breakfast and lunch, house-made treats.",
    type: "website",
    locale: "en_AU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <body className="min-h-screen flex flex-col bg-[var(--cream)] text-[var(--warm-gray)] antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
