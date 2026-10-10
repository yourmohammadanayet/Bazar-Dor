import { Noto_Sans_Bengali } from "next/font/google";
import Navbar from "@/components/layout/NavbarBoundary";
import PriceTicker from "@/components/layout/PriceTicker";
import Footer from "@/components/layout/Footer";
import ToastProvider from "@/components/auth/ToastProvider";
import "./globals.css";

const bengaliFont = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bengali",
  display: "swap",
});

export const metadata = {
  title: {
    default: "বাজার দর | নিত্যপ্রয়োজনীয় পণ্যের দাম",
    template: "%s | বাজার দর",
  },
  description:
    "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম ও বাজারভিত্তিক মূল্য জানুন এক নজরে।",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      className={bengaliFont.variable}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <PriceTicker />
        <div className="flex-1">{children}</div>
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}