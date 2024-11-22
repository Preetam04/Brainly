import React, { useState } from "react";
import Button from "./Button";
import { Copy, Link, X } from "lucide-react";
import { getSharingLink } from "../services/userServices";
import { toast } from "react-toastify";

const ShareCard = ({ setFunc }) => {
  const [linkAvailable, setLinkAvailable] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState<string>("");

  const onClick = async () => {
    setLoading(true);

    try {
      const response = await getSharingLink();
      console.log(response.data.hash);
      setLink(`${window.location.origin}/shared/${response.data.hash}`);
      setLinkAvailable(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(link);
    toast.info("Link copied to clipboard");
  };

  return (
    <div className="w-full max-w-96 h-fit bg-background rounded-md py-5 px-6 mx-4 relative">
      <div className="absolute right-3 top-3">
        <X
          className="text-gray-400 hover:bg-gray-200 p-0.5 w-fit h-fit rounded-md cursor-pointer"
          onClick={() => {
            setFunc((prev: boolean) => !prev);
          }}
        />
      </div>

      <h3 className="text-2xl font-bold  ">Share our Content</h3>

      <p className="my-4 text-sm text-gray-600">
        Share your entire collection of notes, documents, tweets, and videos
        with others. Once you share, your content will be available to everyone
        with the valid link
      </p>
      <div className="">
        <Button
          icon={linkAvailable ? Copy : Link}
          text={linkAvailable ? "Copy Link" : "Get Link"}
          onClick={() => {
            if (linkAvailable) {
              copyLink();
            } else {
              onClick();
            }
          }}
          type="default"
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ShareCard;
