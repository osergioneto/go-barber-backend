import { Router } from 'express';
const routes = Router();
import appointmentsRouter from "./appointments.routes";
import usersRouter from './users.routes';
import authRouter from "./auth.routes";

routes.use("/auth", authRouter);
routes.use("/appointments", appointmentsRouter);
routes.use("/users", usersRouter);

export default routes;
