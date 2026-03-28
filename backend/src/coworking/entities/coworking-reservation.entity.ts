import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('coworking_reservations')
export class CoworkingReservation {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 200 })
  name!: string;

  @Column({ length: 50 })
  phone!: string;

  @Column({ length: 320, nullable: true })
  email?: string;

  @Column({ type: 'timestamptz', name: 'start_at' })
  startAt!: Date;

  @Column({ type: 'timestamptz', name: 'end_at' })
  endAt!: Date;

  @Column({ name: 'seat_label', length: 80, default: 'hot-desk' })
  seatLabel!: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
