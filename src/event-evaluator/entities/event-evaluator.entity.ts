import { Events } from "src/events/entities/event.entity";
import { Users } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity()
export class EventEvaluator {

    @PrimaryGeneratedColumn()
    id: number; // Columna de clave primaria generada automáticamente

    @ManyToOne(() => Events, { eager: true, onDelete: 'CASCADE' }) // Agrega { onDelete: 'CASCADE' } aquí
    @JoinColumn({ name: 'eventId' })
    event: Events;
  
    @ManyToOne(() => Users, { eager: true, onDelete: 'CASCADE' }) // Agrega { onDelete: 'CASCADE' } aquí
    @JoinColumn({ name: 'userId' })
    user: Users;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date; // Columna para almacenar la fecha y hora de creación, con valor por defecto actual

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date; // Columna para almacenar la fecha y hora de actualización automáticamente

}
