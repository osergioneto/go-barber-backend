import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new Error("JWT Token is missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(token, authConfig.jwt.secret) as TokenPayload;

    console.log({ sub });

    request.user = {
      id: sub
    };

    return next();
  } catch (error) {
    throw new Error("Invalid JWT Token");
  }
}