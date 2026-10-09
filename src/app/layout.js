import "./globals.css";

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
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
