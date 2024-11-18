import { Request, Response } from "express";
import { User } from "./models";
import { Error } from "mongoose";
import { userValidationSchema } from "./lib";

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
        message: "User already exists with this username",
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
  // @ts-ignore
  const user = req.user;

  console.log(user);

  res.status(200).json({
    message: "Add content",
  });
}

export { signUp, signIn, addContent };
