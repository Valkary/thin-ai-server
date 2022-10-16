import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const GetController = {
  home: async (_: Request, res: Response) => {
    res.status(200).send({ msg: "Bienvenido al servidor de Crit Cares", status: 200 });
  },
  users: async (_: Request, res: Response) => {
    prisma.$connect();
    const users = await prisma.user.findMany();
    prisma.$disconnect();
    res.status(200).send({ status: 200, content: users });
  },
  patients: async (_: Request, res: Response) => {
    prisma.$connect();
    const patients = await prisma.patient.findMany();
    prisma.$disconnect();
    res.status(200).send({ status: 200, content: patients });
  }
}

export default GetController;
