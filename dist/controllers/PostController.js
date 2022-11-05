"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const Patient_1 = require("../types/Patient");
const Appointment_1 = require("../types/Appointment");
const File_1 = require("../types/File");
const User_1 = require("../types/User");
const prisma = new client_1.PrismaClient();
const PostController = {
    user: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const body = req.body;
        try {
            User_1.post_user_data.parse(body);
        }
        catch (error) {
            return res.status(400).send(error);
        }
        const { username, names, last_names, password, security, email } = body;
        try {
            yield prisma.user.create({
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
        }
        catch (error) {
            return res.status(400).send(error);
        }
        return res.status(200).send({ status: 200, content: "Succesful operation" });
    }),
    patient: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const body = req.body;
        try {
            Patient_1.post_patient_schema.parse(req.body);
        }
        catch (error) {
            return res.status(400).send(error);
        }
        const { first_names, last_names } = body;
        try {
            yield prisma.patient.create({
                data: {
                    first_names: first_names,
                    last_names: last_names,
                }
            });
            res.status(200).send({ status: 200, content: "Succesfully uploaded new patient" });
        }
        catch (error) {
            return res.status(400).send(error);
        }
        prisma.$disconnect();
    }),
    appointment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const body = req.body;
        try {
            Appointment_1.post_appointment_schema.parse(body);
        }
        catch (error) {
            return res.status(400).send(error);
        }
        console.debug("> All fields are correct! Adding appointment to database...");
        const { patient_id, date, description } = body;
        try {
            yield prisma.appointment.create({
                data: {
                    patient_id: patient_id,
                    date: date,
                    description: description !== null && description !== void 0 ? description : null
                }
            });
        }
        catch (error) {
            return res.status(400).send(error);
        }
        return res.status(200).send({ status: 200, content: "Succesfully uploaded new appointment" });
    }),
    upload_pdf: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { patient_id } = req.body;
        // @ts-ignore
        const files = req.files;
        try {
            files.forEach(file => File_1.UploadedFile.parse(file));
        }
        catch (error) {
            return res.status(400).send(error);
        }
        if (!files)
            return res.status(400).send({ status: 400, content: "No files were uploaded to the server" });
        let file_paths = [];
        files.map(file => {
            const { originalname, mimetype, path, size } = file;
            if (size <= 0)
                return;
            if (mimetype.split("/")[1] !== "pdf")
                return;
            const name = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${originalname}`;
            const data = fs_1.default.readFileSync(path);
            try {
                fs_1.default.writeFileSync(`uploads/${name}`, data);
                fs_1.default.unlinkSync(path);
                console.debug("> Successfully uploaded file to server");
            }
            catch (error) {
                return res.status(400).send({ status: 400, content: error });
            }
            file_paths.push({
                name,
                path
            });
        });
        file_paths.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const { name, path } = file;
            try {
                yield prisma.file.create({
                    data: {
                        patient_id,
                        name,
                        location: path,
                        type: "dont remember what this was for" // TODO: figure what this was for
                    }
                });
            }
            catch (error) {
                return res.status(400).send({ status: 400, content: `Error indexing ${name} to database` });
            }
        }));
        return res.status(200).send({ status: 200, content: `Uploaded and indexed ${file_paths.length} files` });
    })
};
exports.default = PostController;
//# sourceMappingURL=PostController.js.map