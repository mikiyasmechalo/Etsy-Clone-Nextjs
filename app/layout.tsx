import type { Metadata } from "next";
import "./globals.css";
import { Graphik, GuardianEgyp } from "./fonts";

import ClientFooterWrapper from "@/components/layout/ClientFooterWrapper";
import ClientHeaderWrapper from "@/components/layout/ClientHeaderWrapper";


export const metadata: Metadata = {
  title: "MY ETSY",
  description:
    "Etsy Ethiopia - Shop for handmade, vintage, custom, and unique gifts for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased text-gray-800 ${Graphik.variable} ${Graphik.className} ${GuardianEgyp.variable}`}
      >
        <ClientHeaderWrapper />
        {children}
        <ClientFooterWrapper/>
      </body>
    </html>
  );
}
