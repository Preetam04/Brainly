import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { User } from "./models";

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
