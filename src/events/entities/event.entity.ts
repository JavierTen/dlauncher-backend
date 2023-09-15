import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm'


@Entity()
export class Events {
    @PrimaryGeneratedColumn()
    id: number; // Columna de clave primaria generada automáticamente

    @Column({ unique: true })
    name: string; // Columna para almacenar el nombre del evento, debe ser único

    @Column({ type: 'datetime' })
    startAt: Date; // Columna para almacenar la fecha y hora de iniciación del evento

    @Column({ type: 'datetime' })
    endsAt: Date; // Columna para almacenar la fecha y hora de finalización del evento

    @Column({ type: 'int' })
    maxMembers: number; // Cantidad máxima de integrantes por equipo

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date; // Columna para almacenar la fecha y hora de creación, con valor por defecto actual

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date; // Columna para almacenar la fecha y hora de actualización automáticamente


}
