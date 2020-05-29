import { Entity, PrimaryGeneratedColumn, Column, IsNull, Unique, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity('users')
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export default User;