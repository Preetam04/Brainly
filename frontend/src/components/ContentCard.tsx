import {
  Edit,
  FileText,
  Link,
  Link2,
  Trash2,
  Twitter,
  Youtube,
} from "lucide-react";
import React, { useEffect, useState } from "react";

export interface CardProps {
  contentType: "tweet" | "document" | "youtube" | "link";
  link: string;
  id: string;
  title: "Elon Musk on AI Innovation";
  tags: ["AI", "Technology"];
  userId: "user_001";
  onDelete?: (_id: string) => void;
  time: string;
  onEdit?: () => void;
  data?: JSON | any;
}

const ContentCard: React.FC<CardProps> = ({
  contentType,
  link,
  data,
  id,
  tags,
  title,
  // userId,
  onDelete,
  time,
  onEdit,
}) => {
  const iconType = {
    youtube: <Youtube size={20} className="text-gray-800" />,
    tweet: <Twitter size={20} className="text-gray-800" />,
    document: <FileText size={20} className="text-gray-800" />,
    link: <Link2 size={20} className="text-gray-800" />,
  };

  // const [contentDetails, setContentDetails] = useState<Promise<any>>();

  const [contentData, setContentData] = useState({});

  const dataToday = new Date(time);

  const token = localStorage.getItem("brainly-token");
  const authenticated = token && token.length !== 0;

  useEffect(() => {
    if (contentType === "youtube") {
      let temp = JSON.parse(data);
      setContentData(temp);
    }
  }, []);

  return (
    <div
      className="w-full ring-1 ring-gray-300  p-4 rounded-md shadow relative h-fit "
      onClick={() => {}}
    >
      <div className="text-gray-500 flex items-center gap-3 absolute right-4 bottom-4">
        {authenticated && (
          <Edit
            size={16}
            onClick={() => {
              // @ts-ignore
              onEdit();
            }}
            className="update-btn hover:text-primary cursor-pointer hover:bg-primary/25 p-1 w-fit h-fit rounded-md"
          />
        )}
        <a href={link} target="_blank">
          <Link
            size={16}
            className=" hover:text-primary cursor-pointer hover:bg-primary/25 p-1 w-fit h-fit rounded-md"
          />
        </a>
        {authenticated && (
          <Trash2
            size={16}
            onClick={() => {
              // @ts-ignore

              onDelete(id);
            }}
            className="hover:text-red-700 cursor-pointer hover:bg-red-700/25 p-1 w-fit h-fit rounded-md"
          />
        )}
      </div>
      <div className=" flex items-end gap-2  h-9">
        {iconType[contentType]}
        <h3 className="text-base font-semibold flex items-start gap-2 text-gray-500 ">
          {title}
        </h3>
      </div>
      <div className="text-sm mt-2.5 font-medium px-2">
        {contentType === "youtube" ? (
          <>
            <img
              // @ts-ignore

              src={contentData?.thumbnail?.url}
              width={480}
              height={360}
              className="w-fit rounded-md"
              // @ts-ignore

              alt={contentData?.title}
            />
            <h4 className="mt-2 text-base font-semibold">
              {
                // @ts-ignore
                contentData?.title
              }
            </h4>
          </>
        ) : (
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit dolor laudantium distinctio, aliquam vel, modi adipisci aliquid debitis sint fuga est nihil? Molestias vel perferendis sapiente fugiat dolore assumenda. In. "
        )}
      </div>

      <div className="flex gap-2 mt-4">
        {tags.map((tag, key) => (
          <div
            key={key}
            className="text-xs text-primary bg-primary/25 p-1 rounded-md px-2 font-medium lowercase"
          >
            #
            {
              // @ts-ignore
              tag["tag"]?.split(" ").join("-")
            }
          </div>
        ))}
      </div>
      <p className="text-xs mt-3 text-gray-500 font-medium">
        Added on: {dataToday.getDate()}/{dataToday.getMonth()}/
        {dataToday.getFullYear()}
      </p>
    </div>
  );
};

export default ContentCard;
