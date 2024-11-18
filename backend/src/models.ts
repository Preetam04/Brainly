import mongoose, { Schema, Document, Types } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { string } from "zod";

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

interface IContentSchema extends Document {
  contentType: "image" | "video" | "article" | "audio";
  link: string;
  title: string;
  tags: ITagSchema[];
  userId: IUserSchema;
}

const contentTypes = ["image", "video", "article", "audio"];

const contentSchema = new Schema<IContentSchema>(
  {
    contentType: {
      type: String,
      enum: contentTypes,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      validate: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        if (!user) {
          throw new Error("User doesn't exists");
        }
      },
      required: true,
    },

    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  {
    timestamps: true,
  }
);

contentSchema.pre("save", async function (next) {
  const user = await User.findById(this.userId);
  if (!user) {
    throw new Error("User doesn't exists");
  }
  next();
});

export const Content =
  mongoose.models.Content || mongoose.model("Content", contentSchema);

interface ITagSchema extends Document {
  tag: string;
}

const tagsSchema = new Schema<ITagSchema>({
  tag: {
    type: String,
    required: true,
  },
});

export const Tag = mongoose.models.Tag || mongoose.model("Tag", tagsSchema);

interface ILinkSchema extends Document {
  hash: string;
  userId: IUserSchema;
}

const linkSchema = new Schema<ILinkSchema>({
  hash: {
    type: String,
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
    validate: async (value: Types.ObjectId) => {
      const user = await User.findById(value);
      if (!user) {
        throw new Error("User doesn't exists");
      }
    },
  },
});

linkSchema.pre("save", async function (next) {
  const user = await User.findById(this.userId);
  if (!user) {
    throw new Error("User doesn't exists");
  }
  next();
});

export const Link = mongoose.models.Link || mongoose.model("Link", linkSchema);
