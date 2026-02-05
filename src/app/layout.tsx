import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Modular Colloboration Engine",
  description: "Notion like Editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`dark`}>{children}</body>
    </html>
  );
}
