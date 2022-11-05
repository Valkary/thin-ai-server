"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
/* FUNCTIONS */
const VerifyJWT_1 = __importDefault(require("./functions/VerifyJWT"));
/* CONTROLLERS */
const PatientController_1 = __importDefault(require("./controllers/PatientController"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const AppointmentController_1 = __importDefault(require("./controllers/AppointmentController"));
const FileController_1 = __importDefault(require("./controllers/FileController"));
const AppRouter = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: "uploads/" });
AppRouter.get('/', (_, res) => {
    console.log('here!');
    res.status(200).send({ success: true, message: "Welcome to the Crit Cares Server!" });
});
/* USERS */
AppRouter.get('/users/get_all', VerifyJWT_1.default, UserController_1.default.get_all);
AppRouter.post('/users/create', VerifyJWT_1.default, UserController_1.default.create);
AppRouter.post('/users/update_pass', VerifyJWT_1.default, UserController_1.default.update_password);
AppRouter.post('/users/login', UserController_1.default.login);
/* PATIENTS */
AppRouter.get('/patients/get_all', VerifyJWT_1.default, PatientController_1.default.get_all);
AppRouter.post('/patients/create', VerifyJWT_1.default, PatientController_1.default.create);
/* APPOINTMENTS */
AppRouter.get('/appointments/get_all', VerifyJWT_1.default, AppointmentController_1.default.get_all);
AppRouter.post('/appointments/create', VerifyJWT_1.default, AppointmentController_1.default.create);
/* FILES */
AppRouter.get('/files/get_all', VerifyJWT_1.default, FileController_1.default.get_all);
AppRouter.post('/files/upload_pdf', VerifyJWT_1.default, upload.array("files"), FileController_1.default.upload_pdf);
exports.default = AppRouter;
//# sourceMappingURL=Router.js.map