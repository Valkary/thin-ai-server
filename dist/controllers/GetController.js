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
const prisma = new client_1.PrismaClient();
const GetController = {
    home: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.status(200).send({ msg: "Bienvenido al servidor de Crit Cares", status: 200 });
    }),
    users: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.debug("> Fetching for all users...");
        const users = yield prisma.user.findMany();
        prisma.$disconnect();
        res.status(200).send({ status: 200, content: users });
    }),
    patients: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.debug("> Fetching for all patients...");
        const patients = yield prisma.patient.findMany();
        prisma.$disconnect();
        res.status(200).send({ status: 200, content: patients });
    }),
    appointments: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.debug("> Fetching for all appointments...");
        const appointments = yield prisma.appointment.findMany();
        prisma.$disconnect();
        res.status(200).send({ status: 200, content: appointments });
    }),
    files: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.debug("> Fetching all file locations...");
        const files = yield prisma.file.findMany();
        prisma.$disconnect();
        res.status(200).send({ status: 200, content: files });
    })
};
exports.default = GetController;
//# sourceMappingURL=GetController.js.map