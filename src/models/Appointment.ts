import { Entity, PrimaryGeneratedColumn, Column, IsNull, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  provider: string;

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export default Appointment;