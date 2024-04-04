import { Rubric } from 'src/rubrics/entities/rubric.entity';
import { RubricsSection } from 'src/rubrics_sections/entities/rubrics_section.entity';
import { Users } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToMany, JoinTable, JoinColumn, ManyToOne, OneToMany } from 'typeorm'


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

    @Column({nullable: true, type: 'datetime' })
    closeAt: Date; // Columna para almacenar la fecha y hora de finalización del evento

    @Column({nullable: true, type: 'datetime' })
    closEvaluationAt: Date; // Columna para almacenar la fecha y hora de finalización del evento

    @Column({ type: 'int' })
    maxMembers: number; // Cantidad máxima de integrantes por equipo

    @Column()
    post: boolean; // Columna para indicar si el usuario está validado

    @Column('text')
    shortDescription: string;

    @Column('text')
    description: string;

    @Column('text')
    slug: string;

    @ManyToOne(() => Rubric, { nullable: true }) // 
    @JoinColumn({ name: 'rubricId' })
    rubric: Rubric;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date; // Columna para almacenar la fecha y hora de creación, con valor por defecto actual

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date; // Columna para almacenar la fecha y hora de actualización automáticamente

    
}

