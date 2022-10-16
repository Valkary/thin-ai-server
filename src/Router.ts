import { Router } from "express";
import GetController from "./controllers/GetController";
import PostController from "./controllers/PostController";

const AppRouter = Router();

// GET requests
AppRouter.get('/', GetController.home);
AppRouter.get('/users', GetController.users);
AppRouter.get('/patients', GetController.patients);
AppRouter.get('/appointments', GetController.appointments);

//POST requests
AppRouter.post('/patient', PostController.patient);
AppRouter.post('/appointment', PostController.appointment);

export default AppRouter;
