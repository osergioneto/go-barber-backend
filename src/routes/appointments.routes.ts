import { Router } from "express";
import { uuid } from "uuidv4";
import { IAppointment } from "../types";
import { isEqual, startOfHour, parseISO } from "date-fns";
const appointmentsRouter = Router();
const appointments: IAppointment[] = [];

appointmentsRouter.get('/', (req, res) => res.json(appointments));

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));
  
  const findAppointmentInSameDate = appointments.find(appointment => isEqual(parsedDate, appointment.date));

  if(findAppointmentInSameDate) {
    return res.status(400).json({ error: "This appointment is already booked" });
  }

  const appointment = {
    id: uuid(),
    provider,
    date: parsedDate
  }

  appointments.push(appointment);

  return res.json(appointment);
});

export default appointmentsRouter;