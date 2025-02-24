import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "DDLC Productivity Club",
  description: "Study with your favorite Doki! A productivity app inspired by Doki Doki Literature Club",
  keywords: ["DDLC", "productivity", "pomodoro", "study", "focus"],
  authors: [{ name: "DDPC Team" }],
  openGraph: {
    title: "DDLC Productivity Club",
    description: "Study with your favorite Doki! A productivity app inspired by Doki Doki Literature Club",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "DDLC Productivity Club"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "DDLC Productivity Club",
    description: "Study with your favorite Doki! A productivity app inspired by Doki Doki Literature Club",
    images: ["/images/og-image.png"]
  }
}; 