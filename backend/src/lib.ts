import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { IContentSchema, User } from "./models";

export async function verifyJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return;
    }
    // @ts-ignore
    const istokenValid = jwt.verify(token, process.env.JWT_SECRET);

    if (istokenValid) {
      // @ts-ignore
      const userData = await User.findById(istokenValid._id).select(
        "-password"
      );

      if (!userData) {
        res.status(401).json({
          message: "Invalid token",
          status: 401,
        });
        return;
      }
      // @ts-ignore
      req.user = userData;
      next();
    }
  } catch (error) {
    res.status(401).json({
      message: "Token is Invalid",
      status: 401,
    });
    return;
  }
}

export const userValidationSchema = z.object({
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
    tags: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      switch (data.contentType) {
        case "tweet":
          return data.link.includes("x.com");
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
    }
  );
