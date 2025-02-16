import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export const genToken = (
  payload: string | object | Buffer<ArrayBufferLike>,
) => {
  const token = jwt.sign(payload, secret as string, {
    expiresIn: "1h",
  });

  return token;
};

export const verifyToken = <T>(token: string): T | null => {
  try {
    const data = jwt.verify(token, secret as string);
    return data as T;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid token";
    console.log(message);
    return null;
  }
};
