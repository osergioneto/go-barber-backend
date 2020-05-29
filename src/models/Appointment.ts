import { Entity, PrimaryGeneratedColumn, Column, IsNull, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import User from "./User";

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export default Appointment;