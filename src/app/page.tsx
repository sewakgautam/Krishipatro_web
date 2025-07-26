// src/app/page.tsx (server component)
import PageClient from "./home"; // adjust import path if needed

export const metadata = {
  title: "कृषि पात्रो | Krishi Patro - Modern Solutions for Smart Farming",
  description:
    "Krishi Patro is a revolutionary digital platform for Nepali farmers providing real-time weather updates, market prices, expert farming advice, and offline access. Made in Nepal, for Nepal.",
  keywords: [
    "कृषि पात्रो",
    "Krishi Patro",
    "Hamro Patro",
    "Nepali Patro",
    "Krishi",
    "कृषि",
    "पात्रो",
    "*",
    "Sewak",
    "Sujan",
    "Smart",
    "Farm",
    "Farmers",
    "Nepali Farmers",
    "Nepali Farmers App",
    "Farming App Nepal",
    "Nepal Agriculture App",
    "Weather Forecast Nepal",
    "Market Prices Nepal",
    "Smart Farming",
    "Digital Krishi",
    "Nepal Agro App",
    "Agri Tech Nepal",
  ],
  authors: [
    { name: "Krishi Patro Team", url: "https://krishipatro.com" },
    { Founder: "Sewak Gautam" },
    { CoFounder: "Shishir Shobhan Dawadi" },
    { CoFounder: "Sujan Parajuli" },
  ],
  creator: "Krishi Patro",
  publisher: "Krishi Patro",
  openGraph: {
    title: "कृषि पात्रो | Krishi Patro - Smart Farming App for Nepali Farmers",
    description:
      "Join the future of farming with Krishi Patro – get live weather updates, crop advice, market prices, and more. Built for Nepali farmers.",
    url: "https://krishipatro.com",
    siteName: "Krishi Patro",
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon.png", type: "image/png" },
      ],
    },
    images: [
      {
        url: "https://krishipatro.com/icon.png",
        width: 1200,
        height: 630,
        alt: "Krishi Patro - Smart Farming App for Nepali Farmers",
      },
    ],
    locale: "ne_NP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krishi Patro | कृषि पात्रो",
    description:
      "Empowering Nepali farmers with digital tools: weather, prices, and expert advice in your pocket.",
    creator: "@KrishiPatro",
    images: ["https://krishipatro.com/twitter-card.png"],
  },
  metadataBase: new URL("https://krishipatro.com"),
  alternates: {
    canonical: "https://krishipatro.com",
    languages: {
      "en-US": "https://krishipatro.com",
      "ne-NP": "https://krishipatro.com",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
  category: "Agriculture",
};

export default function Page() {
  return <PageClient />;
}
