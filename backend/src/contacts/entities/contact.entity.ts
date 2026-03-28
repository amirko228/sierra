import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 200 })
  name!: string;

  @Column({ length: 320 })
  email!: string;

  @Column({ length: 50, nullable: true })
  phone?: string;

  @Column({ type: 'text' })
  message!: string;

  @Column({ name: 'source', length: 80, default: 'website' })
  source!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}
