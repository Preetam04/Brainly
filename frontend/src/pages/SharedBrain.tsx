import React, { useState } from "react";
import Navbar from "../components/Navbar";
import useFetch from "../hooks/useFetch";
import { Brain, LoaderCircle } from "lucide-react";
import { getAllSharedData } from "../services/userServices";
import { useLocation, useParams } from "react-router-dom";
import ContentCard from "../components/ContentCard";
import SliderBar from "../components/SliderBar";
import { toast } from "react-toastify";

const SharedBrain = () => {
  const location = useLocation();
  const [render, setRender] = useState(false);
  const params = useParams();
  const [filter, setFilter] = useState("all");

  console.log(params);
  const { data, error, loading } = useFetch(async () => {
    return await getAllSharedData(params["hash"]);
  }, render);

  console.log(data);

  const onDelete = () => {
    toast.warn("Only content owner can delete");
  };

  return (
    <div className="flex items-center flex-col">
      <Navbar />

      {loading && (
        <div className="w-full flex items-center text-primary justify-center mt-24">
          <LoaderCircle className="animate-spin " size={32} />
        </div>
      )}

      {!loading && (
        <div className="mt-28 container px-5">
          <div className="flex items-start justify-between flex-col w-full flex-wrap ">
            <h1 className="text-3xl font-bold">
              These are the Notes of: {data?.user}
            </h1>
            <p className="text-gray-600 text-sm mt-2.5">
              Make an account to get access to your second brain <br />
              and access other featuers
            </p>
          </div>
          <div className="mt-6">
            <SliderBar
              setFilter={setFilter}
              arr={["all", "tweet", "document", "youtube", "link"]}
            />
          </div>
          {!loading && data?.length !== 0 ? (
            <div className=" grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 mb-20">
              {data?.allContent
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
  );
};

export default SharedBrain;
