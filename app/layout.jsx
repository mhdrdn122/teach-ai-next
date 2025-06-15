import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ChapterContext } from "./Context/ChapterContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Teach Ai Next App",
  description: "Teach Ai Next App",
};

export default function RootLayout({ children }) {
  return (
    <ChapterContext>
         <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {children}
      </body>
    </html>
    </ChapterContext>
 
  );
}
