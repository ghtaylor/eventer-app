import { LuMenu } from "react-icons/lu";

const Navbar: React.FC = () => (
  <nav className="absolute z-10  p-4 w-full flex justify-between">
    <h1 className="text-3xl font-bold tracking-tighter">Eventer</h1>
    <div>
      <LuMenu className="text-4xl" />
    </div>
  </nav>
);

export default Navbar;
