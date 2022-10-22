import { Request, Response } from "express";
import { PrismaClient, Patient } from "@prisma/client";

import { post_patient_schema } from "../types/Patient";

const prisma = new PrismaClient();

const PatientController = {
  get_all: async (_: Request, res: Response) => {
    console.debug("> Fetching for all patients...");
    const patients = await prisma.patient.findMany();
    prisma.$disconnect();
    res.status(200).send({ status: 200, content: patients });
  },
  create: async (req: Request, res: Response) => {
    const body: Patient = req.body;
    try {
      post_patient_schema.parse(req.body);
    } catch (error) {
      return res.status(400).send(error);
    }

    const { first_names, last_names } = body;

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
  },

};

export default PatientController;
