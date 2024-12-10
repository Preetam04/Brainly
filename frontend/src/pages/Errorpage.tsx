import { ArrowLeft, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Errorpage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <div className=" text-center w-full flex items-center flex-col relative bottom-24">
        <div className=" mb-10">
          <div
            className={` text-5xl font-semibold items-center gap-2 text-foreground flex `}
          >
            <Brain className="text-primary " size={48} />
            Brainly
          </div>
        </div>
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <p className="text-xl mt-4 font-medium">
          The page your are looking <br />
          for not found. Go back to home page
        </p>
        <Button
          text="Home"
          action="button"
          type="default"
          classes="mt-4 w-full max-w-32"
          icon={ArrowLeft}
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
    </div>
  );
};

export default Errorpage;
