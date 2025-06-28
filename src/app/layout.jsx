import "./globals.css";
import ThemeSync from "@/components/ThemeSync";

export const metadata = {
  title: "Litera Digital Library",
  description: "Digital library platform for book borrowing and management",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Litera Digital Library",
    description: "Explore and manage your library books digitally.",
    url: "https://litera-digital-library.com",
    siteName: "Litera Digital Library",
    images: [
      {
        url: "https://litera-digital-library.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Litera Digital Library",
    description: "Explore and manage your library books digitally.",
    images: ["https://litera-digital-library.com/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeSync />
        {children}
      </body>
    </html>
  );
}
