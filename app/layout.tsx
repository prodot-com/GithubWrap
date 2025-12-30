import type { Metadata } from "next";
import "./globals.css";
import {Analytics} from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "GitHub Wrapped 2025",
  description: "Your year in code, get AI quote.",
  metadataBase: new URL("https://githubwrapx.vercel.app/"),

  openGraph: {
    title: "GithubWrapX - Veiw your Github journey",
    description: "Your year in code, get AI quote.",
    url: "https://githubwrapx.vercel.app/",
    siteName: "GitHub Wrapped",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "GitHub Wrapped Preview",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "GithubWrapX - Veiw your Github journey",
    description: "Your year in code, get AI quote.",
    images: ["/og.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
