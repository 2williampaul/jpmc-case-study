import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Billy Paul",
  description: "Billy Paul is a designer passionate about designing with craft and skillfulness. He loves crafting design systems which operate at scale, visual interactive experiences and fostering collaboration. He has been delivering value for global-scale clients for over 12 years.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunitoSans.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
