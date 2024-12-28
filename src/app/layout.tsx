import type { Metadata } from "next";
import "./globals.css";
import Header from '@/common/Header';


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
      <body className="flex flex-col items-center">
        <Header />
        {children}
      </body>
    </html>
  );
}
