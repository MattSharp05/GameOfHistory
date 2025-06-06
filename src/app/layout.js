import { Inter } from "next/font/google";
import { Lobster } from "next/font/google";
import "./globals.css";
import { GameProvider } from '@/context/GameContext';

const inter = Inter({ subsets: ["latin"] });
const lobster = Lobster({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-lobster',
});

export const metadata = {
  title: "Game of History",
  description: "Learn history through interactive gameplay",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${lobster.variable}`}>
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}
