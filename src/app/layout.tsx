import type { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <title>Zap Docs - Programming Language Documentation</title>
        <meta name="description" content="Zap is a beginner-friendly, general-purpose programming language designed for Web, Mobile, AI, and IoT applications." />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
