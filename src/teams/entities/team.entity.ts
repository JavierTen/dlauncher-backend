import { Events } from 'src/events/entities/event.entity';
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToOne, JoinColumn, BeforeInsert, OneToMany } from 'typeorm'
import * as crypto from 'crypto';
import { UsersTeamsEvents } from 'src/users-team-event/entities/users-team-event.entity';


@Entity()
export class Teams {
  @PrimaryGeneratedColumn()
  id: number; // Columna de clave primaria generada automáticamente

  @Column()
  name: string; // Columna para almacenar el nombre del equipo, debe ser único

  @Column({ unique: true })
  token: string; // Columna para almacenar el nombre del equipo, debe ser único

  generateRandomToken(length: number): string {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const randomBytes = crypto.randomBytes(length);

    let token = '';
    for (let i = 0; i < randomBytes.length; i++) {
      token += characters[randomBytes[i] % characters.length];
    }

    return token;
  }

  @BeforeInsert()
  generateToken() {
    this.token = this.generateRandomToken(6); // Cambia la longitud si es necesario
  }

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  score: number;

  @Column({ type: 'text', nullable: true })
  project: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  youtube: string;

  @Column({ type: 'text', nullable: true })
  github: string;

  @ManyToOne(() => Events, { onDelete: 'CASCADE' }) // Agrega { onDelete: 'CASCADE' } aquí
  @JoinColumn({ name: 'eventId' })
  event: Events;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; // Columna para almacenar la fecha y hora de creación, con valor por defecto actual

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date; // Columna para almacenar la fecha y hora de actualización automáticamente

  @OneToMany(() => UsersTeamsEvents, usersTeamsEvents => usersTeamsEvents.team)
  usersTeamsEvents: UsersTeamsEvents[];

  

}
