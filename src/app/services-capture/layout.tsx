import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Background capture | Solution Concrete",
  robots: { index: false, follow: false },
};

export default function ServicesCaptureLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
