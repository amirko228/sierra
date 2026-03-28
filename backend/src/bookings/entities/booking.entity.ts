import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'guest_name', length: 200 })
  guestName!: string;

  @Column({ length: 50 })
  phone!: string;

  @Column({ type: 'date', name: 'check_in' })
  checkIn!: string;

  @Column({ type: 'date', name: 'check_out' })
  checkOut!: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({ name: 'room_type', length: 100, default: 'standard' })
  roomType!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
