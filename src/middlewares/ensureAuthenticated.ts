import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";
import AppError from "../errors/AppError";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new AppError("JWT Token is missing", 401);
  }

  const [, token] = authHeader.split(" ");

  const { sub } = verify(token, authConfig.jwt.secret) as TokenPayload;

  request.user = {
    id: sub
  };

  return next();
}