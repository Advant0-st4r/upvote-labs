import { Link } from "@solidjs/router";

export default function Navbar() {
  return (
    <nav class="flex items-center justify-between p-4 bg-white shadow-md">
      <div class="logo font-bold text-xl">UpvoteLabs</div>
      <div class="nav-links flex space-x-4">
        <Link href="/">Landing</Link>
        <Link href="/discovery">Discovery</Link>
      </div>
    </nav>
  );
}
