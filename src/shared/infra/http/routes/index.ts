import { Router } from 'express';
const routes = Router();
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import authRouter from '@modules/users/infra/http/routes/auth.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';

routes.use('/auth', authRouter);
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/providers', providersRouter);

export default routes;
