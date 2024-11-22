import { X } from "lucide-react";
import Button from "./Button";
import { z } from "zod";
import { contentValidationSchema } from "../lib";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./inputfied";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../services/axios";
import { addContent } from "../services/userServices";

export type ContentForm = z.infer<typeof contentValidationSchema>;

const AddContentCard = ({ setFunc, setRender }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContentForm>({
    resolver: zodResolver(contentValidationSchema),
    defaultValues: {
      contentType: "link", // Set the default selected value
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: ContentForm) => {
    setLoading(true);
    console.log({ ...values, tags: values.tags?.split(", ") || [] });

    try {
      const response = await addContent({
        ...values,
        tags: values.tags?.split(", ") || [],
      });
      setFunc((prev) => !prev);
      setRender((prev) => !prev);
      // console.log(response.data);
      toast.success("Content added successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error occured while adding content");
    } finally {
      setLoading(false);
    }
  };

  console.log(errors);

  const contentType = ["link", "youtube", "tweet", "document"];

  return (
    <div className="w-full max-w-96 bg-background rounded-md py-5 px-6 mx-4 relative">
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
          {/* {errors && (
            <p className="text-sm pt-1 text-red-500">
              {errors["contentType"].message}
            </p>
          )} */}
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
          text="Add Content"
          type="default"
          action="submit"
          loading={loading}
        />
      </form>
    </div>
  );
};

export default AddContentCard;
