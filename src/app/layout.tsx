import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/navigation/TopBar";
import BottomNav from "@/components/navigation/BottomNav";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { PuppyProvider } from "@/contexts/PuppyContext";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PuppyGuide",
  description: "Your puppy companion app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <PuppyProvider>
            <TopBar />
            <main className="flex-1 pt-16 pb-20 md:pb-0">{children}</main>
            <BottomNav />
          </PuppyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
