import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import { MapsAPIProvider } from "../components/MapAPIProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solar Power",
  description: "Chnage this",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MapsAPIProvider apiKey="AIzaSyCi7e3FMADhQYOlwO0CjoAS4SeWGuhwXz8">{children}</MapsAPIProvider>
      </body>
    </html>
  );
}
