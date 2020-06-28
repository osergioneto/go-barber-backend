import { Appointment } from '../../../models';
import { isEqual } from 'date-fns';
import {
  EntityRepository,
  Repository,
} from '../modules/appointments/entities/node_modules/typeorm';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
