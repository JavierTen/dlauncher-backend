import { Events } from "src/events/entities/event.entity";
import { Users } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity()
export class EventEvaluator {

    @PrimaryGeneratedColumn()
    id: number; // Columna de clave primaria generada automáticamente

    @ManyToOne(() => Events, { eager: true } ) // Establece la relación muchos a uno con la entidad Eventos
    @JoinColumn({ name: 'eventId' }) // Nombre de la columna en la tabla Equipos que guarda la FK
    event: Events;

    @ManyToOne(() => Users, { eager: true }) // Establece la relación muchos a uno con la entidad Usuarios
    @JoinColumn({ name: 'userId' }) // Nombre de la columna en la tabla RegistroEquipos que guarda la FK
    user: Users; // Nombre de la propiedad en la entidad RegistroEquipos para acceder al usuario relacionado

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date; // Columna para almacenar la fecha y hora de creación, con valor por defecto actual

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date; // Columna para almacenar la fecha y hora de actualización automáticamente

}
