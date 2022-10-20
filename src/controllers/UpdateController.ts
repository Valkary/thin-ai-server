import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { UpdatePassType, update_password_data } from "../types/User";

const prisma = new PrismaClient();

const UpdateController = {
  user_password: async (req: Request, res: Response) => {
    const body: UpdatePassType = req.body;
    // Verify body types
    try {
      update_password_data.parse(body);
    } catch (error) {
      return res.status(400).send({ success: false, message: error });
    }

    const { old_pass, new_pass, user_id } = req.body;

    // Verify user id exists and passwords match
    try {
      const user: User | null = await prisma.user.findUnique({
        where: {
          id: user_id
        },
      });

      if (!user) return res.status(200).send({ success: false, message: "User id was not found" });
      
      const { password } = user;
      const verify_password = await bcrypt.compare(old_pass, password);
      
      if (!verify_password) return res.status(200).send({ success: false, message: "Passwords didn't match!" });
    } catch (error) {
      return res.status(200).send({ success: false, message: error });
    }

    const encrypted_pass = await bcrypt.hash(new_pass, 13);

    // Update password
    try {
      await prisma.user.update({
        where: {
          id: user_id
        },
        data: {
          password: encrypted_pass
        }
      });
      prisma.$disconnect
    } catch (error) {
      return res.status(400).send(error);
    }

    return res.status(200).send({ success: true, message: "Password was succesfully updated!" });
  },
}

export default UpdateController;
