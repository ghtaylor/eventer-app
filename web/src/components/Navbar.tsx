import Link from "next/link";
import { LuMenu } from "react-icons/lu";

const Navbar: React.FC = () => (
  <nav className="absolute z-10  p-4 w-full flex justify-between">
    <h1 className="text-3xl font-bold tracking-tighter">
      <Link href="/">Eventer</Link>
    </h1>
    <div>
      <LuMenu className="h-8 w-8" />
    </div>
  </nav>
);

export default Navbar;
