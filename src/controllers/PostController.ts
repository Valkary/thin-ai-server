import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { post_patient_schema } from "../types/Patient";

const prisma = new PrismaClient();

const PostController = {
  patient: async (req: Request, res: Response) => {
    try {
      post_patient_schema.parse(req.body);
    } catch (error) {
      return res.status(400).send(error);
    }

    const { first_names, last_names } = req.body;

    try {
      await prisma.patient.create({
        data: {
          first_names: first_names,
          last_names: last_names,
        }
      });
      res.status(200).send({ status: 200, content: "Succesfully uploaded new patient" })
    } catch (error) {
      return res.status(400).send(error);
    }
    prisma.$disconnect();
  }
}

export default PostController;
