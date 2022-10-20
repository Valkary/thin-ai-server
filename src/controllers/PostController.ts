import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import fs from "fs";

import { Patient, post_patient_schema } from "../types/Patient";
import { Appointment, post_appointment_schema } from "../types/Appointment";
import { UploadedFile, UploadedFilesType, FILE_PATHS } from "../types/File";
import { PostUserType, post_user_data } from "../types/User";

const prisma = new PrismaClient();

const PostController = {
  user: async (req: Request, res: Response) => {
    const body: PostUserType = req.body;

    try {
      post_user_data.parse(body);
    } catch (error) {
      return res.status(400).send(error);
    }

    const { username, names, last_names, password, security, email } = body;

    try {
      await prisma.user.create({
        data: {
          username,
          email,
          names,
          last_names,
          password,
          security
        }
      });
      prisma.$disconnect();
    } catch (error) {
      return res.status(400).send(error);
    }

    return res.status(200).send({ status: 200, content: "Succesful operation" });
  },
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
    const { patient_id } = req.body;
    // @ts-ignore
    const files: UploadedFilesType[] = req.files;
    try {
      files.forEach(file => UploadedFile.parse(file));
    } catch (error) {
      return res.status(400).send(error);
    }

    if (!files) return res.status(400).send({ status: 400, content: "No files were uploaded to the server" });

    let file_paths: FILE_PATHS[] = [];

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
      } catch (error) {
        return res.status(400).send({ status: 400, content: error });
      }

      file_paths.push({
        name,
        path
      });
    });

    file_paths.map(async (file) => {
      const { name, path } = file;
      try {
        await prisma.file.create({
          data: {
            patient_id,
            name,
            location: path,
            type: "dont remember what this was for" // TODO: figure what this was for
          }
        });
      } catch (error) {
        return res.status(400).send({ status: 400, content: `Error indexing ${name} to database` });
      }
    });
    return res.status(200).send({ status: 200, content: `Uploaded and indexed ${file_paths.length} files` });
  }
}

export default PostController;
