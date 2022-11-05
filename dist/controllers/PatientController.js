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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const Patient_1 = require("../types/Patient");
const prisma = new client_1.PrismaClient();
const PatientController = {
    get_all: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.debug("> Fetching for all patients...");
        const patients = yield prisma.patient.findMany();
        prisma.$disconnect();
        res.status(200).send({ status: 200, content: patients });
    }),
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
};
exports.default = PatientController;
//# sourceMappingURL=PatientController.js.map