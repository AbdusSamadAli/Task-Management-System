import { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.services";
import { verifyRefreshToken, signAccessToken } from "../../utils/jwt";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await registerUser(email, password);
  res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  try {
    const tokens = await loginUser(req.body.email, req.body.password);
    res.json(tokens);
  } catch {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

export const refresh = (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  try {
    const decoded = verifyRefreshToken(refreshToken) as { userId: number };
    const accessToken = signAccessToken({ userId: decoded.userId });
    res.json({ accessToken });
  } catch {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

export const logout = (_: Request, res: Response) => {
  res.json({ message: "Logged out" });
};
