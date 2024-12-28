import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Blog 41",
  description: "Blog 41 by b41",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
