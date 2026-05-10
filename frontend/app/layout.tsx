import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: {
    default:
      "C. M. Nyamagoud Developers | Residential Plots, Layouts & Site Enquiries in Jamkhandi",
    template: "%s | C. M. Nyamagoud Developers",
  },
  description:
    "Explore residential plots, layouts, completed projects, galleries, location details, and site visit enquiries from C. M. Nyamagoud Developers in Jamkhandi.",
  keywords: [
    "residential plots in Jamkhandi",
    "residential plots Jamkhandi",
    "layouts in Jamkhandi",
    "C M Nyamagoud Developers",
    "Jamkhandi layouts",
    "real estate Jamkhandi",
    "site visit Jamkhandi",
    "plot enquiry Jamkhandi",
    "real estate plots Karnataka",
  ],
  authors: [{ name: "C. M. Nyamagoud Developers" }],
  creator: "Muragesh Nyamagoud",
  applicationName: "C. M. Nyamagoud Developers",
  category: "real estate",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title:
      "C. M. Nyamagoud Developers | Residential Plots, Layouts & Site Enquiries in Jamkhandi",
    description:
      "Explore residential plots, layouts, completed projects, galleries, and enquiry options in Jamkhandi.",
    url: "https://cmnyamagoud.muragesh.tech",
    siteName: "C. M. Nyamagoud Developers",
    images: [
      {
        url: "/og-image.png",
        alt: "C. M. Nyamagoud Developers",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "C. M. Nyamagoud Developers | Residential Plots, Layouts & Site Enquiries in Jamkhandi",
    description:
      "Residential plots, layouts, galleries, and enquiry options in Jamkhandi.",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://cmnyamagoud.muragesh.tech"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
