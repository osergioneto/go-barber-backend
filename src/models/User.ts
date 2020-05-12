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
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export default User;