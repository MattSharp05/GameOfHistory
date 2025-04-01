import Link from "next/link";

export const Navbar = () => {
  return (
    <nav>
          <Link href="/">Home</Link>
          <Link href="/modes">Game Modes</Link>
    </nav>
  );
}