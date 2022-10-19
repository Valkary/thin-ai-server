import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const GetController = {
  home: async (_: Request, res: Response) => {
    res.status(200).send({ msg: "Bienvenido al servidor de Crit Cares", status: 200 });
  },
  users: async (_: Request, res: Response) => {
    console.debug("> Fetching for all users...");
    const users = await prisma.user.findMany();
    prisma.$disconnect();
    res.status(200).send({ status: 200, content: users });
  },
  patients: async (_: Request, res: Response) => {
    console.debug("> Fetching for all patients...");
    const patients = await prisma.patient.findMany();
    prisma.$disconnect();
    res.status(200).send({ status: 200, content: patients });
  },
  appointments: async (_: Request, res: Response) => {
    console.debug("> Fetching for all appointments...");
    const appointments = await prisma.appointment.findMany();
    prisma.$disconnect();
    res.status(200).send({ status: 200, content: appointments });
  },
  files: async (_: Request, res: Response) => {
    console.debug("> Fetching all file locations...");
    const files = await prisma.file.findMany();
    prisma.$disconnect();
    res.status(200).send({ status: 200, content: files });
  }
}

export default GetController;
