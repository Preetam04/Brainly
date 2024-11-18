import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface IUserSchema extends Document {
  username: string;
  password: string;
}

const userSchema = new Schema<IUserSchema>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 10,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 20,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJWTToken = async function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
    },
    // @ts-ignore
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_TOKEN_EXPIRY,
    }
  );

  return token;
};

export const User =
  mongoose.models.User || mongoose.model<IUserSchema>("User", userSchema);
