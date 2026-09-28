import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/page";
import ChatWidget from "./components/ChatWidget/page";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "EIRA — Neo-Brutalist Mental Wellness Platform for Students",
  description: "A student-first mental wellness companion with AI support, daily mood tracking, guided mindfulness, and peer communities.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${plusJakartaSans.variable}`}>
        <Navbar />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
