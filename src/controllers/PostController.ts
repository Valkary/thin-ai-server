import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import fs from "fs";

import { Patient, post_patient_schema } from "../types/Patient";
import { Appointment, post_appointment_schema } from "../types/Appointment";
import { UploadedFile, UploadedFilesType } from "../types/File";

const prisma = new PrismaClient();

const PostController = {
  patient: async (req: Request, res: Response) => {
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
  },
  upload_pdf: async (req: Request, res: Response) => {
    // @ts-ignore
    const files: UploadedFilesType[] = req.files;
    try {
      UploadedFile.parse(files);
    } catch (error) {
      return res.status(400).send(error);
    }

    if (!files) return res.status(400).send({ status: 400, content: "No files were uploaded to the server" });

    console.debug(files);

    files.map(file => {
      const { originalname, mimetype, path, size } = file;

      if (size <= 0) return;
      if (mimetype.split("/")[1] !== "pdf") return;

      const name = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${originalname}`;
      const data = fs.readFileSync(path);

      try {
        fs.writeFileSync(`uploads/${name}`, data);
        fs.unlinkSync(path);
        console.debug("> Successfully uploaded file to server");
        return res.status(200).send({ status: 200, content: "Success!" })
      } catch (error) {
        return res.status(400).send({ status: 400, content: error });
      }
    });
  }
}

export default PostController;
