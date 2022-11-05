"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post_appointment_schema = void 0;
const zod_1 = require("zod");
exports.post_appointment_schema = zod_1.z.object({
    patient_id: zod_1.z.number({ required_error: "patient_id needs to be a integer greater than 0" }).int().min(1),
    date: zod_1.z.preprocess((a) => new Date(zod_1.z.string().parse(a)), zod_1.z.date()),
    description: zod_1.z.string({ required_error: "description field is needs to be a string" }).optional()
});
//# sourceMappingURL=Appointment.js.map