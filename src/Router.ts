import { Router } from "express";
import GetController from "./controllers/GetController";
import PostController from "./controllers/PostController";
import multer from "multer";

const AppRouter = Router();
const upload = multer({ dest: "uploads/" });

// GET requests
AppRouter.get('/', GetController.home);
AppRouter.get('/users', GetController.users);
AppRouter.get('/patients', GetController.patients);
AppRouter.get('/appointments', GetController.appointments);
AppRouter.get('/files', GetController.files);

//POST requests
AppRouter.post('/patient', PostController.patient);
AppRouter.post('/appointment', PostController.appointment);
AppRouter.post('/upload_pdf', upload.array("files"), PostController.upload_pdf);

export default AppRouter;
