import type { Metadata } from "next";
import '../Styles/globals.scss';

export const metadata: Metadata = {
  title: "Hópverkefni 2",
  description: "Hópverkefni 2 í vefforritun 2",
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