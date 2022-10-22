import { Router } from "express";
import multer from "multer";

/* CONTROLLERS */
import PatientController from "./controllers/PatientController";
import UserController from "./controllers/UserController";
import AppointmentController from "./controllers/AppointmentController";
import FileController from "./controllers/FileController";

const AppRouter = Router();
const upload = multer({ dest: "uploads/" });

// TODO: add jwt validation for all routes except login route

/* USERS */
AppRouter.get('/gets/users', UserController.get_all);
AppRouter.post('/posts/user', UserController.create);
AppRouter.post('/updates/user_pass', UserController.update_password);

/* PATIENTS */
AppRouter.get('/gets/patients', PatientController.get_all);
AppRouter.post('/posts/patient', PatientController.create);

/* APPOINTMENTS */
AppRouter.get('/gets/appointments', AppointmentController.get_all);
AppRouter.post('/posts/appointment', AppointmentController.create);

/* FILES */
AppRouter.get('/gets/files', FileController.get_all);
AppRouter.post('/posts/upload_pdf', upload.array("files"), FileController.upload_pdf);

export default AppRouter;
