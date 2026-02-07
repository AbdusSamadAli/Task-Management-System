import bcrypt from "bcrypt";
import prisma from "../../config/prisma";
import { signAccessToken, signRefreshToken } from "../../utils/jwt";

export const registerUser = async (email: string, password: string) => {
  const hashed = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: { email, password: hashed },
  });
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  return {
    accessToken: signAccessToken({ userId: user.id }),
    refreshToken: signRefreshToken({ userId: user.id }),
  };
};
