import type { Metadata } from "next";
import "@fontsource/pixelify-sans/700.css";
import "@fontsource/pixelify-sans/400.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import "./globals.css";
import { ToastProvider } from "../components/ToastContainer";

export const metadata: Metadata = {
  title: "orbit.space | metaverse",
  description: "a simple metaverse application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-inter antialiased relative min-h-screen bg-white overflow-x-hidden">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
