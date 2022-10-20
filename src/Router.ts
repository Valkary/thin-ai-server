import { Router } from "express";
import multer from "multer";

/* CONTROLLERS */
import GetController from "./controllers/GetController";
import PostController from "./controllers/PostController";
import UpdateController from "./controllers/UpdateController";

const AppRouter = Router();
const upload = multer({ dest: "uploads/" });

// TODO: add jwt validation for all routes except login route

// GET requests
AppRouter.get('/', GetController.home);
AppRouter.get('/gets/users', GetController.users);
AppRouter.get('/gets/patients', GetController.patients);
AppRouter.get('/gets/appointments', GetController.appointments);
AppRouter.get('/gets/files', GetController.files);

//POST requests
/* [NEW] */
AppRouter.post('/posts/patient', PostController.patient);
AppRouter.post('/posts/appointment', PostController.appointment);
AppRouter.post('/posts/upload_pdf', upload.array("files"), PostController.upload_pdf);
AppRouter.post('/posts/user', PostController.user);

/* [UPDATES] */
AppRouter.post('/updates/user_pass', UpdateController.user_password);
export default AppRouter;
