import { Appointment } from "../models"
import { isEqual } from "date-fns";

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[] = [];

  constructor() {
    this.appointments = [];
  }

  public create({ provider, date }: CreateAppointmentDTO) {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment => isEqual(date, appointment.date));

    return findAppointment || null;
  }

  public listAppointments(): Appointment[] {
    return this.appointments;
  };
}

export default AppointmentsRepository;