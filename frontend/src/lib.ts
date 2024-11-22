import z from "zod";

export const userSchema = z.object({
  username: z
    .string({
      required_error: "Username required",
    })
    .min(3, "username atleast 3-10 characters")
    .max(10),
  password: z
    .string({
      required_error: "Username required",
    })
    .min(8, "password atleast 8-20 characters")
    .max(20),
});

export const contentValidationSchema = z
  .object({
    contentType: z.enum(["tweet", "document", "youtube", "link"], {
      required_error: "Please provide a content Type",
    }),
    link: z
      .string()
      .url({ message: "Invalid URL. Please provide a valid URL." }),
    title: z.string({
      required_error: "Please provide a Title",
    }),
    tags: z.string().optional(),
  })
  .refine(
    (data) => {
      switch (data.contentType) {
        case "tweet":
          return data.link.includes("twitter.com");
        case "youtube":
          return data.link.includes("youtube.com");
        case "document":
          return data.link.includes("docs.google.com");
        case "link":
          return true;
        default:
          return false;
      }
    },
    {
      message: "The URL does not match the specified content type.",
      path: ["link"],
    }
  );
