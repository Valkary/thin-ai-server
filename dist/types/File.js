"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadedFile = void 0;
const zod_1 = require("zod");
exports.UploadedFile = zod_1.z.object({
    fieldname: zod_1.z.string({ required_error: "Invalid fieldname" }),
    originalname: zod_1.z.string({ required_error: "Invalid originalname" }),
    encoding: zod_1.z.string({ required_error: "Invalid encoding" }),
    mimetype: zod_1.z.string({ required_error: "Invalid mimetype" }),
    destination: zod_1.z.string({ required_error: "Invalid destination" }),
    filename: zod_1.z.string({ required_error: "Invalid filename" }),
    path: zod_1.z.string({ required_error: "Invalid path" }),
    size: zod_1.z.number({ required_error: "Size is either not a number or it's size is 0 bytes" }).min(0)
});
//# sourceMappingURL=File.js.map