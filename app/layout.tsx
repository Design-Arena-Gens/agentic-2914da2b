import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Minimal CRM Dashboard",
  description: "A minimal CRM dashboard for managing contacts and deals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
