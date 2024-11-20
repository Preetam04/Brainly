import { Brain } from "lucide-react";
import React from "react";

const Logo = () => {
  return (
    <div
      className={` text-2xl font-semibold items-center gap-2 text-foreground flex `}
    >
      <Brain className="text-primary " size={28} />
      Brainly
    </div>
  );
};

export default Logo;
