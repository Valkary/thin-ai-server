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
const Appointment_1 = require("../types/Appointment");
const prisma = new client_1.PrismaClient();
const AppointmentController = {
    get_all: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.debug("> Fetching for all appointments...");
        const appointments = yield prisma.appointment.findMany();
        prisma.$disconnect();
        res.status(200).send({ status: 200, content: appointments });
    }),
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
};
exports.default = AppointmentController;
//# sourceMappingURL=AppointmentController.js.map