import type { Metadata } from "next";
import '../Styles/globals.scss';

const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
const isLoggedIn = !!token;
let storedUser = null;
if (typeof window !== 'undefined') {
  storedUser = localStorage.getItem('user');
}
const userObj = storedUser ? JSON.parse(storedUser) : {};

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