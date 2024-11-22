import React, { useState } from "react";
import { contentValidationSchema } from "../lib";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "./Button";
import InputField from "./inputfied";
import { ContentForm } from "./AddContentCard";
import { X } from "lucide-react";

const UpdateCard = ({ setFunc, data, onUpdate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContentForm>({
    resolver: zodResolver(contentValidationSchema),
    defaultValues: {
      title: data["title"],
      link: data["link"],
      contentType: data["contentType"], // Set the default selected value
      tags: data["tags"].map((ele) => ele.tag).join(", "),
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit = async (values: ContentForm) => {
    onUpdate({ ...data, ...values, tags: values.tags?.split(", ") });
  };
  const contentType = ["link", "youtube", "tweet", "document"];

  return (
    <div className="w-full max-w-96 bg-background rounded-md py-5 px-6 mx-4 relative">
      <div className="absolute right-3 top-3">
        <X
          className="text-gray-400 hover:bg-gray-200 p-0.5 w-fit h-fit rounded-md cursor-pointer"
          onClick={() => {
            setFunc(null);
          }}
        />
      </div>

      <h3 className="text-2xl font-bold mb-4">Update Content</h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-4 h-full"
      >
        <InputField
          label="Content Title"
          name="title"
          register={register}
          error={errors.title}
          placeholder="Your Content Title"
        />
        <div className="">
          <p className="block mb-2 text-sm font-medium  text-gray-800/75">
            {" "}
            Content Type
          </p>
          <div className="flex flex-wrap gap-2 p-2 items-center w-full max-w-56 justify-between">
            {contentType.map((ele, key) => (
              <div className="flex items-center max-w-20" key={key}>
                <input
                  id={ele}
                  type="radio"
                  value={ele}
                  {...register("contentType", {
                    required: "Please select a content type",
                  })}
                  className="w-4 h-4 border-gray-300 focus:ring-2"
                />
                <label
                  htmlFor={ele}
                  className="block ms-2  text-sm font-medium text-gray-900 capitalize"
                >
                  {ele}
                </label>
              </div>
            ))}
          </div>
        </div>

        <InputField
          label="Link"
          name="link"
          register={register}
          error={errors.link}
          placeholder="Content url"
        />
        <InputField
          label="Tags"
          name="tags"
          register={register}
          error={errors.tags}
          placeholder="Tags(development, productivity)"
          required={false}
        />

        <Button
          text="Update Content"
          type="default"
          action="submit"
          loading={loading}
        />
      </form>
    </div>
  );
};

export default UpdateCard;
