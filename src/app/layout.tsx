import type { Metadata } from "next";
import type { Viewport } from 'next'
import { Inter } from "next/font/google";
// import Head from "next/head";
import ServiceWorkerRegistration from '../components/ServiceWorkerRegistration';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rising Sun",
  description: "A Japanese weather application",
  manifest: './manifest.json',
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        id="sky"
        className={inter.className}
      >
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
