import React, { useEffect, useState } from "react";
import Logo from "../../components/Logo";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import { Brain, LoaderCircle, Plus, Share, Share2, X } from "lucide-react";
import ContentCard, { CardProps } from "../../components/ContentCard";
import Inputfied from "../../components/inputfied";
import InputField from "../../components/inputfied";
import ShareCard from "../../components/ShareCard";
import AddContentCard, { ContentForm } from "../../components/AddContentCard";
import SliderBar from "../../components/SliderBar";
import {
  deleteContent,
  getUserData,
  updateContentData,
} from "../../services/userServices";
import useFetch from "../../hooks/useFetch";
import { toast } from "react-toastify";
import UpdateCard from "../../components/UpdateCard";

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
  const [updateCardData, setUpdateCardData] = useState<ContentForm | null>(
    null
  );
  const [shareCardOpen, setShareCardOpen] = useState<boolean>(false);

  const [render, setRender] = useState(false);

  const { data, error, loading } = useFetch(async () => {
    return await getUserData();
  }, render);

  useEffect(() => {}, [render]);

  const [filter, setFilter] = useState("all");

  const onDelete = async (id: string) => {
    try {
      const response = await deleteContent(id);
      // console.log(response.data.message);
      setRender((prev) => !prev);
      toast.success("Content removed successfully");
    } catch (error) {
      console.log(error);
      toast.error("Can't delete content");
    }
  };

  const onUpdate = async (data: ContentForm) => {
    // console.log(data);

    try {
      const response = await updateContentData(data._id, data);
      // console.log(response.data);
      setUpdateCardData(null);
      setRender((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center flex-col">
        <Navbar />

        <div className="mt-28 container px-5 ">
          <div className="flex items-start justify-between flex-col sm:flex-row w-full flex-wrap ">
            <h1 className="text-3xl font-bold">All Notes</h1>
            <div className=" flex gap-4">
              <Button
                type="outline"
                icon={Share2}
                onClick={() => {
                  setShareCardOpen((prev) => !prev);
                }}
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
          <div className="mt-6">
            <SliderBar
              setFilter={setFilter}
              arr={["all", "tweet", "document", "youtube", "link"]}
            />
          </div>
        </div>

        {loading && (
          <div className="w-full flex items-center text-primary justify-center mt-24">
            <LoaderCircle className="animate-spin " size={32} />
          </div>
        )}
        {!loading && (
          <div className="container px-5">
            {!loading && data?.length !== 0 ? (
              <div className=" grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 mb-20">
                {data
                  ?.filter((ele) => {
                    if (filter === "all") {
                      return ele;
                    }
                    return ele.contentType === filter;
                  })
                  .map((ele, key) => (
                    <ContentCard
                      key={ele._id}
                      id={ele._id}
                      contentType={ele.contentType}
                      title={ele?.title}
                      link={ele.link}
                      tags={ele.tags}
                      userId={ele.userId}
                      onDelete={onDelete}
                      onEdit={() => {
                        setUpdateCardData(ele);
                      }}
                      time={ele?.createdAt}
                    />
                  ))}
              </div>
            ) : (
              <div className=" text-center mt-16 text-2xl font-semibold flex items-center flex-col gap-5">
                <Brain size={56} className="text-primary" />
                <p>Please Add data to your second brain</p>
              </div>
            )}
          </div>
        )}
      </div>

      {(addContentTabVisible || shareCardOpen || updateCardData !== null) && (
        <div className="fixed bg-black/45  top-0 left-0 w-screen h-screen z-20  scroll flex items-center justify-center">
          {addContentTabVisible && (
            <AddContentCard
              setRender={setRender}
              setFunc={setAddContentTabVisible}
            />
          )}
          {shareCardOpen && <ShareCard setFunc={setShareCardOpen} />}
          {updateCardData !== null && (
            <UpdateCard
              setFunc={setUpdateCardData}
              onUpdate={onUpdate}
              data={updateCardData}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Home;
