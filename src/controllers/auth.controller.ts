import type { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/jwt.js";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "user not found",
      });
    }
    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      return res.status(404).json({
        status: "fail",
        message: "incorrect password",
      });
    }
    const token = await createToken(user);
    console.log(token);
    res.status(200).json({
      status: "success",
      data: { id: user._id, name: user.name, token: token },
    });
  } catch (error) {
    // next(error);
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(409).json({
        status: "fail",
        message: "An account with this email already exists.",
      });
    }
    const hashedPassword = await hash(password, 10);
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
      status: "success",
      data: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    // next(error);
  }
};

export { login, register };
