import React from "react";
import Logo from "../../components/Logo";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import { Plus, Share, Share2 } from "lucide-react";
import ContentCard, { CardProps } from "../../components/ContentCard";

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
  const onShare = () => {};
  const onAdd = () => {};

  return (
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
              onClick={onShare}
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
