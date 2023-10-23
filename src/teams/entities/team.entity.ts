import { Events } from 'src/events/entities/event.entity';
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm'
import * as crypto from 'crypto';


@Entity()
export class Teams {
  @PrimaryGeneratedColumn()
  id: number; // Columna de clave primaria generada automáticamente

  @Column({ unique: true })
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

  @Column({ type: 'text', nullable: true })
  project: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  youtube: string;

  @Column({ type: 'text', nullable: true })
  github: string;

  @ManyToOne(() => Events) // Establece la relación muchos a uno con la entidad Eventos
  @JoinColumn({ name: 'eventId' }) // Nombre de la columna en la tabla Equipos que guarda la FK
  event: Events;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; // Columna para almacenar la fecha y hora de creación, con valor por defecto actual

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date; // Columna para almacenar la fecha y hora de actualización automáticamente



}
