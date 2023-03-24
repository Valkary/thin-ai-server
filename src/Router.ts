import { Router } from "express";
import multer from "multer";

/* FUNCTIONS */
import VerifyJWT from "./functions/VerifyJWT";

/* CONTROLLERS */
import UserController from "./controllers/UserController";

const AppRouter = Router();
const upload = multer({ dest: "uploads/" });

AppRouter.get('/', (_, res) => {
  console.log('here!');
  res.status(200).send({ success: true, message: "Welcome to the Crit Cares Server!" })
});

/* USERS */
AppRouter.get('/users/get_all', VerifyJWT, UserController.get_all);


export default AppRouter;
