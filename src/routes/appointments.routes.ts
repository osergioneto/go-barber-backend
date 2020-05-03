import { Router } from "express";
import { parseISO } from "date-fns";
import { AppointmentsRepository } from "../repositories";
import CreateAppointmentService from "../services/CreateAppointmentService";

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (req, res) => res.status(200).json(appointmentsRepository.listAppointments()));

appointmentsRouter.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);
    const createAppointmentService = new CreateAppointmentService(appointmentsRepository);
    const appointment = createAppointmentService.execute({ provider, date: parsedDate });

    return res.status(201).json(appointment);
  } catch ({ message }) {
    return res.status(400).json({ error: message })
  }
  
});

export default appointmentsRouter;