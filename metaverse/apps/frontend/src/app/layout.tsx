import type { Metadata } from "next";
import "@fontsource/pixelify-sans/700.css";
import "@fontsource/pixelify-sans/400.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import "./globals.css";
import { ToastProvider } from "../components/ToastContainer";

export const metadata: Metadata = {
  title: {
    default: "OrbitOne - Immersive 2D Metaverse Platform",
    template: "%s | OrbitOne"
  },
  description: "Create, explore, and collaborate in immersive 2D virtual spaces. Join the next generation of digital interaction with our real-time metaverse platform featuring customizable avatars, interactive environments, and seamless social experiences.",
  keywords: [
    "metaverse",
    "virtual reality",
    "2D metaverse",
    "virtual spaces",
    "digital collaboration",
    "virtual avatars",
    "real-time interaction",
    "virtual environments",
    "digital social platform",
    "virtual world",
    "online collaboration",
    "virtual meetings",
    "digital workspace",
    "virtual community"
  ],
  authors: [{ name: "OrbitOne Team" }],
  creator: "OrbitOne",
  publisher: "OrbitOne",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://orbitone.cloud'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://orbitone.cloud',
    siteName: 'OrbitOne',
    title: 'OrbitOne - Immersive 2D Metaverse Platform',
    description: 'Create, explore, and collaborate in immersive 2D virtual spaces. Join the next generation of digital interaction.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OrbitOne Metaverse Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OrbitOne - Immersive 2D Metaverse Platform',
    description: 'Create, explore, and collaborate in immersive 2D virtual spaces. Join the next generation of digital interaction.',
    images: ['/og-image.png'],
    creator: '@orbitone',
    site: '@orbitone',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  classification: 'Virtual Reality and Metaverse Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon Links */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        
        {/* PWA and Theme */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="msapplication-TileColor" content="#6366f1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "OrbitOne",
              "description": "Immersive 2D metaverse platform for creating and exploring virtual spaces",
              "url": "https://orbitone.cloud",
              "applicationCategory": "EntertainmentApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Organization",
                "name": "OrbitOne"
              },
              "featureList": [
                "2D Virtual Spaces",
                "Real-time Collaboration",
                "Customizable Avatars",
                "Interactive Environments",
                "Social Features"
              ]
            })
          }}
        />
      </head>
      <body className="font-inter antialiased relative min-h-screen bg-white overflow-x-hidden">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
