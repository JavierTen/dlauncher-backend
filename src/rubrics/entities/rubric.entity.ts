import { RubricsSection } from "src/rubrics_sections/entities/rubrics_section.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Rubric {

    @PrimaryGeneratedColumn()
    id: number; // Columna de clave primaria generada automáticamente

    @Column({ unique: true })
    name: string; // Columna para almacenar el nombre del evento, debe ser único

    @Column('text')
    slug: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date; // Columna para almacenar la fecha y hora de creación, con valor por defecto actual

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date; // Columna para almacenar la fecha y hora de actualización automáticamente

    @OneToMany(() => RubricsSection, rubricsSection => rubricsSection.rubric)
    sections: RubricsSection[];

}
