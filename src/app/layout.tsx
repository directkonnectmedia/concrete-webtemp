import type { Metadata } from "next";
import { Poppins, Inter, Dancing_Script } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const dancingScript = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Solution Concrete Specialist | Avondale, AZ",
  description:
    "Premium concrete services in the Phoenix West Valley. Driveways, sidewalks, patios, foundations, and decorative concrete. Licensed & insured. Free estimates. Call (480) 306-2547.",
  keywords:
    "concrete contractor Avondale AZ, driveway installation, concrete patios, sidewalks, foundations, decorative concrete, West Valley Arizona",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${dancingScript.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-white text-dark">
        {children}
      </body>
    </html>
  );
}
