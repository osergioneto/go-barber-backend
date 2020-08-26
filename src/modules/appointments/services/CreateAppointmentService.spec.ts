import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create an appointments', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '123123',
      user_id: '321321',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should throw when creating appointments with same date', async () => {
    const date = new Date();

    await createAppointmentService.execute({
      date,
      provider_id: '123123',
      user_id: '321321',
    });

    expect(
      createAppointmentService.execute({
        date,
        provider_id: '123123',
        user_id: '321321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
