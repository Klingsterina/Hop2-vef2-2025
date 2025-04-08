import type { Metadata } from "next";
import '../Styles/globals.scss';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

// const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
// const isLoggedIn = !!token;
// let storedUser = null;
// if (typeof window !== 'undefined') {
//   storedUser = localStorage.getItem('user');
// }
// const userObj = storedUser ? JSON.parse(storedUser) : {};

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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}