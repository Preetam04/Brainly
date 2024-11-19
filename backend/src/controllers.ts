import { Request, Response } from "express";
import { Content, Tag, User } from "./models";
import mongoose, { Error, Schema } from "mongoose";
import { contentValidationSchema, userValidationSchema } from "./lib";

async function signUp(req: Request, res: Response) {
  const data = userValidationSchema.safeParse(req.body);

  if (data.error) {
    res.status(411).json({
      message: data.error.errors.map((err) => err.message).join(" & "),
      status: 411,
    });
    return;
  }

  try {
    const { username, password } = req.body;

    const isUserPresent = await User.findOne({
      username: username,
    });

    if (isUserPresent) {
      res.status(403).json({
        message: "User already exists with username",
        status: 403,
      });
      return;
    }

    const newUser = await User.create({
      username,
      password,
    });

    if (!newUser) {
      res.status(404).json({
        message: "Error creating User",
        status: 404,
      });
      return;
    }

    res.status(200).json({
      message: "User signed up successfully",
      status: 200,
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      status: 500,
    });
    return;
  }
}

async function signIn(req: Request, res: Response) {
  const data = userValidationSchema.safeParse(req.body);

  if (data.error) {
    res.status(411).json({
      message: data.error.errors.map((err) => err.message).join(" & "),
      status: 411,
    });
    return;
  }

  try {
    const { username, password } = req.body;

    const userExists = await User.findOne({
      username: username,
    });

    if (!userExists) {
      res.status(403).json({
        message: "User doesn't exists with this username",
        status: 403,
      });
      return;
    }

    const passwordCorrect = await userExists.isPasswordCorrect(password);

    if (!passwordCorrect) {
      res.status(401).json({
        message: "Password is Incorrect",
        status: 401,
      });
      return;
    }

    const token = await userExists.generateJWTToken();

    res.status(201).json({
      message: "User Signed Up Successfully",
      token,
      status: 201,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      status: 500,
    });
    return;
  }
}

async function addContent(req: Request, res: Response) {
  const data = contentValidationSchema.safeParse(req.body);

  if (data.error) {
    res.status(411).json({
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
        res.status(404).json({
          message: "Error adding content",
          status: 404,
        });
      }

      res.status(201).json({
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
        res.status(404).json({
          message: "Error adding content",
          status: 404,
        });
      }

      res.status(201).json({
        message: "Content added successfully",
        content: addedContent,
        status: 201,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Something went wrong", status: 501 });
  }
}

async function getAllContent(req: Request, res: Response) {
  // @ts-ignore
  const user = req.user;

  try {
    const allContent = await Content.find({
      userId: user._id,
    });

    if (!allContent) {
      res.status(403).json({
        message: "User don't have any content",
        status: 403,
      });
      return;
    }

    res.status(200).json({
      message: "User's content fetched successfully",
      allContent,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Something went wrong", status: 501 });
  }
}

async function deleteContent(req: Request, res: Response) {
  const { contentId } = req.body;
  // @ts-ignore
  const user = req.user;

  if (!contentId) {
    res.status(411).json({ message: "contentId is required" });
    return;
  }

  try {
    const content = await Content.find({
      _id: contentId,
      userId: user._id,
    });

    // @ts-ignore
    if (content && content.length === 0) {
      res.status(403).json({
        message: " Trying to delete a doc you don’t own",
        status: 403,
      });
    }

    await Content.findByIdAndDelete(contentId);

    res.status(200).json({
      message: "content deleted",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Something went wrong", status: 501 });
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
