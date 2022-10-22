import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import fs from "fs";

import { UploadedFile, FILE_PATHS, UploadedFilesType } from "../types/File";

const prisma = new PrismaClient();

const FileController = {
  get_all: async (_: Request, res: Response) => {
    console.debug("> Fetching all file locations...");
    const files = await prisma.file.findMany();
    prisma.$disconnect();
    res.status(200).send({ status: 200, content: files });
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
};

export default FileController;
