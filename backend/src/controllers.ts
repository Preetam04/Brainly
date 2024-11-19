import { Request, Response } from "express";
import { Content, Tag, User } from "./models";
import mongoose, { Error, Schema } from "mongoose";
import { contentValidationSchema, userValidationSchema } from "./lib";

async function signUp(req: Request, res: Response): Promise<any> {
  const data = userValidationSchema.safeParse(req.body);

  if (data.error) {
    return res.status(411).json({
      message: data.error.errors.map((err) => err.message).join(" & "),
      status: 411,
    });
  }

  try {
    const { username, password } = req.body;

    const isUserPresent = await User.findOne({
      username: username,
    });

    if (isUserPresent) {
      return res.status(403).json({
        message: "User already exists with username",
        status: 403,
      });
    }

    const newUser = await User.create({
      username,
      password,
    });

    if (!newUser) {
      return res.status(404).json({
        message: "Error creating User",
        status: 404,
      });
    }

    return res.status(200).json({
      message: "User signed up successfully",
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      status: 500,
    });
  }
}

async function signIn(req: Request, res: Response): Promise<any> {
  const data = userValidationSchema.safeParse(req.body);

  if (data.error) {
    return res.status(411).json({
      message: data.error.errors.map((err) => err.message).join(" & "),
      status: 411,
    });
  }

  try {
    const { username, password } = req.body;

    const userExists = await User.findOne({
      username: username,
    });

    if (!userExists) {
      return res.status(403).json({
        message: "User doesn't exists with this username",
        status: 403,
      });
    }

    const passwordCorrect = await userExists.isPasswordCorrect(password);

    if (!passwordCorrect) {
      return res.status(401).json({
        message: "Password is Incorrect",
        status: 401,
      });
    }

    const token = await userExists.generateJWTToken();

    return res.status(201).json({
      message: "User Signed Up Successfully",
      token,
      status: 201,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      status: 500,
    });
  }
}

async function addContent(req: Request, res: Response): Promise<any> {
  const data = contentValidationSchema.safeParse(req.body);

  if (data.error) {
    return res.status(411).json({
      message: data.error.errors.map((err) => err.message).join(" & "),
      status: 411,
    });
    return;
  }

  try {
    // @ts-ignore
    const user = req.user;

    const { contentType, link, title, tags } = req.body;

    if (tags && tags.length !== 0) {
      const newTags = await Promise.all(
        tags.map(async (ele: string) => {
          const existingTag = await Tag.findOne({ tag: ele });
          if (existingTag) return existingTag._id;

          const createdTag = await Tag.create({ tag: ele });
          return createdTag._id;
        })
      );

      const addedContent = await Content.create({
        contentType,
        link,
        title,
        userId: user._id,
        tags: newTags,
      });

      if (!addedContent) {
        return res.status(404).json({
          message: "Error adding content",
          status: 404,
        });
      }

      return res.status(201).json({
        message: "Content added successfully",
        content: addedContent,
        status: 201,
      });
    } else {
      const addedContent = await Content.create({
        contentType,
        link,
        title,
        userId: user._id,
      });

      if (!addedContent) {
        return res.status(404).json({
          message: "Error adding content",
          status: 404,
        });
      }

      return res.status(201).json({
        message: "Content added successfully",
        content: addedContent,
        status: 201,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ message: "Something went wrong", status: 501 });
  }
}

async function getAllContent(req: Request, res: Response): Promise<any> {
  // @ts-ignore
  const user = req.user;

  try {
    const allContent = await Content.find({
      userId: user._id,
    });

    if (!allContent) {
      return res.status(403).json({
        message: "User don't have any content",
        status: 403,
      });
      return;
    }

    return res.status(200).json({
      message: "User's content fetched successfully",
      allContent,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ message: "Something went wrong", status: 501 });
  }
}

async function deleteContent(req: Request, res: Response): Promise<any> {
  const { contentId } = req.body;
  // @ts-ignore
  const user = req.user;

  if (!contentId) {
    return res.status(411).json({ message: "contentId is required" });
  }

  try {
    const content = await Content.findById(contentId);

    if (!content) {
      return res.status(403).json({
        message: "Content doesn't Exists",
        status: 403,
      });
    }

    // console.log(content?.userId.equals(user._id));
    // console.log(content?.userId, user._id);

    // @ts-ignore
    if (!content || !content?.userId.equals(user._id)) {
      return res.status(403).json({
        message: "Trying to delete a doc you don’t own",
        status: 403,
      });
    }

    await Content.findByIdAndDelete(contentId);

    return res.status(200).json({
      message: "content deleted",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ message: "Something went wrong", status: 501 });
  }
}

async function createLink(req: Request, res: Response) {}

async function fetchLink(req: Request, res: Response) {}

export {
  signUp,
  signIn,
  addContent,
  getAllContent,
  deleteContent,
  createLink,
  fetchLink,
};
