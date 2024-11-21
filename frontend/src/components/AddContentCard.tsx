import { X } from "lucide-react";
import Button from "./Button";

const AddContentCard = ({ setFunc }) => {
  return (
    <div className="w-full max-w-2xl h-96 bg-background rounded-md py-5 px-6 mx-4 relative">
      <div className="absolute right-3 top-3">
        <X
          className="text-gray-400 hover:bg-gray-200 p-0.5 w-fit h-fit rounded-md cursor-pointer"
          onClick={() => {
            setFunc((prev: boolean) => !prev);
          }}
        />
      </div>

      <h3 className="text-2xl font-bold">Add Content</h3>

      <p className="mt-1 mb-4">
        Add new article or video in your second brain.
      </p>
      <div className="flex justify-between w-full gap-6">
        <div className="w-full">
          <label
            htmlFor={"title"}
            className="block mb-2 text-sm font-medium  text-gray-800/75"
          >
            Title
          </label>
          <input
            type={"text"}
            id={"title"}
            className="bg-gray-50 outline outline-1 outline-gray-300  text-sm rounded-lg  w-full p-2.5 focus-visible:outline-primary  "
            placeholder={"Title"}
            required
          />

          {/* {error && (
          <p className="text-sm pt-1 text-red-500">{error.message}</p>
        )} */}
        </div>
        <div className="w-full">
          <label
            htmlFor={"title"}
            className="block mb-2 text-sm font-medium  text-gray-800/75"
          >
            Title
          </label>
          <input
            type={"text"}
            id={"title"}
            className="bg-gray-50 outline outline-1 outline-gray-300  text-sm rounded-lg  w-full p-2.5 focus-visible:outline-primary  "
            placeholder={"Title"}
            required
          />
        </div>

        {/* <InputField  /> */}
      </div>
    </div>
  );
};

export default AddContentCard;
