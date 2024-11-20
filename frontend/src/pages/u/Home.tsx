import React, { useState } from "react";
import Logo from "../../components/Logo";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import { Plus, Share, Share2, X } from "lucide-react";
import ContentCard, { CardProps } from "../../components/ContentCard";
import Inputfied from "../../components/inputfied";
import InputField from "../../components/inputfied";

const dummyData: CardProps[] = [
  {
    contentType: "tweet",
    link: "https://twitter.com/elonmusk/status/1234567890",
    title: "Elon Musk on AI Innovation",
    tags: ["AI", "Technology"],
    userId: "user_001",
  },
  {
    contentType: "document",
    link: "https://example.com/documents/blockchain-introduction.pdf",
    title: "Introduction to Blockchain",
    tags: ["Blockchain", "Crypto"],
    userId: "user_002",
  },
  {
    contentType: "youtube",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    title: "Understanding Quantum Computing",
    tags: ["Quantum Computing", "Physics"],
    userId: "user_003",
  },
  {
    contentType: "link",
    link: "https://dev.to/blog/10-tips-for-junior-developers",
    title: "10 Tips for Junior Developers",
    tags: ["Development", "Programming"],
    userId: "user_004",
  },
  {
    contentType: "document",
    link: "https://example.com/docs/design-principles.pdf",
    title: "Principles of Modern Design",
    tags: ["Design", "UI/UX"],
    userId: "user_005",
  },
];

const Home = () => {
  const [addContentTabVisible, setAddContentTabVisible] =
    useState<boolean>(false);

  const onShare = () => {};
  const onAdd = () => {};
  const onDelete = (id: string) => {
    console.log(id);
  };

  return (
    <>
      <div className="flex items-center flex-col">
        <Navbar />
        <div className="mt-28 container px-5">
          <div className="flex items-start justify-between flex-col sm:flex-row w-full flex-wrap ">
            <h1 className="text-3xl font-bold">All Notes</h1>
            <div className=" flex gap-4">
              <Button
                type="outline"
                icon={Share2}
                onClick={onShare}
                text="Share your brain"
              />
              <Button
                type="default"
                icon={Plus}
                onClick={() => {
                  setAddContentTabVisible((prev) => !prev);
                }}
                text="Add content"
              />
            </div>
          </div>

          <div className=" grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 mb-20">
            {dummyData.map((ele, key) => (
              <ContentCard
                key={key}
                contentType={ele.contentType}
                title={ele?.title}
                link={ele.link}
                tags={ele.tags}
                userId={ele.userId}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      </div>
      {addContentTabVisible && (
        <div className="fixed bg-black/45  top-0 left-0 w-screen h-screen z-20  scroll flex items-center justify-center">
          <AddContentCard setFunc={setAddContentTabVisible} />
        </div>
      )}
    </>
  );
};

export default Home;

const AddContentCard = ({ setFunc }) => {
  return (
    <div className="w-full max-w-2xl h-96 bg-background rounded-md py-5 px-6 mx-4 relative">
      <div className="absolute right-4">
        <Button
          type="outline"
          icon={X}
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
