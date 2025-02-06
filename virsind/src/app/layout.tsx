import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vir Sind",
  description: "Official artist webpage",
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
      </body>
    </html>
  );
}
