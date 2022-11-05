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
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../types/User");
const prisma = new client_1.PrismaClient();
const UpdateController = {
    user_password: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const body = req.body;
        // Verify body types
        try {
            User_1.update_password_data.parse(body);
        }
        catch (error) {
            return res.status(400).send({ success: false, message: error });
        }
        const { old_pass, new_pass, user_id } = req.body;
        // Verify user id exists and passwords match
        try {
            const user = yield prisma.user.findUnique({
                where: {
                    id: user_id
                },
            });
            if (!user)
                return res.status(200).send({ success: false, message: "User id was not found" });
            const { password } = user;
            const verify_password = yield bcrypt_1.default.compare(old_pass, password);
            if (!verify_password)
                return res.status(200).send({ success: false, message: "Passwords didn't match!" });
        }
        catch (error) {
            return res.status(200).send({ success: false, message: error });
        }
        const encrypted_pass = yield bcrypt_1.default.hash(new_pass, 13);
        // Update password
        try {
            yield prisma.user.update({
                where: {
                    id: user_id
                },
                data: {
                    password: encrypted_pass
                }
            });
            prisma.$disconnect;
        }
        catch (error) {
            return res.status(400).send(error);
        }
        return res.status(200).send({ success: true, message: "Password was succesfully updated!" });
    }),
};
exports.default = UpdateController;
//# sourceMappingURL=UpdateController.js.map