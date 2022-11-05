"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_login = exports.update_password_data = exports.post_user_data = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.post_user_data = zod_1.z.object({
    username: zod_1.z.string({ required_error: "Username must be of type string" }),
    names: zod_1.z.string({ required_error: "First names must be of type string" }),
    last_names: zod_1.z.string({ required_error: "Last names must be of type string" }),
    password: zod_1.z.string({ required_error: "Password must be of type string" }).min(6, "Password should be at least 6 characters long"),
    security: zod_1.z.nativeEnum(client_1.Role, { required_error: "Security level must be of type Role" }),
    email: zod_1.z.string({ required_error: "Email must be of type string" }).email(),
});
exports.update_password_data = zod_1.z.object({
    user_id: zod_1.z.number({ required_error: "User id must be a number" }),
    old_pass: zod_1.z.string({ required_error: "The old password must be a string" }),
    new_pass: zod_1.z.string({ required_error: "New password must be a string" }),
    confirm_new_pass: zod_1.z.string({ required_error: "New password must be a string" })
}).refine(({ confirm_new_pass, new_pass }) => confirm_new_pass === new_pass, { message: "Passwords must match" });
exports.user_login = zod_1.z.object({
    user_id: zod_1.z.number({ required_error: "User id must be a number" }),
    pass: zod_1.z.string({ required_error: "Password must be a string" }).min(1).max(40)
});
//# sourceMappingURL=User.js.map