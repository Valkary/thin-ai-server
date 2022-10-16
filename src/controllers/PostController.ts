import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { post_patient_schema } from "../types/Patient";
import { Appointment, post_appointment_schema } from "../types/Appointment";

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
  },
  appointment: async (req: Request, res: Response) => {
    const body: Appointment = req.body;
    try {
      post_appointment_schema.parse(body);
    } catch (error) {
      return res.status(400).send(error);
    }

    console.debug("> All fields are correct! Adding appointment to database...");
    const { patient_id, date, description } = body;

    try {
      await prisma.appointment.create({
        data: {
          patient_id: patient_id,
          date: date,
          description: description ?? null
        }
      })
    } catch (error) {
      return res.status(400).send(error);
    }

    return res.status(200).send({ status: 200, content: "Succesfully uploaded new appointment" });
  }
}

export default PostController;
