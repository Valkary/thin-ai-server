import { Router } from "express";
import multer from "multer";

/* FUNCTIONS */
import VerifyJWT from "./functions/VerifyJWT";

/* CONTROLLERS */
import PatientController from "./controllers/PatientController";
import UserController from "./controllers/UserController";
import AppointmentController from "./controllers/AppointmentController";
import FileController from "./controllers/FileController";

const AppRouter = Router();
const upload = multer({ dest: "uploads/" });

/* USERS */
AppRouter.get('/users/get_all', VerifyJWT, UserController.get_all);
AppRouter.post('/users/create', VerifyJWT, UserController.create);
AppRouter.post('/users/update_pass', VerifyJWT, UserController.update_password);
AppRouter.post('/users/login', UserController.login);

/* PATIENTS */
AppRouter.get('/patients/get_all', VerifyJWT, PatientController.get_all);
AppRouter.post('/patients/create', VerifyJWT, PatientController.create);

/* APPOINTMENTS */
AppRouter.get('/appointments/get_all', VerifyJWT, AppointmentController.get_all);
AppRouter.post('/appointments/create', VerifyJWT, AppointmentController.create);

/* FILES */
AppRouter.get('/files/get_all', VerifyJWT, FileController.get_all);
AppRouter.post('/files/upload_pdf', VerifyJWT, upload.array("files"), FileController.upload_pdf);

export default AppRouter;
