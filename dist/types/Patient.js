"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post_patient_schema = void 0;
const zod_1 = require("zod");
exports.post_patient_schema = zod_1.z.object({
    first_names: zod_1.z.string({ required_error: "Invalid first names" }),
    last_names: zod_1.z.string({ required_error: "Invalid last names" })
});
//# sourceMappingURL=Patient.js.map