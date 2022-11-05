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
const File_1 = require("../types/File");
const prisma = new client_1.PrismaClient();
const FileController = {
    get_all: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.debug("> Fetching all file locations...");
        const files = yield prisma.file.findMany();
        prisma.$disconnect();
        res.status(200).send({ status: 200, content: files });
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
                        type: "PDF"
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
exports.default = FileController;
//# sourceMappingURL=FileController.js.map