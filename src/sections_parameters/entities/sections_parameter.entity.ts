import { RubricsSection } from "src/rubrics_sections/entities/rubrics_section.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class SectionsParameter {

    @PrimaryGeneratedColumn()
    id: number; // Columna de clave primaria generada automáticamente

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    value: number;

    @Column('text')
    description: string;

    @ManyToOne(() => RubricsSection, rubricsSection => rubricsSection.parameters)
    rubricsSection: RubricsSection;
  
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date; // Columna para almacenar la fecha y hora de creación, con valor por defecto actual

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date; // Columna para almacenar la fecha y hora de actualización automáticamente


}
