import { LogOut } from "lucide-react";
import Button from "./Button";
import Logo from "./Logo";

const Navbar = () => {
  const logout = () => {};

  return (
    <nav className="border-b border-b-gray-300 px-5 py-4 flex items-center justify-between fixed w-full bg-background z-20">
      <Logo />
      <div className=" ">
        <Button type="outline" icon={LogOut} onClick={logout} />
      </div>
    </nav>
  );
};

export default Navbar;
