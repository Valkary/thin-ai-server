import { Request, Response } from "express";
import { PrismaClient, Appointment } from "@prisma/client";

import { post_appointment_schema } from "../types/Appointment";

const prisma = new PrismaClient();

const AppointmentController = {
  get_all: async (_: Request, res: Response) => {
    console.debug("> Fetching for all appointments...");
    const appointments = await prisma.appointment.findMany();
    prisma.$disconnect();
    res.status(200).send({ status: 200, content: appointments });
  },
  create: async (req: Request, res: Response) => {
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
  },

};

export default AppointmentController;
