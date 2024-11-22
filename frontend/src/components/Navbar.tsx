import { LogOut } from "lucide-react";
import Button from "./Button";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const logout = () => {
    localStorage.removeItem("brainly-token");

    navigate("/sign-in");
  };

  const token = localStorage.getItem("brainly-token");
  const authenticated = token && token.length !== 0;

  const navigate = useNavigate();

  return (
    <nav className="border-b border-b-gray-300 px-5 py-4 flex items-center justify-between fixed w-full bg-background z-20">
      <Logo />
      <div className=" ">
        {authenticated ? (
          <Button type="outline" icon={LogOut} onClick={logout} />
        ) : (
          <Button
            type="outline"
            text="Login"
            onClick={() => {
              navigate("/sign-up");
            }}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
