import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Signal or Noise | The Trading Week | Aulteus Logic",
  description:
    "A fictional five-day decision game from Aulteus Logic exploring trading-related decision habits. Educational simulation only; not investment advice, a trading signal or a prediction of performance.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
