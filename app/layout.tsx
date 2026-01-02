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
        <script defer src="https://cloud.umami.is/script.js" data-website-id="5c1b5e03-c585-48a2-93e7-57517d04e163"></script>
      </body>
    </html>
  );
}
