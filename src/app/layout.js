import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Insta Bio Generator | Create Engaging Instagram Bios for Indian Creators",
  description: "Generate creative and engaging Instagram bios instantly. Perfect for Indian influencers, businesses, and personal accounts. Free and easy to use. Create viral-worthy bios with our AI-powered tool.",
  keywords: "Instagram bio generator, social media bio, Instagram profile, bio maker, social media tools, Indian influencers, Instagram bio creator, free bio generator, viral Instagram bio, professional Instagram bio, aesthetic bio maker, desi Instagram bio",
  openGraph: {
    title: "Insta Bio Generator | Create Engaging Instagram Bios for Indian Creators",
    description: "Generate creative and engaging Instagram bios instantly. Perfect for Indian influencers, businesses, and personal accounts. Create viral-worthy bios with our AI-powered tool.",
    type: "website",
    locale: "en_US",
    siteName: "Insta Bio Generator",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Insta Bio Generator - Create Viral Instagram Bios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insta Bio Generator | Create Engaging Instagram Bios for Indian Creators",
    description: "Generate creative and engaging Instagram bios instantly. Perfect for Indian influencers, businesses, and personal accounts. Create viral-worthy bios with our AI-powered tool.",
    images: ["/og-image.jpg"],
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
  alternates: {
    canonical: 'https://insta-bio-gen.vercel.app',
  },
  verification: {
    google: 'your-google-site-verification',
  },
  other: {
    'google-adsense-account': 'ca-pub-2982909406885152',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
