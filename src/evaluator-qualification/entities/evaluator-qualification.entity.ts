import { Events } from "src/events/entities/event.entity";
import { Teams } from "src/teams/entities/team.entity";
import { Users } from "src/users/entities/user.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, getRepository } from "typeorm";

@Entity()
export class EvaluatorQualification {
    @PrimaryGeneratedColumn()
    id: number; // Columna de clave primaria generada automáticamente

    @ManyToOne(() => Teams, { eager: true, onDelete: 'CASCADE' }) // Agrega { onDelete: 'CASCADE' } aquí
    @JoinColumn({ name: 'teamId' })
    team: Teams;

    @ManyToOne(() => Users, { eager: true, onDelete: 'CASCADE' }) // Agrega { onDelete: 'CASCADE' } aquí
    @JoinColumn({ name: 'userId' })
    user: Users;

    @ManyToOne(() => Events, { eager: true, onDelete: 'CASCADE' }) // Agrega { onDelete: 'CASCADE' } aquí
    @JoinColumn({ name: 'eventId' })
    event: Events;

    @Column({ type: 'double precision' })
    score: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date; // Columna para almacenar la fecha y hora de creación, con valor por defecto actual

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date; // Columna para almacenar la fecha y hora de actualización automáticamente
}
