import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const VerifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(200).send({ success: false, message: "No token was provided" });
  if (!process.env.TOKEN_SECRET) return res.status(500).send({ success: false, message: "Internal server error" });

  try {
    const verification = jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (error) {
    return res.status(400).send(error);
  }
};

export default VerifyJWT;
