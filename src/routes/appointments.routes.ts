import { Router } from "express";
import { parseISO } from "date-fns";
import { AppointmentsRepository } from "../repositories";
import { getCustomRepository } from "typeorm"
import CreateAppointmentService from "../services/CreateAppointmentService";

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return res.status(200).json(appointments)
});

appointmentsRouter.post('/', async (req, res) => {
  try {
    const { provider_id, date } = req.body;
    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();
    const appointment = await createAppointmentService.execute({ provider_id, date: parsedDate });

    return res.status(201).json(appointment);
  } catch ({ message }) {
    console.log("appointment: ", message);
    return res.status(400).json({ error: message })
  }
  
});

export default appointmentsRouter;