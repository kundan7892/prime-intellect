import { Geist, Geist_Mono } from "next/font/google";
import "./styles/7ca52951e73d16f6.css";
import "./styles/415672b643d6b238.css";
import "./styles/site.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Prime Intellect - The Open Stack for Self-Improving Agents",
  description: "The compute and infrastructure platform for you to train, evaluate, and deploy your own agentic models.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="__variable_bd525c __variable_3bed08 antialiased bg-black text-white selection:bg-white/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}

